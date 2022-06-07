import { ChevronLeftIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'

import IconButton from '~/app/components/global/IconButton/IconButton'
import { ECharIcon, InfoIcon } from '~/app/components/global/Icons'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { uiJSX } from '~/app/lib/utils/ui-dictionary-jsx'

function HistoryHeader() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(ROUTES_MAP[ROUTES.HOME])
  }

  const handleClickWhy = () => {}

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
          className="text-primary-white"
          icon={
            <InfoIcon className="w-5 h-5 bg-opacity-40 text-primary-white" />
          }
          onClick={handleClickWhy}
        >
          {uiJSX('header.whyEngi', {
            eIcon: (
              <ECharIcon
                width={9}
                height={8}
                className="inline-flex mr-[1px]"
              />
            ),
          })}
        </IconButton>
      </div>
    </div>
  )
}

export default HistoryHeader
