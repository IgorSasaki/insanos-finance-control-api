import jwt, { type SignOptions } from 'jsonwebtoken'

import { env } from '../../env.ts'

export class TokenService {
  generateToken(userId: string): string {
    const options: SignOptions = {
      expiresIn: '7D'
    }

    return jwt.sign({ userId }, env.JWT_SECRET, options)
  }

  verifyToken(token: string): { userId: string } {
    return jwt.verify(token, env.JWT_SECRET) as { userId: string }
  }
}
