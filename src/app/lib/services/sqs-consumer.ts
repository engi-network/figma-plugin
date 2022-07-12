import {
  ChangeMessageVisibilityCommand,
  DeleteMessageCommand,
  Message,
  ReceiveMessageCommand,
  ReceiveMessageRequest,
  ReceiveMessageResult,
  SQSClient,
} from '@aws-sdk/client-sqs'

import { AWSError } from '~/app/@types/aws-error'
import Sentry, { SENTRY_TRANSACTION } from '~/app/lib/services/sentry'
import { autoBind } from '~/app/lib/utils/auto-bind'
import logger from '~/app/lib/utils/logger'

function isConnectionError(error: AWSError): boolean {
  if ('code' in error && 'statusCode' in error) {
    return (
      error.statusCode === 403 ||
      error.code === 'CredentialsError' ||
      error.code === 'UnknownEndpoint'
    )
  }

  return false
}

export interface ConsumerOptions {
  attributeNames?: string[]
  authenticationErrorTimeout?: number
  batchSize?: number
  handleMessage(message: Message): Promise<void>
  handleMessageBatch?(messages: Message[]): Promise<void>
  handleMessageTimeout?: number
  heartbeatInterval?: number
  messageAttributeNames?: string[]
  pollingWaitTimeMs?: number
  queueUrl: string
  shouldDeleteMessages?: boolean
  sqs: SQSClient
  stopped?: boolean
  terminateVisibilityTimeout?: boolean
  visibilityTimeout?: number
  waitTimeSeconds?: number
}

/**
 * @Warning heartbeatInterval must be less than visibilityTimeout.
 */

class SQSConsumer {
  private queueUrl: string
  private handleMessage: (message: Message) => Promise<void>
  private attributeNames: string[]
  private messageAttributeNames: string[]
  private stopped: boolean
  private batchSize: number
  private visibilityTimeout: number | undefined
  private waitTimeSeconds: number
  private authenticationErrorTimeout: number
  private pollingWaitTimeMs: number
  private terminateVisibilityTimeout: boolean
  private heartbeatInterval: number | undefined
  private sqs: SQSClient
  private shouldDeleteMessages: boolean

  constructor(options: ConsumerOptions) {
    this.queueUrl = options.queueUrl
    this.queueUrl = options.queueUrl
    this.handleMessage = options.handleMessage
    this.attributeNames = options.attributeNames || []
    this.messageAttributeNames = options.messageAttributeNames || []
    this.stopped = true
    this.batchSize = options.batchSize || 1
    this.visibilityTimeout = options.visibilityTimeout
    this.terminateVisibilityTimeout =
      options.terminateVisibilityTimeout || false
    this.heartbeatInterval = options.heartbeatInterval
    this.waitTimeSeconds = options.waitTimeSeconds ?? 20
    this.authenticationErrorTimeout =
      options.authenticationErrorTimeout ?? 10000
    this.pollingWaitTimeMs = options.pollingWaitTimeMs ?? 0
    this.shouldDeleteMessages = options.shouldDeleteMessages ?? true
    this.sqs = options.sqs

    autoBind(this)
  }

  public static create(options: ConsumerOptions): SQSConsumer {
    return new SQSConsumer(options)
  }

  public start(): void {
    if (this.stopped) {
      logger.info('Starting consumer')
      this.stopped = false
      this.poll()
    }
  }

  public stop(): void {
    logger.info('Stopping consumer')
    this.stopped = true
  }

  private async receiveMessage(
    params: ReceiveMessageRequest,
  ): Promise<ReceiveMessageResult> {
    return await this.sqs.send(new ReceiveMessageCommand(params))
  }

  private async deleteMessage(message: Message): Promise<void> {
    if (!this.shouldDeleteMessages) {
      logger.info(
        'Skipping message delete since shouldDeleteMessages is set to false',
      )
      return
    }
    logger.warn('Deleting message:::', message.MessageId)

    const deleteParams = {
      QueueUrl: this.queueUrl,
      ReceiptHandle: message.ReceiptHandle,
    }

    try {
      await this.sqs.send(new DeleteMessageCommand(deleteParams))
    } catch (error) {
      Sentry.sendReport({
        error,
        transactionName: SENTRY_TRANSACTION.SQS_ERROR,
        tagData: { queueUrl: this.queueUrl },
      })
      throw error as AWSError
    }
  }

  private async processMessage(message: Message): Promise<void> {
    let heartbeat
    try {
      if (this.heartbeatInterval && this.visibilityTimeout) {
        heartbeat = this.startHeartbeat(async () => {
          return this.changeVisibilityTimeout(
            message,
            this.visibilityTimeout as number,
          )
        })
      }

      await this.executeHandler(message)
      await this.deleteMessage(message)
    } catch (err) {
      if (this.terminateVisibilityTimeout) {
        await this.changeVisibilityTimeout(message, 0)
      }
    } finally {
      clearInterval(heartbeat)
    }
  }

  private startHeartbeat(heartbeatFn: () => void) {
    if (!this.heartbeatInterval) {
      return
    }

    return setInterval(() => {
      heartbeatFn()
    }, this.heartbeatInterval * 1000)
  }

  private async changeVisibilityTimeout(
    message: Message,
    timeout: number,
  ): Promise<void> {
    const params = {
      QueueUrl: this.queueUrl,
      ReceiptHandle: message.ReceiptHandle,
      VisibilityTimeout: timeout,
    }
    try {
      const command = new ChangeMessageVisibilityCommand(params)
      await this.sqs.send(command)
    } catch (error) {
      logger.error(error)
      Sentry.sendReport({
        error,
        transactionName: SENTRY_TRANSACTION.SQS_ERROR,
        tagData: { queueUrl: this.queueUrl },
      })
      throw error as AWSError
    }
  }

  private async executeHandler(message: Message): Promise<void> {
    try {
      await this.handleMessage(message)
    } catch (error) {
      logger.error(error)
      Sentry.sendReport({
        error,
        transactionName: SENTRY_TRANSACTION.SQS_ERROR,
        tagData: { queueUrl: this.queueUrl },
      })
      throw new Error('Error in handle message')
    }
  }

  private poll(): void {
    if (this.stopped) {
      return
    }

    logger.info('Polling for messages')
    const receiveParams = {
      AttributeNames: this.attributeNames,
      MaxNumberOfMessages: this.batchSize,
      MessageAttributeNames: this.messageAttributeNames,
      QueueUrl: this.queueUrl,
      VisibilityTimeout: this.visibilityTimeout,
      WaitTimeSeconds: this.waitTimeSeconds,
    }

    let currentPollingTimeout = this.pollingWaitTimeMs

    this.receiveMessage(receiveParams)
      .then(this.handleSqsResponse)
      .catch((error) => {
        if (isConnectionError(error)) {
          logger.info(
            'There was an authentication error. Pausing before retrying.',
          )
          currentPollingTimeout = this.authenticationErrorTimeout
        }
        return
      })
      .then(() => {
        setTimeout(this.poll, currentPollingTimeout)
      })
      .catch((error) => {
        Sentry.sendReport({
          error,
          transactionName: SENTRY_TRANSACTION.SQS_ERROR,
          tagData: { queueUrl: this.queueUrl },
        })

        logger.error(error)
      })
  }

  private async handleSqsResponse(
    response: ReceiveMessageResult,
  ): Promise<void> {
    if (!response || !response.Messages || !response.Messages.length) {
      return
    }

    await Promise.all(response.Messages.map(this.processMessage))
    logger.info('response_processed')
  }
}

export default SQSConsumer
