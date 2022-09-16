import { BadRequestException } from '@/infrastructure/http/exceptions/badRequestException'
import { NotFoundException } from '@/infrastructure/http/exceptions/notFoundException'

export class AuthService {
  constructor(adminRepository, jwtService) {
    this.adminRepository = adminRepository
    this.jwtService = jwtService
  }

  async login(req, res) {
    const { username, password } = req.body

    if (!username || !password) {
      throw new BadRequestException('Incorrect credentials')
    }

    const [admin] = await this.adminRepository.findByName(username)

    if (!admin) {
      throw new NotFoundException()
    }

    const compareResult = await this.jwtService.comparePassword(password, admin.password)

    if (!compareResult) {
      throw new BadRequestException('Incorrect credentials')
    }

    const accessToken = await this.jwtService.generateToken({
      sub: admin.id,
      username: admin.username,
      type: 'ACCESS_TOKEN',
    })
    const refreshToken = await this.jwtService.generateToken({
      sub: admin.id,
      username: admin.username,
      type: 'REFRESH_TOKEN',
    })

    return res.send({ accessToken, refreshToken })
  }
}
