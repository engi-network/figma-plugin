import { InformationCircleIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'

import IconButton from '~/app/components/global/IconButton/IconButton'
import { HistoryIcon } from '~/app/components/global/Icons'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import { ui } from '~/app/lib/utils/ui-dictionary'

function Header() {
  const navigate = useNavigate()

  const handleViewHistory = () => {
    navigate(ROUTES_MAP[ROUTES.HISTORY])
  }

  return (
    <header className="flex justify-between border-b border-text-secondary px-7 py-5">
      <IconButton
        className="text-text-secondary text-sm"
        icon={<HistoryIcon className="text-text-secondary w-5 h-5" />}
        onClick={handleViewHistory}
      >
        {ui('main.history')}
      </IconButton>
      <IconButton
        className="text-primary-green text-sm"
        icon={
          <InformationCircleIcon className="w-5 h-5 bg-opacity-40 text-primary-green bg-primary-green rounded-full" />
        }
      >
        {ui('header.learnMore')}
      </IconButton>
    </header>
  )
}

export default Header
