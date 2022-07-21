import { AWSError } from '~/app/@types/aws-error'

export class SQSError extends Error {
  code?: string
  statusCode?: number
  region?: string
  hostname?: string
  time?: Date
  retryable?: boolean

  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}

export class TimeoutError extends Error {
  constructor(message = 'Operation timed out.') {
    super(message)
    this.message = message
    this.name = 'TimeoutError'
  }
}

export function toSQSError(err: AWSError, message: string): SQSError {
  const sqsError = new SQSError(message)

  sqsError.code = err.code
  sqsError.statusCode = err.statusCode
  sqsError.region = err.region
  sqsError.retryable = err.retryable
  sqsError.hostname = err.hostname
  sqsError.time = err.time

  return sqsError
}

export function isConnectionError(err: Error): boolean {
  if (err instanceof SQSError) {
    return (
      err.statusCode === 403 ||
      err.code === 'CredentialsError' ||
      err.code === 'UnknownEndpoint'
    )
  }
  return false
}

interface TimeoutResponse {
  pending: Promise<void>
  timeout: NodeJS.Timeout
}

export function createTimeout(duration: number): TimeoutResponse[] {
  let timeout
  const pending = new Promise((_, reject) => {
    timeout = setTimeout((): void => {
      reject(new TimeoutError())
    }, duration)
  })
  return [timeout, pending]
}
