import { ChevronLeftIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '~/app/components/global/Button/Button'
import Canvas from '~/app/components/global/Canvas/CanvasContainer'
import Header from '~/app/components/global/Header/Header'
import IconButton from '~/app/components/global/IconButton/IconButton'
import {
  CheckIcon,
  CrossFailIcon,
  FigmaIcon,
  FullScreenIcon,
  StorybookIcon,
} from '~/app/components/global/Icons'
import Modal from '~/app/components/global/Modal/Modal'
import Select, { SelectOption } from '~/app/components/global/Select/Select'
import ImageCarousel from '~/app/components/pages/ResultPage/ImageCarousel/ImageCarousel'
import { useAppContext } from '~/app/contexts/App.context'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import { drawImage } from '~/app/lib/utils/canvas'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { ReportResult, STATUS } from '~/app/models/Report'

/**
 *
 * @TODO need to add transition when isOpen toggling
 * animation will be considered later on...
 */
const THRESHHOLD = 50

function ResultStatus({ status }: { status: STATUS }) {
  return (
    <div className="flex justify-center items-center flex-1">
      {status === STATUS.SUCCESS && <CheckIcon className="w-7 h-7" />}
      {status === STATUS.FAIL && <CrossFailIcon className="w-7 h-7" />}
    </div>
  )
}

function ResultContainer() {
  const navigate = useNavigate()
  const { report } = useAppContext()
  const [selectedImage, setSelectedImage] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  if (!report || report.status !== STATUS.SUCCESS) {
    return null
  }

  const { originalImageUrl, result } = report

  const {
    url_blue_difference,
    url_gray_difference,
    url_screenshot,
    width,
    height,
    MAE,
  } = result as ReportResult

  const realMAE = MAE.split(' ')[0]
  const isSuccess = +realMAE < THRESHHOLD
  const imageSelectionOptions: Array<SelectOption> = [
    { value: url_screenshot, name: 'Storycap captured' },
    { value: url_gray_difference, name: 'Gray-scale Difference' },
    { value: url_blue_difference, name: 'Blue-scale Difference' },
  ]

  const handleClickBack = () => {
    navigate(-1)
  }

  const handleCreateNew = () => {
    navigate(ROUTES_MAP[ROUTES.HOME])
  }

  const handleSelectChange = (value: string) => {
    setSelectedImage(value)
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const drawCallback =
    (imageUrl?: string) =>
    async (canvas: HTMLCanvasElement, context: RenderingContext) => {
      if (!imageUrl) {
        return
      }

      await drawImage(canvas, context as CanvasRenderingContext2D, imageUrl)
    }

  useEffect(() => {
    setSelectedImage(imageSelectionOptions[0].value)
  }, [])

  const isStorybook = selectedImage === imageSelectionOptions[0].value

  const renderModal = () => {
    return (
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        isFullScreen
        backButton={
          <IconButton
            icon={<ChevronLeftIcon className="w-4 h-4" />}
            onClick={handleCloseModal}
            className="absolute top-24 left-10 text-text-secondary"
          >
            {ui('header.back')}
          </IconButton>
        }
      >
        <ImageCarousel options={imageSelectionOptions} />
      </Modal>
    )
  }

  const renderContent = () => {
    return (
      <>
        <div className="flex justify-between mb-16 relative">
          <IconButton
            icon={<ChevronLeftIcon className="w-4 h-4" />}
            onClick={handleClickBack}
            className="text-text-secondary z-20"
          >
            {ui('header.back')}
          </IconButton>
          <div className="absolute flex justify-center top-0 left-0 right-0 z-10">
            <h1 className="text-2xl text-primary-white w-6/12 text-center font-bold">
              {ui('result.wellDone')} <br />
              {ui('result.theyare')}
              {isSuccess ? (
                <span className="bg-primary-green mix-blend-screen text-black">
                  {ui('result.equal')}
                </span>
              ) : (
                <span className="bg-secondary-error mix-blend-screen text-black">
                  {ui('result.notEqual')}
                </span>
              )}
            </h1>
          </div>
        </div>
        <div className="flex mb-12">
          <div className="flex justify-start w-5/12 h-[220px]">
            <Canvas
              id="orignal-image"
              className="mb-2 border border-wf-tertiery"
              draw={drawCallback(originalImageUrl + '')}
              options={{ contextId: '2d' }}
              label={`${width} ✕ ${height}`}
              icon={<FigmaIcon width={32} height={32} />}
              width="100%"
              height="100%"
            />
          </div>
          <ResultStatus status={isSuccess ? STATUS.SUCCESS : STATUS.FAIL} />
          <div className="flex flex-col items-end w-5/12 h-[220px]">
            <div className="h-full w-full relative">
              <Canvas
                id="result-images"
                className="mb-2 border border-wf-tertiery"
                draw={drawCallback(selectedImage)}
                options={{ contextId: '2d' }}
                icon={
                  isStorybook ? (
                    <StorybookIcon width={32} height={32} />
                  ) : undefined
                }
                width="100%"
                height="100%"
              />
              <Select
                options={imageSelectionOptions}
                onChange={handleSelectChange}
                value={selectedImage}
                placeholder="Result Images"
                className="flex justify-center pl-2"
                buttonClassName="text-text-secondary"
              />
              <button
                aria-label="Full-screen"
                onClick={handleOpenModal}
                className="absolute right-3 bottom-3"
              >
                <FullScreenIcon width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
        <p className="text-sm text-primary-white/80 mb-10 text-center">
          {isSuccess
            ? ui('result.description.success')
            : ui('result.description.fail')}
        </p>
        <div className="flex justify-center">
          <Button onClick={handleCreateNew} className="w-5/12 capitalize">
            {ui('result.createNew')}
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="px-16 pt-10">
        {!isOpen && renderContent()}
        {renderModal()}
      </div>
    </>
  )
}

export default ResultContainer
