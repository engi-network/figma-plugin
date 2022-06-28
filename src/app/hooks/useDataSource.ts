import { useCallback, useEffect } from 'react'

import { useAppContext } from '~/app/contexts/App.context'
import { store } from '~/app/lib/services/data-source'
import { useStore } from '~/app/lib/utils/store'

function useDataSource() {
  const { setHistory } = useAppContext()

  const localHistory = useStore(
    store,
    useCallback((state) => state.history, []),
  )

  useEffect(() => {
    setHistory(localHistory)
  }, [localHistory])

  return { localHistory }
}

export default useDataSource
