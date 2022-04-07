import { InformationCircleIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'

import IconButton from '~/app/components/global/IconButton/IconButton'
import { ui } from '~/app/lib/utils/ui-dictionary'

function HistoryHeader() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="flex justify-between border-b border-text-secondary px-7 py-5">
      <div className="flex justify-center items-center">
        <IconButton
          className="text-wf-secondary"
          icon={<ChevronLeftIcon className="w-6 h-6 text-wf-secondary" />}
          onClick={handleBack}
        >
          {ui('header.back')}
        </IconButton>
      </div>
      <div className="flex items-center">
        <IconButton
          className="text-wf-secondary text-sm"
          icon={
            <InformationCircleIcon className="w-5 h-5 text-wf-secondary mr-1" />
          }
          onClick={() => {}}
        >
          {ui('main.history')}
        </IconButton>
      </div>
    </div>
  )
}

export default HistoryHeader
