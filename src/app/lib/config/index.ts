const config = {
  AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION || '',
  SAME_STORY_BUCKET_NAME: process.env.SAME_STORY_BUCKET_NAME || '',
  TOPIC_ARN: process.env.TOPIC_ARN || '',
  IDENTITY_POOL_ID: process.env.IDENTITY_POOL_ID || '',
}

export default config
