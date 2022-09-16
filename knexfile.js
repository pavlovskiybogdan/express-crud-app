module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'test',
      user: 'test',
      password: 'test'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/src/infrastructure/database/migrations',
    },
  },
}
