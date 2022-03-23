import { SNSClient } from '@aws-sdk/client-sns'

import config from '~/app/lib/config'

const snsClient = new SNSClient({
  region: config.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
})

export default snsClient
