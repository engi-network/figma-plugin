import { ArrowLeftIcon, ReplyIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router'

import Button from '~/app/components/global/Button/Button'
import Canvas from '~/app/components/global/Canvas/CanvasContainer'
import IconButton from '~/app/components/global/IconButton/IconButton'
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
    <div className="px-10">
      <div className="flex justify-between mb-16">
        <div className="w-2/12">
          <IconButton
            renderIcon={() => <ArrowLeftIcon className="w-5 h-5" />}
            className="rounded-full w-8 h-8 mr-5"
            onClick={handleClickBack}
          />
        </div>
        <div className="w-8/12 flex justify-center">
          <h1 className="text-3xl text-wf-primary w-6/12 text-center">
            Well done 99.55% match!
          </h1>
        </div>
        <div
          role="button"
          tabIndex={-1}
          className="flex w-2/12 justify-end"
          onClick={handleViewHistory}
        >
          <span className="text-sm text-wf-secondary mr-5">View history</span>
          <ReplyIcon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex mb-8">
        <div className="w-6/12 flex justify-start">
          <Canvas
            id="blue-scale-canvas"
            className="mb-4"
            width={300}
            height={300}
            draw={() => {}}
            options={{ contextId: '2d' }}
            label={ui('result.blueScale')}
          />
        </div>
        <div className="w-6/12 flex justify-end">
          <Canvas
            id="blue-scale-canvas"
            className="mb-4"
            width={300}
            height={300}
            draw={() => {}}
            options={{ contextId: '2d' }}
            label={ui('result.grayScale')}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button primary onClick={handleCreateNew} className="w-5/12 capitalize">
          {ui('result.createNew')}
        </Button>
      </div>
    </div>
  )
}

export default Result
