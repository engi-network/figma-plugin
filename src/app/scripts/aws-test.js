/* eslint-disable @typescript-eslint/no-var-requires */
const { CognitoIdentityClient } = require('@aws-sdk/client-cognito-identity')
const {
  fromCognitoIdentityPool,
} = require('@aws-sdk/credential-provider-cognito-identity')
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3')
require('dotenv').config()
const config = require('~/app/lib/config')

// Set the AWS Region
const REGION = 'us-west-2' //REGION

// Initialize the Amazon Cognito credentials provider
const s3 = new S3Client({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: config.IDENTITY_POOL_ID, // IDENTITY_POOL_ID
  }),
})

const bucketName = 'same-story-api-staging' //BUCKET_NAME
const checkId = '7b1c0fd4-3c51-411c-a6eb-6bd07b35b3c4'

const addFile = async () => {
  const uploadParams = {
    Bucket: bucketName,
    Key: `checks/${checkId}/frames/Button With Knobs.png`,
    Body: 'foo',
  }
  const data = await s3.send(new PutObjectCommand(uploadParams))
  console.info(data)
}

const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })

const getFile = async () => {
  const downloadParams = {
    Bucket: bucketName,
    Key: `checks/${checkId}/report/results.json`,
  }
  const { Body } = await s3.send(new GetObjectCommand(downloadParams))
  const bodyContents = await streamToString(Body)
  console.info(bodyContents)
}

addFile()
getFile()
