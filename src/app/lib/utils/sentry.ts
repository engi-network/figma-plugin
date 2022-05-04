import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

import config from '~/app/lib/config'

export enum SENTRY_TRANSACTION {
  GET_POLLING = 'GET /polling',
  GET_REPORT = 'GET /report',
}

class SentryReport {
  construct() {}

  isInitialized = false
  init() {
    Sentry.init({
      dsn: config.SENTRY_DNS,
      integrations: [new BrowserTracing()],
      tracesSampleRate: 1.0,
      environment:
        process.env.NODE_ENV === 'development' ? 'development' : 'production',
    })
    this.isInitialized = true
  }

  sendReport({
    error,
    transactionName,
    tagData,
  }: {
    error: Error
    tagData: Record<string, string>
    transactionName: SENTRY_TRANSACTION
  }) {
    Sentry.captureException(error, (scope) => {
      scope.clear()
      scope.setTransactionName(transactionName)
      Object.entries(tagData).map(([key, value]) => {
        scope.setTag(key, value)
      })

      return scope
    })
  }
}

export default new SentryReport()
