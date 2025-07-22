import { type FastifyInstance } from 'fastify'

import { RegisterUserUseCase } from '../../application/use-cases/auth/RegisterUserUseCase.ts'
import { dynamoClient } from '../../config/dynamo.config.ts'
import { PasswordService } from '../../infra/auth/PasswordService.ts'
import { TokenService } from '../../infra/auth/TokenService.ts'
import { DynamoUserRepository } from '../../infra/db/DynamoUserRepository.ts'
import { AuthController } from '../http/AuthController.ts'

const userRepository = new DynamoUserRepository(dynamoClient)
const passwordService = new PasswordService()
const tokenService = new TokenService()

const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  passwordService,
  tokenService
)

const authController = new AuthController(registerUserUseCase)

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/register', async (request, reply) => {
    await authController.register(request, reply)
  })
}
