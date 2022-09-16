import { Router } from 'express'
import { router as adminRouter } from '@/modules/admin'
import { router as authRouter } from '@/modules/auth'

export const router = new Router()

router.use(authRouter)
router.use(adminRouter)
