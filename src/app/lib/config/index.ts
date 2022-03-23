const config = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION || '',
  TOPIC_ARN: 'arn:aws:sns:us-west-2:163803973373:same-story-check-topic',
}

export default config
