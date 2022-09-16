import { Router } from 'express'
import { checkPermission } from '@/infrastructure/auth-strategy/jwt/checkPermission'
import { container, DEPENDENCIES } from '@/infrastructure/di-container'

export const router = new Router()

const routes = [
  {
    path: '/admin/:id',
    method: 'GET',
    middlewares: [checkPermission],
    handler: (req, res) => container.get(DEPENDENCIES.AdminController).findById(req, res),
  },
  {
    path: '/admin',
    method: 'POST',
    middlewares: [checkPermission],
    handler: (req, res) => container.get(DEPENDENCIES.AdminController).create(req, res),
  },
  {
    path: '/admin/:id',
    method: 'PUT',
    middlewares: [checkPermission],
    handler: (req, res) => container.get(DEPENDENCIES.AdminController).update(req, res),
  },
  {
    path: '/admin/:id',
    method: 'DELETE',
    middlewares: [checkPermission],
    handler: (req, res) => container.get(DEPENDENCIES.AdminController).delete(req, res),
  },
]

routes.forEach((route) => {
  router[route.method.toLowerCase()](route.path, ...route.middlewares, (req, res) => route.handler(req, res))
})
