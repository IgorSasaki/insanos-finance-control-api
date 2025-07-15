/* eslint-disable prettier/prettier */
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

import { env } from '../env.ts'

const dynamoConfig = {
  region: env.AWS_REGION,
  ...(env.DYNAMODB_ENDPOINT && {
    endpoint: env.DYNAMODB_ENDPOINT
  }),
  ...(env.AWS_ACCESS_KEY_ID &&
    env.AWS_SECRET_ACCESS_KEY && {
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
      }
    })
}

export const dynamoClient = new DynamoDBClient(dynamoConfig)

export const TABLE_NAMES = {
  TRANSACTIONS: `${env.DYNAMODB_TABLE_PREFIX}transactions`,
  USERS: `${env.DYNAMODB_TABLE_PREFIX}users`
} as const
