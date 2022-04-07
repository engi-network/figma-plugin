import { PublishCommand, PublishCommandOutput } from '@aws-sdk/client-sns'
import { AWSError } from 'aws-sdk'
import S3 from 'aws-sdk/clients/s3'

import { s3Client, snsClient } from '~/app/lib/awsClients'
import config from '~/app/lib/config'
import { MAX_RETRY_TIMES, POLLING_INTERVAL } from '~/app/lib/constants/aws'
import { CheckItem, CheckTable } from '~/app/models/Check'
import { Message } from '~/app/models/Message'
import { isError, Report, ReportResult } from '~/app/models/Report'

import { decodeFromBuffer } from './buffer'

export const uploadCheckSpecificationToS3 = async ({
  check_id,
  component,
  height,
  repository,
  story,
  width,
}: Message): Promise<S3.ManagedUpload.SendData> => {
  const key = `checks/${check_id}/specification.json`
  const specification = JSON.stringify({
    check_id,
    component,
    height,
    repository,
    story,
    width,
  })

  const upload = new S3.ManagedUpload({
    params: {
      Bucket: config.SAME_STORY_BUCKET_NAME,
      Key: key,
      Body: new Blob([specification], { type: 'text/json' }),
    },
  })

  return upload.promise()
}

export const uploadEncodedFrameToS3 = async (
  name,
  check,
  frame,
): Promise<S3.ManagedUpload.SendData> => {
  const key = `checks/${check}/frames/${name}.png`

  const upload = new S3.ManagedUpload({
    params: {
      Bucket: config.SAME_STORY_BUCKET_NAME,
      Key: key,
      Body: frame,
    },
  })

  return upload.promise()
}

export const startEcsCheck = async (
  message: Message,
): Promise<PublishCommandOutput> => {
  const params = {
    Message: JSON.stringify(message),
    TopicArn: config.TOPIC_ARN,
  }
  const data = await snsClient.send(new PublishCommand(params))
  console.info('Success from sns', data)
  return data
}

// all checks the user has started since the plugin has been open
const checkTable: CheckTable = {
  EXAMPLE_CHECK_ID: {
    report: null,
    reportPollId: undefined,
  },
}

export const pollCheckReport = async (
  checkId: string,
  callback: (
    status: { retryTimes: number; success: boolean },
    data?: Report,
  ) => void,
) => {
  if (
    checkTable[checkId] &&
    checkTable[checkId].reportPollId &&
    checkTable[checkId].report
  ) {
    clearInterval(checkTable[checkId].reportPollId)
    checkTable[checkId].reportPollId = undefined
    return checkTable[checkId].report
  }

  let retryTimes = 0
  let timerId = -1

  timerId = setInterval(async () => {
    checkTable[checkId] = {} as CheckItem
    try {
      const report = await fetchCheckReport(checkId)
      clearInterval(timerId)

      if (!isError(report.result)) {
        checkTable[checkId].report = report
        callback(
          {
            success: true,
            retryTimes,
          },
          report,
        )
      } else {
        callback({ success: false, retryTimes }, report)
      }
    } catch (error) {
      const statusCode = (error as AWSError).statusCode

      if (retryTimes > MAX_RETRY_TIMES || statusCode !== 404) {
        clearInterval(timerId)
        callback({ success: false, retryTimes })
      }

      if (statusCode === 404) {
        retryTimes += 1
        callback({ success: false, retryTimes })
      }
    }
  }, POLLING_INTERVAL)
}

export const fetchCheckReport = async (checkId: string): Promise<Report> => {
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
export const fetchCheckReportDifference = async (
  checkId: string,
  difference: string,
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
