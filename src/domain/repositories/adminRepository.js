import { Admin } from '@/infrastructure/database/models/admin'

export class AdminRepository {
  async findById(id) {
    return Admin.query().findById(id)
  }

  async findByName(username) {
    return Admin.query().where('username', '=', username)
  }

  async create(body) {
    return Admin.query().insert(body)
  }

  async update(id, body) {
    return Admin.query().findById(id).patch(body)
  }

  async delete(id) {
    // @todo: soft delete?
    return Admin.query().deleteById(id)
  }
}
