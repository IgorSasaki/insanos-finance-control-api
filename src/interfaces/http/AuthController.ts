import { type FastifyReply, type FastifyRequest } from 'fastify'

import { type RegisterUserUseCase } from '../../application/use-cases/auth/RegisterUserUseCase.ts'
import { registerSchema } from '../../shared/validation/schemas.ts'

export class AuthController {
  private readonly registerUserUseCase: RegisterUserUseCase

  constructor(registerUserUseCase: RegisterUserUseCase) {
    this.registerUserUseCase = registerUserUseCase
  }

  async register(
    request: FastifyRequest,
    response: FastifyReply
  ): Promise<void> {
    const validatedData = registerSchema.parse(request.body)

    const result = await this.registerUserUseCase.execute(validatedData)

    response.status(201).send({
      data: result,
      success: true
    })
  }
}
