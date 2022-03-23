import { SNSClient } from '@aws-sdk/client-sns'

import config from '~/app/lib/config'

const snsClient = new SNSClient({ region: config.AWS_DEFAULT_REGION })

export default snsClient
