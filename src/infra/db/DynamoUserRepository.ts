import { v4 as uuidv4 } from 'uuid'

import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand
} from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

import { TABLE_NAMES } from '../../config/dynamo.config.ts'
import { type CreateUserData, type User } from '../../domain/entities/User.ts'
import { type UserRepository } from '../../domain/repositories/UserRepository.ts'
import { ConflictError } from '../../shared/errors/AppError.ts'

export class DynamoUserRepository implements UserRepository {
  private readonly dynamoClient: DynamoDBClient

  constructor(dynamoClient: DynamoDBClient) {
    this.dynamoClient = dynamoClient
  }

  async create(userData: CreateUserData): Promise<User> {
    const existingUser = await this.findByEmail(userData.email)

    if (existingUser) {
      throw new ConflictError('User already exists with this email')
    }

    const user: User = {
      createdAt: new Date().toISOString(),
      email: userData.email,
      name: userData.name,
      nickname: userData.nickname,
      password: userData.password,
      userId: uuidv4()
    }

    const command = new PutItemCommand({
      Item: marshall(user),
      TableName: TABLE_NAMES.USERS
    })

    await this.dynamoClient.send(command)
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const command = new QueryCommand({
      ExpressionAttributeValues: marshall({
        ':email': email
      }),
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      TableName: TABLE_NAMES.USERS
    })

    const result = await this.dynamoClient.send(command)

    if (!result.Items || result.Items.length === 0) {
      return null
    }

    return unmarshall(result.Items[0]) as User
  }

  async findById(id: string): Promise<User | null> {
    const command = new GetItemCommand({
      Key: marshall({ id }),
      TableName: TABLE_NAMES.USERS
    })

    const result = await this.dynamoClient.send(command)

    if (!result.Item) {
      return null
    }

    return unmarshall(result.Item) as User
  }
}
