export type AWSError = Error & {
  /**
   * CloudFront request ID associated with the response.
   */
  cfId?: string
  /**
   * A unique short code representing the error that was emitted.
   */
  code: string
  /**
   * Second request ID associated with the response from S3.
   */
  extendedRequestId?: string
  /**
   * Set when a networking error occurs to easily identify the endpoint of the request.
   */
  hostname?: string
  /**
   * A longer human readable error message.
   */
  message: string
  /**
   * The original error which caused this Error
   */
  originalError?: Error
  /**
   * Set when a networking error occurs to easily identify the region of the request.
   */
  region?: string
  /**
   * The unique request ID associated with the response.
   */
  requestId?: string
  /**
   * Amount of time (in seconds) that the request waited before being resent.
   */
  retryDelay?: number
  /**
   * Whether the error message is retryable.
   */
  retryable?: boolean
  /**
   * In the case of a request that reached the service, this value contains the response status code.
   */
  statusCode?: number
  /**
   * The date time object when the error occurred.
   */
  time: Date
}
