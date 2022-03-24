import { SNSClient } from '@aws-sdk/client-sns'
import S3 from 'aws-sdk/clients/s3'

import config from '~/app/lib/config'

export const snsClient = new SNSClient({
  region: config.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
})

export const s3Client = new S3()
