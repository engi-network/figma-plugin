import { SNSClient } from '@aws-sdk/client-sns'
import AWS from 'aws-sdk'

import config from '~/app/lib/config'

const awsConfig = {
  region: config.AWS_DEFAULT_REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.IDENTITY_POOL_ID,
  }),
}

AWS.config.update(awsConfig)

export const snsClient = new SNSClient(awsConfig)

export const s3Client = new AWS.S3(awsConfig)
