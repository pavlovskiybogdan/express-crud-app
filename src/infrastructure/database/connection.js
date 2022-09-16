import knex from 'knex'
import { Model } from 'objection'
import config from '../../../knexfile'

export class Connection {
  pool

  init () {
    if (this.pool) return

    this.pool = knex(config[process.env.NODE_ENV])

    Model.knex(this.pool)

    return this.pool
  }
}
