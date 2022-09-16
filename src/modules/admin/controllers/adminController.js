export class AdminController {
  constructor(service) {
    this.service = service
  }

  async findById(req, res) {
    const admin = await this.service.findById(req.params.id)

    if (!admin) {
      return res.status(404).send('Not Found')
    }

    return res.send(admin)
  }

  async create(req, res) {
    const admin = await this.service.create(req.body)

    return res.send(admin)
  }

  async update(req, res) {
    const admin = await this.service.update(req.params.id, req.body)

    return res.send(admin)
  }

  async delete(req, res) {
    await this.service.delete(req.params.id)

    return res.send({})
  }
}
