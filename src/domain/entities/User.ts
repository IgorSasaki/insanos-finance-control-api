export interface User {
  createdAt: string
  email: string
  name: string
  nickname: string
  password: string
  userId: string
}

export interface CreateUserData {
  email: string
  name: string
  nickname: string
  password: string
}

export interface UserLoginData {
  email: string
  password: string
}
