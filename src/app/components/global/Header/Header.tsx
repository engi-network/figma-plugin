import { useNavigate } from 'react-router-dom'
import { string } from 'yargs'

import IconButton from '~/app/components/global/IconButton/IconButton'
import { ClockIcon, HistoryIcon, InfoIcon } from '~/app/components/global/Icons'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import { ui } from '~/app/lib/utils/ui-dictionary'

interface Props {
  numberOfProgress?: number
}

function Header({ numberOfProgress }: Props) {
  const navigate = useNavigate()

  const handleViewHistory = () => {
    navigate(ROUTES_MAP[ROUTES.HISTORY])
  }

  const handleViewProgress = () => {
    navigate(ROUTES_MAP[ROUTES.HISTORY], {
      state: { filter: { inProgress: true } },
    })
  }

  return (
    <header className="flex justify-between border-b border-text-secondary px-7 py-5">
      <div className="flex">
        <IconButton
          className="text-text-secondary mr-6"
          icon={<HistoryIcon className="text-text-secondary w-5 h-5" />}
          onClick={handleViewHistory}
        >
          {ui('main.history')}
        </IconButton>
        <div
          className="flex justify-center items-center"
          onClick={handleViewProgress}
          tabIndex={-1}
          role="button"
          aria-label="In progress"
        >
          <IconButton
            className="text-text-secondary mr-2"
            icon={<ClockIcon className="text-text-secondary w-5 h-5" />}
          >
            {ui('header.inProgress')}
          </IconButton>
          {!!numberOfProgress && (
            <span className="text-primary-green bg-black/40 backdrop-blur-[4px] rounded-full text-xs flex-inline justify-center items-center w-4 h-4 pl-[5px]">
              {numberOfProgress}
            </span>
          )}
        </div>
      </div>
      <IconButton
        className="text-primary-green"
        icon={<InfoIcon className="w-5 h-5 bg-opacity-40 text-primary-green" />}
      >
        {ui('header.learnMore')}
      </IconButton>
    </header>
  )
}

export default Header
