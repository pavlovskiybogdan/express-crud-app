export class AuthController {
  constructor(service) {
    this.service = service
  }

  async login(req, res) {
    return this.service.login(req, res)
  }
}
