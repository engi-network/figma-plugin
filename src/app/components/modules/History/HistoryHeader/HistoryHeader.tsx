import { InformationCircleIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'

import IconButton from '~/app/components/global/IconButton/IconButton'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import { ui } from '~/app/lib/utils/ui-dictionary'

function HistoryHeader() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(ROUTES_MAP[ROUTES.HOME])
  }

  return (
    <div className="flex justify-between border-b border-text-secondary px-7 py-5">
      <div className="flex justify-center items-center">
        <IconButton
          className="text-text-secondary"
          icon={<ChevronLeftIcon className="w-5 h-5" />}
          onClick={handleBack}
        >
          {ui('header.back')}
        </IconButton>
      </div>
      <div className="flex items-center">
        <IconButton
          className="text-text-secondary"
          icon={<InformationCircleIcon className="w-5 h-5" />}
        >
          {ui('header.learnMore')}
        </IconButton>
      </div>
    </div>
  )
}

export default HistoryHeader
