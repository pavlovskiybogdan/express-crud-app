import express from 'express'
import cors from 'cors'
import { router } from '@/modules'
import { Connection } from '@/infrastructure/database/connection'
import { init as initDiContainer } from '@/infrastructure/di-container'

const bootstrap = async () => {
  const dependencies = [
    { name: 'Database', handler: (new Connection()).init },
    { name: 'DIContainer', handler: initDiContainer },
  ]

  await Promise.all(
    dependencies.map(async (dependency) => {
      await dependency.handler()
    }),
  )
}

const createApp = async () => {
  const app = express()

  try {
    await bootstrap()
  } catch (e) {
    console.error('Dependency load error', e)
    process.exit()
  }

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())

  app.use(router)

  return app
}

(async () => {
  const app = await createApp()

  app.listen(process.env.APP_PORT, () => console.log(`Application started on port ${process.env.APP_PORT}`))
})()
