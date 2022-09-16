import { container, DEPENDENCIES } from '@/infrastructure/di-container'

export const checkPermission = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    res.status(401).send('Forbidden')
  }

  let user = {}

  try {
    user = await container.get(DEPENDENCIES.AuthJWTService).verifyToken(token)
  } catch (e) {
    res.status(401).send('Forbidden')
  }

  if (!user.sub) {
    res.status(401).send('Forbidden')
  }

  if (!req.context) req.context = {}

  req.context.user = user

  next()
}
