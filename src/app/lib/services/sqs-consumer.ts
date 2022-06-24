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

function isConnectionError(err: Error): boolean {
  if (err instanceof AWSError) {
    return (
      err.statusCode === 403 ||
      err.code === 'CredentialsError' ||
      err.code === 'UnknownEndpoint'
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
  region?: string
  shouldDeleteMessages?: boolean
  sqs: SQSClient
  stopped?: boolean
  terminateVisibilityTimeout?: boolean
  visibilityTimeout?: number
  waitTimeSeconds?: number
}

class SQSConsumer {
  private queueUrl: string
  private handleMessage: (message: Message) => Promise<void>
  private handleMessageBatch:
    | ((message: Message[]) => Promise<void>)
    | undefined
  private handleMessageTimeout: number | undefined
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
    this.handleMessageBatch = options.handleMessageBatch
    this.handleMessageTimeout = options.handleMessageTimeout
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
  }

  public start(): void {
    if (this.stopped) {
      console.info('Starting consumer')
      this.stopped = false
      this.poll()
    }
  }

  public stop(): void {
    console.info('Stopping consumer')
    this.stopped = true
  }

  private async receiveMessage(
    params: ReceiveMessageRequest,
  ): Promise<ReceiveMessageResult> {
    try {
      return await this.sqs.send(new ReceiveMessageCommand(params))
    } catch (error) {
      throw new Error(error)
    }
  }

  private async deleteMessage(message: Message): Promise<void> {
    if (!this.shouldDeleteMessages) {
      console.info(
        'Skipping message delete since shouldDeleteMessages is set to false',
      )
      return
    }
    console.info('Deleting message %s', message.MessageId)

    const deleteParams = {
      QueueUrl: this.queueUrl,
      ReceiptHandle: message.ReceiptHandle,
    }

    try {
      await this.sqs.send(new DeleteMessageCommand(deleteParams))
    } catch (error) {
      throw new Error(error)
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
      throw new Error(error)
    }
  }

  private async executeHandler(message: Message): Promise<void> {
    try {
      await this.handleMessage(message)
    } catch (err) {
      throw new Error(err)
    }
  }

  private poll(): void {
    if (this.stopped) {
      return
    }

    console.info('Polling for messages')
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
        console.error(error)
        if (isConnectionError(error)) {
          console.info(
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
        console.error(error)
      })
  }

  private async handleSqsResponse(
    response: ReceiveMessageResult,
  ): Promise<void> {
    console.info('Received SQS response')
    console.info(response)

    if (!response || !response.Messages || !response.Messages.length) {
      console.info('no message to deal with')
      return
    }

    await Promise.all(response.Messages.map(this.processMessage))
    console.info('response_processed')
  }
}

export default SQSConsumer
