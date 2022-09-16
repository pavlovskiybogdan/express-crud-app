export class CoreException extends Error {
  constructor(message, type = 'core') {
    super(message)
    this.status = 0
  }
}
