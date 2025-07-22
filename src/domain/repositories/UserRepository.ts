import { type User } from '../entities/User.ts'

export interface UserRepository {
  create(userData: {
    email: string
    name: string
    nickname: string
    password: string
  }): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}
