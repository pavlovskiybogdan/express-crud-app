import * as bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export class AuthJWTService {
  async hashPassword(password) {
    return bcrypt.hash(password, 10)
  }

  async comparePassword(password, hashPassword) {
    return bcrypt.compare(password, hashPassword)
  }

  async generateToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_TTL })
  }

  async verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
  }
}
