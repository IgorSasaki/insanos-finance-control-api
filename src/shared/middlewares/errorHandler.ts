import {
  type FastifyError,
  type FastifyReply,
  type FastifyRequest
} from 'fastify'
import { ZodError } from 'zod'

import { AppError } from '../errors/AppError.ts'

export const errorHandler = (
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply
) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      message: error.message,
      success: false
    })
  }

  if (error instanceof ZodError) {
    const validationErrors = error.issues.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }))

    return reply.status(400).send({
      errors: validationErrors,
      message: 'Validation error',
      success: false
    })
  }

  return reply.status(500).send({
    message: 'Internal server error',
    success: false
  })
}
