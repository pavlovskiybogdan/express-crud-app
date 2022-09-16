import 'reflect-metadata'
import {
  Container, injectable, inject, decorate,
} from 'inversify'
import { AdminController } from '@/modules/admin/controllers/adminController'
import { AdminService } from '@/modules/admin/services/adminService'
import { AdminRepository } from '@/domain/repositories/adminRepository'
import { AuthController } from '@/modules/auth/controllers/authController'
import { AuthJWTService } from '@/infrastructure/auth-strategy/jwt/authJWTService'
import { AuthService } from '@/modules/auth/services/authService'

export const DEPENDENCIES = {
  AdminService: 'AdminService',
  AdminController: 'AdminController',
  AdminRepository: 'AdminRepository',
  AuthController: 'AuthController',
  AuthService: 'AuthService',
  AuthJWTService: 'AuthJWTService',
}

export const container = new Container()

export const init = () => {
  // @todo: add auto-discovery

  decorate(injectable(), AdminController)
  decorate(injectable(), AdminService)
  decorate(injectable(), AdminRepository)
  decorate(injectable(), AuthController)
  decorate(injectable(), AuthService)
  decorate(injectable(), AuthJWTService)

  decorate(inject(DEPENDENCIES.AdminRepository), AdminService, 0)
  decorate(inject(DEPENDENCIES.AuthJWTService), AdminService, 1)
  decorate(inject(DEPENDENCIES.AdminService), AdminController, 0)

  decorate(inject(DEPENDENCIES.AuthService), AuthController, 0)
  decorate(inject(DEPENDENCIES.AdminRepository), AuthService, 0)
  decorate(inject(DEPENDENCIES.AuthJWTService), AuthService, 1)

  container.bind(DEPENDENCIES.AdminService).to(AdminService)
  container.bind(DEPENDENCIES.AdminController).to(AdminController)
  container.bind(DEPENDENCIES.AdminRepository).to(AdminRepository)
  container.bind(DEPENDENCIES.AuthController).to(AuthController)
  container.bind(DEPENDENCIES.AuthService).to(AuthService)
  container.bind(DEPENDENCIES.AuthJWTService).to(AuthJWTService)
}
