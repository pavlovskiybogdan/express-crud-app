import { Router } from 'express'
import { container, DEPENDENCIES } from '@/infrastructure/di-container'

export const router = new Router()

const routes = [
  {
    path: '/auth/login',
    method: 'POST',
    handler: (req, res) => container.get(DEPENDENCIES.AuthController).login(req, res),
  },
]

routes.forEach((route) => {
  router[route.method.toLowerCase()](route.path, (req, res) => route.handler(req, res))
})
