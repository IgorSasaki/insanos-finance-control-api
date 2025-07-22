import bcrypt from 'bcrypt'

export class PasswordService {
  private readonly saltRounds = 12

  public async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds)
  }

  public async verify(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }
}
