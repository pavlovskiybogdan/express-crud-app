import { CoreException } from './coreException'
import { HTTP_STATUSES } from '../statuses'

export class NotFoundException extends CoreException {
  constructor(message = '') {
    super(`Not Found ${message}`)
    this.status = HTTP_STATUSES.NOT_FOUND
  }
}
