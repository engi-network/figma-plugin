const config = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  SAME_STORY_BUCKET_NAME: process.env.SAME_STORY_BUCKET_NAME || '',
  TOPIC_ARN: process.env.TOPIC_ARN || '',
}

export default config
