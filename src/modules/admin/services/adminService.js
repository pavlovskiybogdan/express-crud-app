export class AdminService {
  constructor(repository, jwtService) {
    this.repository = repository
    this.jwtService = jwtService
  }

  async findById(id) {
    return this.repository.findById(id)
  }

  async create(body) {
    let password = null
    try {
      password = await this.jwtService.hashPassword(body.password)
    } catch (e) {
      console.error(e)
      return {}
    }

    return this.repository.create({ ...body, password })
  }

  async update(id, body) {
    return this.repository.update(id, body)
  }

  async delete(id) {
    return this.repository.delete(id)
  }
}
