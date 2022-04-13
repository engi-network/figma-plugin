import { PublishCommand, PublishCommandOutput } from '@aws-sdk/client-sns'
import { AWSError } from 'aws-sdk'
import S3 from 'aws-sdk/clients/s3'

import { s3Client, snsClient } from '~/app/lib/awsClients'
import config from '~/app/lib/config'
import { MAX_RETRY_TIMES, POLLING_INTERVAL } from '~/app/lib/constants/aws'
import { DIFF_TYPE, isError, Report, ReportResult } from '~/app/models/Report'
import { Specification } from '~/app/models/Specification'

import { decodeFromBuffer } from './buffer'

export const uploadEncodedFrameToS3 = async (
  name,
  checkId,
  frame,
): Promise<S3.ManagedUpload.SendData> => {
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

export const publishCommandToSns = async (
  message: Specification,
): Promise<PublishCommandOutput> => {
  const params = {
    Message: JSON.stringify(message),
    TopicArn: config.TOPIC_ARN,
  }

  const data = await snsClient.send(new PublishCommand(params))
  console.info('Success from sns::', data)
  return data
}

export interface CallbackStatus {
  currentTimerId: number
  retryTimes: number
  success: boolean
}

export const pollReportById = async (
  checkId: string,
  callback: (status: CallbackStatus, data?: Report) => void,
) => {
  let retryTimes = 0
  let timerId = -1

  timerId = setInterval(async () => {
    try {
      const report = await fetchReportById(checkId)
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

export const fetchReportById = async (checkId: string): Promise<Report> => {
  return new Promise((resolve, reject) => {
    s3Client.getObject(
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

export const fetchReportDifferenceById = async (
  checkId: string,
  difference: DIFF_TYPE,
): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    s3Client.getObject(
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
