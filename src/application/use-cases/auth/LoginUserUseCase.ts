import { User, UserLoginData } from '../../../domain/entities/User.ts'
import { UserRepository } from '../../../domain/repositories/UserRepository.ts'
import { PasswordService } from '../../../infra/auth/PasswordService.ts'
import { TokenService } from '../../../infra/auth/TokenService.ts'
import { UnauthorizedError } from '../../../shared/errors/AppError.ts'

interface LoginUserResponse {
  token: string
  user: Omit<User, 'password'>
}

export class LoginUserUseCase {
  private readonly userRepository: UserRepository
  private readonly passwordService: PasswordService
  private readonly tokenService: TokenService

  constructor(
    userRepository: UserRepository,
    passwordService: PasswordService,
    tokenService: TokenService
  ) {
    this.userRepository = userRepository
    this.passwordService = passwordService
    this.tokenService = tokenService
  }

  async execute(loginData: UserLoginData): Promise<LoginUserResponse> {
    const user = await this.userRepository.findByEmail(loginData.email)

    if (!user) {
      throw new UnauthorizedError('Invalid credentials')
    }

    const isPasswordValid = await this.passwordService.verify(
      loginData.password,
      user.password
    )

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials')
    }

    const token = this.tokenService.generateToken(user.userId)

    return {
      token,
      user: {
        createdAt: user.createdAt,
        email: user.email,
        name: user.name,
        nickname: user.nickname,
        userId: user.userId
      }
    }
  }
}
