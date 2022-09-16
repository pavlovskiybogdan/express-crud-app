import { CoreException } from './coreException'
import { HTTP_STATUSES } from '../statuses'

export class BadRequestException extends CoreException {
  constructor(message = '') {
    super(`Something went wrong on server ${message}`)
    this.status = HTTP_STATUSES.BAD_REQUEST
  }
}
