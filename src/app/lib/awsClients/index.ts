import { SNSClient } from '@aws-sdk/client-sns'
import AWS from 'aws-sdk'
import S3 from 'aws-sdk/clients/s3'

import config from '~/app/lib/config'

AWS.config.update({
  region: config.AWS_DEFAULT_REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.IDENTITY_POOL_ID,
  }),
})

export const snsClient = new SNSClient({
  region: config.AWS_DEFAULT_REGION,
})

export const s3Client = new S3()
