import {
  type CreateUserData,
  type User
} from '../../../domain/entities/User.ts'
import { type UserRepository } from '../../../domain/repositories/UserRepository.ts'
import { type PasswordService } from '../../../infra/auth/PasswordService.ts'
import { type TokenService } from '../../../infra/auth/TokenService.ts'

interface RegisterUserResponse {
  token: string
  user: Omit<User, 'password'>
}

export class RegisterUserUseCase {
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

  public async execute(payload: CreateUserData): Promise<RegisterUserResponse> {
    const encryptedPassword = await this.passwordService.hash(payload.password)

    const user = await this.userRepository.create({
      ...payload,
      password: encryptedPassword
    })

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
