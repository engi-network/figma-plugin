import { PublishCommand, PublishCommandOutput } from '@aws-sdk/client-sns'
import { AWSError } from 'aws-sdk'
import S3 from 'aws-sdk/clients/s3'

import { s3Client, snsClient } from '~/app/lib/awsClients'
import config from '~/app/lib/config'
import { POLLING_INTERVAL, RETRY_TIMES } from '~/app/lib/constants/aws'
import { Message } from '~/app/models/Message'
import { Report } from '~/app/models/Report'

import { decodeFromBuffer } from './buffer'

export const uploadCheckSpecificationToS3 = async ({
  check_id,
  component,
  height,
  repository,
  story,
  width,
}: Message): Promise<S3.ManagedUpload.SendData> => {
  const key = 'checks/' + check_id + '/specification.json'

  console.info('uploading key: ', key)

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
  const key = 'checks/' + check + '/frames/' + name

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
const checks = {
  EXAMPLE_CHECK_ID: {
    // the downloaded report from s3
    report: null,
    // the cancelable interval when polling for a report
    reportPoll: null,
  },
}

export const pollCheckReport = async (checkId: string) => {
  let timerId = -1
  let retryTimes = RETRY_TIMES

  timerId = setInterval(async () => {
    // if we have a report and are still polling, cancel it
    if (
      checks[checkId] &&
      checks[checkId].reportPoll &&
      checks[checkId].report
    ) {
      clearInterval(checks[checkId].reportPoll)
      checks[checkId].reportPoll = null
    } else {
      checks[checkId] = {}
      try {
        const report = await fetchCheckReport(checkId)
        if (report) {
          // set global store
          checks[checkId].report = report
          // setReportUI(report)
          // hideLoadingUI()
          clearInterval(timerId)
          return report
        }
      } catch (error) {
        const statusCode = (error as AWSError).statusCode
        console.info('error fetching status code', statusCode)
        if (retryTimes < 0 || statusCode !== 404) {
          clearInterval(timerId)
          const errorReport = await fetchCheckReport(checkId, true)
          console.info('error resport=======>', errorReport)
          return errorReport
        }

        if (statusCode === 404) {
          retryTimes -= 1
          console.info('left retry times======>', retryTimes)
        }
      }
    }
  }, POLLING_INTERVAL)
}

// get the generated (if complete) check report

export const fetchCheckReport = async (
  checkId: string,
  isError = false,
): Promise<Report> => {
  return new Promise((resolve, reject) => {
    s3Client.getObject(
      {
        Bucket: config.SAME_STORY_BUCKET_NAME,
        Key: `checks/${checkId}/report/${isError ? 'error' : 'results'}.json`,
      },
      async (error, data) => {
        if (error) {
          reject(error)
        } else {
          console.info('got report')
          if (data.Body) {
            console.info(data.Body)
            const result = decodeFromBuffer(data.Body as ArrayLike<number>)

            console.info(result)
            resolve({ result, checkId })
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
) => {
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
          console.info('got report difference')
          console.info(data)
          resolve(data.Body)
        }
      },
    )
  })
}
