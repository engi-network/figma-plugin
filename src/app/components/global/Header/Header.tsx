import { TrashIcon } from '@heroicons/react/solid'
import { createSearchParams, useNavigate } from 'react-router-dom'

import IconButton from '~/app/components/global/IconButton/IconButton'
import {
  ClockIcon,
  ECharIcon,
  HistoryIcon,
  InfoIcon,
} from '~/app/components/global/Icons'
import { useUserContext } from '~/app/contexts/User.context'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import GAService, {
  GA_EVENT_NAMES,
  MeasurementData,
} from '~/app/lib/services/ga'
import { dispatchData } from '~/app/lib/utils/event'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { uiJSX } from '~/app/lib/utils/ui-dictionary-jsx'
import { History } from '~/app/models/Report'
import { SAME_STORY_CLEAR_HISTORY } from '~/plugin/constants'

interface Props {
  numberOfProgress?: number
  setHistory?: (value: History) => void
}

/**
 *
 * @TODO sid and cid should be handled in the app
 */

const isDev = process.env.NODE_ENV === 'development'
function Header({ numberOfProgress = 0, setHistory }: Props) {
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
    if (numberOfProgress <= 0) {
      return
    }
    const filterParams = JSON.stringify({ inProgress: true })
    navigate({
      pathname: ROUTES_MAP[ROUTES.HISTORY],
      search: `?${createSearchParams({ filter: filterParams })}`,
    })
  }

  const handleClearHistory = () => {
    dispatchData({
      type: SAME_STORY_CLEAR_HISTORY,
    })
    setHistory && setHistory([])
  }

  const handleClickWhy = () => {}

  return (
    <header className="flex justify-between border-b border-text-secondary px-7 py-5">
      <div className="flex">
        {!numberOfProgress && (
          <IconButton
            className="text-text-secondary mr-6"
            icon={<HistoryIcon className="text-text-secondary w-5 h-5" />}
            onClick={handleViewHistory}
          >
            {ui('main.history')}
          </IconButton>
        )}
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
            <span className="text-primary-green font-bold bg-black/40 backdrop-blur-[4px] rounded-full text-xs flex-inline justify-center items-center w-4 h-4 pl-[5px]">
              {numberOfProgress}
            </span>
          )}
        </div>
        {isDev && (
          <IconButton
            className="text-text-secondary ml-2"
            icon={<TrashIcon className="text-text-secondary w-5 h-5" />}
            onClick={handleClearHistory}
          >
            {'Clear History'}
          </IconButton>
        )}
      </div>
      <IconButton
        className="text-primary-white"
        icon={<InfoIcon className="w-5 h-5 bg-opacity-40 text-primary-white" />}
        onClick={handleClickWhy}
      >
        {uiJSX('header.whyEngi', {
          eIcon: (
            <ECharIcon width={9} height={8} className="inline-flex mr-[1px]" />
          ),
        })}
      </IconButton>
    </header>
  )
}

export default Header
