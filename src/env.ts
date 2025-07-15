import { z } from 'zod'

const envSchema = z.object({
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_REGION: z.string().default('us-east-1'),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  DYNAMODB_ENDPOINT: z.string().optional(),
  DYNAMODB_TABLE_PREFIX: z.string().default('IFC_'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  JWT_SECRET: z.string().min(1),
  PORT: z.string().default('3333')
})

const env = envSchema.parse(process.env)

export { env }
