import { ArrowLeftIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router'

import HistoryIcon from '~/app/assets/icons/common/history.svg'
import Button from '~/app/components/global/Button/Button'
import Canvas from '~/app/components/global/Canvas/CanvasContainer'
import IconButton from '~/app/components/global/IconButton/IconButton'
import { BUTTON_STYLE } from '~/app/lib/constants'
import { ui } from '~/app/lib/utils/ui-dictionary'

function Result() {
  const navigate = useNavigate()

  const handleClickBack = () => {
    navigate('/')
  }

  const handleViewHistory = () => {}

  const handleCreateNew = () => {
    navigate('/')
  }

  return (
    <div className="px-10 pt-10">
      <div className="flex justify-between mb-16 relative">
        <IconButton
          icon={<ArrowLeftIcon className="w-4 h-4 text-primary-dark" />}
          buttonStyle={BUTTON_STYLE.OUTLINED}
          onClick={handleClickBack}
        />
        <div className="absolute flex justify-center top-0 left-0 right-0 -z-10">
          <h1 className="text-2xl text-primary-dark w-6/12 text-center font-bold">
            Well done <br />
            <span className="bg-primary-green">99.55%</span> match!
          </h1>
        </div>
        <div
          role="button"
          tabIndex={-1}
          className="flex justify-end items-center h-fit"
          onClick={handleViewHistory}
        >
          <span className="text-sm text-wf-secondary mr-5">
            {ui('result.viewHistory')}
          </span>
          <IconButton
            icon={<img src={HistoryIcon} width={24} height={24} />}
            buttonStyle={BUTTON_STYLE.OUTLINED}
          />
        </div>
      </div>
      <div className="flex mb-8">
        <div className="w-6/12 flex justify-start">
          <Canvas
            id="blue-scale"
            className="mb-4"
            width={210}
            height={210}
            draw={() => {}}
            options={{ contextId: '2d' }}
            label={ui('result.blueScale')}
          />
        </div>
        <div className="w-6/12 flex justify-end">
          <Canvas
            id="blue-scale"
            className="mb-4"
            width={210}
            height={210}
            draw={() => {}}
            options={{ contextId: '2d' }}
            label={ui('result.grayScale')}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={handleCreateNew} className="w-5/12 capitalize">
          {ui('result.createNew')}
        </Button>
      </div>
    </div>
  )
}

export default Result