import { Model } from 'objection'

export class Admin extends Model {
  static get tableName() {
    return 'admin'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
      },
    }
  }
}
