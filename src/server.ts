import Fastify from 'fastify'

import cors from '@fastify/cors'

import { env } from './env.ts'
import { authRoutes } from './interfaces/routes/AuthRoutes.ts'
import { errorHandler } from './shared/middlewares/errorHandler.ts'

const fastify = Fastify()

const app = async () => {
  try {
    await fastify.register(cors, {
      origin: true
    })

    fastify.get('/health', async () => {
      return {
        message: 'Insanos Finance Control API is running!',
        success: true,
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }
    })

    await fastify.register(authRoutes, { prefix: '/auth' })

    fastify.setNotFoundHandler(async (_, response) => {
      response.status(404).send({
        message: 'Route not found',
        success: false
      })
    })

    fastify.setErrorHandler(errorHandler)

    await fastify.listen({ port: env.PORT })

    console.log(`🏍️  Moto Club Cashflow API running on port ${env.PORT}`)
    console.log(`📖  Health check: http://localhost:${env.PORT}/health`)
    console.log(`💾  DynamoDB: ${env.DYNAMODB_ENDPOINT || 'AWS'}`)
  } catch (error) {
    fastify.log.error({ appError: error })

    process.exit(1)
  }
}

app()

export default app
