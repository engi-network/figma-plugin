import { useNavigate } from 'react-router-dom'

import IconButton from '~/app/components/global/IconButton/IconButton'
import { ClockIcon, HistoryIcon, InfoIcon } from '~/app/components/global/Icons'
import { useUserContext } from '~/app/contexts/User.context'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import GAService, {
  GA_EVENT_NAMES,
  MeasurementData,
} from '~/app/lib/services/ga'
import { ui } from '~/app/lib/utils/ui-dictionary'

interface Props {
  numberOfProgress?: number
}

/**
 *
 * @TODO sid and cid should be handled in the app
 */

function Header({ numberOfProgress }: Props) {
  const navigate = useNavigate()
  const { userId, sessionId } = useUserContext()

  const handleViewHistory = () => {
    const queryParams: MeasurementData = {
      _ss: '0',
      cid: userId,
      dp: '/history',
      dt: 'History',
      en: GA_EVENT_NAMES.PAGE_VIEW,
      seg: '0',
      sid: sessionId,
      sr: '600x800',
      user_id: userId,
    }

    // don't need to await
    GAService.sendMeasurementData(queryParams)
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
