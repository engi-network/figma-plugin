import { useEffect } from 'react'
import { FallbackProps } from 'react-error-boundary'

import { useAppContext } from '~/app/contexts/App.context'
import { useMainContext } from '~/app/contexts/Main.context'
import Sentry, { SENTRY_TRANSACTION } from '~/app/lib/services/sentry'
import { ui } from '~/app/lib/utils/ui-dictionary'
import ErrorPage from '~/app/pages/Error/ErrorPage'

function GlobalErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { setGlobalError } = useAppContext()
  const { setIsLoading } = useMainContext()
  useEffect(() => {
    Sentry.sendReport({
      error,
      transactionName: SENTRY_TRANSACTION.UNKNOWN,
    })
  }, [])

  const handleClickInput = () => {
    setGlobalError('')
    setIsLoading(false)

    resetErrorBoundary()
  }

  return (
    <ErrorPage onClick={handleClickInput} message={ui('error.globalError')} />
  )
}

export default GlobalErrorFallback
