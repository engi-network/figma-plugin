import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import {
  PublishCommand,
  PublishCommandOutput,
  SNSClient,
} from '@aws-sdk/client-sns'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import AWS from 'aws-sdk'
import S3 from 'aws-sdk/clients/s3'

import { AWSError } from '~/app/@types/aws-error'
import config from '~/app/lib/config'
import { readDataFromStream } from '~/app/lib/utils/buffer'
import {
  DIFF_TYPE,
  ErrorResult,
  Report,
  ReportResult,
  STATUS,
} from '~/app/models/Report'
import { Specification } from '~/app/models/Specification'

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

class AWSService {
  isInitialized = false
  private snsClient: SNSClient | undefined
  private s3Client: S3Client | undefined

  constructor() {}

  initialize() {
    try {
      AWS.config.update(awsConfig)
      this.snsClient = new SNSClient(awsConfig)
      this.s3Client = new S3Client(awsConfig)
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

      const command = new GetObjectCommand(params)
      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600,
      })

      return url
    } catch (error) {
      return ''
    }
  }

  async uploadEncodedFrameToS3(
    name: string,
    checkId: string,
    frame: Uint8Array,
  ): Promise<string> {
    if (!this.s3Client) {
      throw {
        message: 'AWS has not been configured',
      } as AWSError
    }

    const key = `checks/${checkId}/frames/${name}.png`

    const uploadParams = {
      ACL: 'public-read',
      Body: frame,
      Bucket: config.SAME_STORY_BUCKET_NAME,
      ContentDisposition: 'inline',
      ContentType: 'image/png',
      Key: key,
    }

    const upload = new S3.ManagedUpload({
      params: uploadParams,
    })

    await upload.promise()
    const url = `https://${config.SAME_STORY_BUCKET_NAME}.s3.${
      config.AWS_DEFAULT_REGION
    }.amazonaws.com/${encodeURI(uploadParams.Key)}`

    return url
  }

  async fetchReportById(checkId: string, status: STATUS): Promise<Report> {
    if (!this.s3Client) {
      throw {
        message: 'AWS has not been configured',
      } as AWSError
    }

    const downloadParams = {
      Bucket: config.SAME_STORY_BUCKET_NAME,
      Key: `checks/${checkId}/report/${
        status === STATUS.SUCCESS ? 'results' : 'errors'
      }.json`,
    }

    try {
      const { Body } = await this.s3Client.send(
        new GetObjectCommand(downloadParams),
      )

      if (Body) {
        const streamData = await readDataFromStream(Body as ReadableStream)

        const result = await new Response(streamData).json()

        if (status === STATUS.SUCCESS) {
          return { result: result as ReportResult, checkId, status }
        } else {
          return { result: result as ErrorResult, checkId, status }
        }
      } else {
        throw {
          message: 'Error in fetching data.',
        } as AWSError
      }
    } catch (error) {
      console.error('error in aws', error)
      throw {
        message: 'Error in fetching data.',
      } as AWSError
    }
  }

  async fetchReportDifferenceById(
    checkId: string,
    difference: DIFF_TYPE,
  ): Promise<ArrayBuffer> {
    if (!this.s3Client) {
      throw {
        message: 'AWS has not been configured',
      } as AWSError
    }

    const downloadParams = {
      Bucket: config.SAME_STORY_BUCKET_NAME,
      Key: `checks/${checkId}/report/${difference}_difference.png`,
    }

    try {
      const data = this.s3Client.send(new GetObjectCommand(downloadParams))
      return (await data).Body as unknown as ArrayBuffer
    } catch (error) {
      throw {
        message: 'AWS has not been configured',
      } as AWSError
    }
  }
}

export default new AWSService()
