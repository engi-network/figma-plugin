/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

const { CognitoIdentityClient } = require('@aws-sdk/client-cognito-identity')
const {
  DeleteMessageCommand,
  ReceiveMessageCommand,
  SQSClient,
} = require('@aws-sdk/client-sqs')
const {
  fromCognitoIdentityPool,
} = require('@aws-sdk/credential-provider-cognito-identity')

// be careful with this script b/c it deletes status messages from QUEUE_URL w/o
// filtering on check_id
// could cause a lot of confusion if left running on a laptop somewhere :)

// AWS Region
const REGION = 'us-west-2'
const QUEUE_URL = process.env['SQS_URL']
const IDENTITY_POOL_ID = process.env['IDENTITY_POOL_ID']

const sqsClient = new SQSClient({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: IDENTITY_POOL_ID,
  }),
})

const stringify = (thing) => {
  return JSON.stringify(thing, null, 2)
}

const processMsg = async (msg) => {
  const msg_ = JSON.parse(msg.Body)
  console.info(`message: ${msg_.Message}`)
  if (msg_.Message.check_id === '') {
    // TODO check the check_id before deleting the status message
  }
  const data_ = await sqsClient.send(
    new DeleteMessageCommand({
      QueueUrl: QUEUE_URL,
      ReceiptHandle: msg.ReceiptHandle,
    }),
  )
  console.info(`message deleted: ${stringify(data_)}`)
}

const receiveMessages = async () => {
  console.info('checking for messages')
  const data = await sqsClient.send(
    new ReceiveMessageCommand({
      QueueUrl: QUEUE_URL,
      WaitTimeSeconds: 1,
      MaxNumberOfMessages: 10,
    }),
  )
  if (data.Messages) {
    await Promise.all(data.Messages.map(processMsg))
  }
}

const run = async () => {
  console.info(`IDENTITY_POOL_ID='${IDENTITY_POOL_ID}'`)
  console.info(`QUEUE_URL='${QUEUE_URL}'`)
  setInterval(receiveMessages, 10000)
}

run()
