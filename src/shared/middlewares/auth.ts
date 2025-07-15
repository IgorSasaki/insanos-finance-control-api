import { FastifyRequest, FastifyReply } from 'fastify'
import jwt from 'jsonwebtoken'

import { env } from '../../env.ts'
import { UnauthorizedError } from '../errors/AppError.ts'

export interface AuthenticatedRequest extends FastifyRequest {
  userId?: string
}

export const authMiddleware = async (
  request: AuthenticatedRequest,
  _: FastifyReply
) => {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Token not provided')
    }

    const token = authHeader.substring(7)

    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string }

    request.userId = decoded.userId
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError('Invalid token')
    }

    throw error
  }
}
