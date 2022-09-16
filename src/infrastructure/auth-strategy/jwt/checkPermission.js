import { container, DEPENDENCIES } from '@/infrastructure/di-container'
import { HTTP_STATUSES } from '@/infrastructure/http/statuses'

export const checkPermission = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(HTTP_STATUSES.FORBIDDEN).send('Forbidden')
  }

  let user = {}

  try {
    user = await container.get(DEPENDENCIES.AuthJWTService).verifyToken(token)
  } catch (e) {
    return res.status(HTTP_STATUSES.FORBIDDEN).send('Forbidden')
  }

  if (!user.sub) {
    return res.status(HTTP_STATUSES.FORBIDDEN).send('Forbidden')
  }

  if (!req.context) req.context = {}

  req.context.user = user

  next()
}
