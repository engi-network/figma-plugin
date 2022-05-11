/* eslint-disable no-constant-condition */
import {
  PublishCommand,
  PublishCommandOutput,
  SNSClient,
} from '@aws-sdk/client-sns'
import AWS, { AWSError } from 'aws-sdk'
import S3 from 'aws-sdk/clients/s3'

import config from '~/app/lib/config'
import { MAX_RETRY_TIMES, POLLING_INTERVAL } from '~/app/lib/constants/aws'
import { DIFF_TYPE, isError, Report, ReportResult } from '~/app/models/Report'
import { Specification } from '~/app/models/Specification'

import { decodeFromBuffer } from '../utils/buffer'

export interface CallbackStatus {
  currentTimerId: number
  retryTimes: number
  success: boolean
}

const awsConfig = {
  region: config.AWS_DEFAULT_REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.IDENTITY_POOL_ID,
  }),
}

class CustomizedAWS {
  isInitialized = false
  snsClient: SNSClient | undefined
  s3Client: AWS.S3 | undefined
  sqsClient: AWS.SQS | undefined
  constructor() {}

  initialize() {
    try {
      AWS.config.update(awsConfig)

      this.snsClient = new SNSClient(awsConfig)
      this.s3Client = new AWS.S3(awsConfig)
      this.sqsClient = new AWS.SQS(awsConfig)
      this.isInitialized = true
    } catch (error) {
      this.isInitialized = false
    }
  }

  async publishCommandToSns(
    message: Specification,
  ): Promise<PublishCommandOutput> {
    if (!this.snsClient) {
      return Promise.reject({
        message: 'AWS has not been configured',
      } as AWSError)
    }

    const params = {
      Message: JSON.stringify(message),
      TopicArn: config.TOPIC_ARN,
    }

    const data = await this.snsClient.send(new PublishCommand(params))
    console.info('Success from sns::', data)
    return data
  }

  async receiveMessageFromSQS(): Promise<
    AWS.Request<AWS.SQS.ReceiveMessageResult, AWSError>
  > {
    if (!this.sqsClient) {
      return Promise.reject({
        message: 'AWS has not been configured',
      } as AWSError)
    }

    const params = {
      MaxNumberOfMessages: 10,
      QueueUrl: config.QUEUE_URL,
      VisibilityTimeout: 10,
      WaitTimeSeconds: 1,
    }

    try {
      const result = await this.sqsClient.receiveMessage(params)
      console.info(result)
      return result
    } catch (error) {
      console.error(error)
      return Promise.reject(error as AWSError)
    }
  }

  async getPresignedUrl(name: string, checkId: string): Promise<string> {
    if (!this.s3Client) {
      return Promise.reject({
        message: 'AWS has not been configured',
      } as AWSError)
    }

    try {
      const key = `checks/${checkId}/frames/${name}.png`

      const params = {
        Bucket: config.SAME_STORY_BUCKET_NAME,
        Key: key,
      }

      return await this.s3Client?.getSignedUrlPromise('getObject', params)
    } catch (error) {
      return ''
    }
  }

  async uploadEncodedFrameToS3(
    name: string,
    checkId: string,
    frame: Uint8Array,
  ): Promise<S3.ManagedUpload.SendData> {
    const key = `checks/${checkId}/frames/${name}.png`

    const upload = new S3.ManagedUpload({
      params: {
        Bucket: config.SAME_STORY_BUCKET_NAME,
        Key: key,
        Body: frame,
      },
    })

    return upload.promise()
  }

  async fetchReportById(checkId: string): Promise<Report> {
    return new Promise((resolve, reject) => {
      if (!this.s3Client) {
        return reject({
          message: 'AWS has not been configured',
        } as AWSError)
      }

      this.s3Client.getObject(
        {
          Bucket: config.SAME_STORY_BUCKET_NAME,
          Key: `checks/${checkId}/report/results.json`,
        },
        async (error, data) => {
          if (error) {
            reject(error)
          } else {
            if (data.Body) {
              const result: unknown = decodeFromBuffer(
                data.Body as ArrayLike<number>,
              )
              resolve({ result: result as ReportResult, checkId })
            }
          }
        },
      )
    })
  }

  /**
   *
   * @param checkId uuid for check
   * @param difference 'blue' or 'gray'
   * @returns Promise of an array of bytes
   */

  async fetchReportDifferenceById(
    checkId: string,
    difference: DIFF_TYPE,
  ): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      if (!this.s3Client) {
        return Promise.reject({
          message: 'AWS has not been configured',
        } as AWSError)
      }

      this.s3Client.getObject(
        {
          Bucket: config.SAME_STORY_BUCKET_NAME,
          Key: `checks/${checkId}/report/${difference}_difference.png`,
        },
        async (error, data) => {
          if (error) {
            reject(error)
          } else {
            resolve(data.Body as ArrayBuffer)
          }
        },
      )
    })
  }

  async pollReportById(
    checkId: string,
    callback: (status: CallbackStatus, data?: Report) => void,
  ) {
    let retryTimes = 0
    let timerId = -1

    timerId = setInterval(async () => {
      try {
        const report = await this.fetchReportById(checkId)
        clearInterval(timerId)

        if (!isError(report.result)) {
          callback(
            {
              success: true,
              retryTimes,
              currentTimerId: timerId,
            },
            report,
          )
        } else {
          callback(
            { success: false, retryTimes, currentTimerId: timerId },
            report,
          )
        }
      } catch (error) {
        const statusCode = (error as AWSError).statusCode

        if (retryTimes >= MAX_RETRY_TIMES || statusCode !== 404) {
          clearInterval(timerId)
          callback({ success: false, retryTimes, currentTimerId: timerId })
          return
        }

        if (retryTimes < MAX_RETRY_TIMES && statusCode === 404) {
          retryTimes += 1
          callback({ success: false, retryTimes, currentTimerId: timerId })
          return
        }

        clearInterval(timerId)
        callback({ success: false, retryTimes, currentTimerId: timerId })
      }
    }, POLLING_INTERVAL)
  }
}

export default new CustomizedAWS()
