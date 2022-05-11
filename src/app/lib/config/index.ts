const config = {
  AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION || '',
  GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID || '',
  IDENTITY_POOL_ID: process.env.IDENTITY_POOL_ID || '',
  QUEUE_URL: process.env.QUEUE_URL || '',
  SAME_STORY_BUCKET_NAME: process.env.SAME_STORY_BUCKET_NAME || '',
  SENTRY_DNS: process.env.SENTRY_DNS || '',
  SOCKET_URL: process.env.SOCKET_URL || '',
  TOPIC_ARN: process.env.TOPIC_ARN || '',
}

export default config
