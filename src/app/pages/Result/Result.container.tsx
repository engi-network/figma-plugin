import { ChevronLeftIcon, InformationCircleIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

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
import LinkButton from '~/app/components/global/LinkButton/LinkButton'
import Modal from '~/app/components/global/Modal/Modal'
import Select, { SelectOption } from '~/app/components/global/Select/Select'
import Tooltip from '~/app/components/global/Tooltip/Tooltip'
import DetailModal from '~/app/components/pages/ResultPage/DetailModal/DetailModal'
import ImageCarousel from '~/app/components/pages/ResultPage/ImageCarousel/ImageCarousel'
import { useAppContext } from '~/app/contexts/App.context'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import { drawImage } from '~/app/lib/utils/canvas'
import { isSameStory } from '~/app/lib/utils/mae'
import { convertUnixToDate } from '~/app/lib/utils/time'
import { ui } from '~/app/lib/utils/ui-dictionary'
import {
  DetailedReport,
  REPORT_STATUS,
  ReportResult,
} from '~/app/models/Report'

function ResultStatus({ status }: { status: REPORT_STATUS }) {
  return (
    <div className="flex justify-center items-center flex-1">
      {status === REPORT_STATUS.SUCCESS ? (
        <CheckIcon className="w-7 h-7" />
      ) : (
        <CrossFailIcon className="w-7 h-7" />
      )}
    </div>
  )
}

function ResultContainer() {
  const navigate = useNavigate()
  const { history } = useAppContext()
  const [searchParams] = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')

  const checkId = searchParams.get('checkId') as string
  const report = history.find(
    (item) => item.checkId === checkId,
  ) as DetailedReport

  const { originalImageUrl, result } = report

  const {
    url_blue_difference,
    url_gray_difference,
    url_screenshot,
    width,
    height,
    MAE,
    name,
    created_at,
  } = result as ReportResult

  const isSuccess = isSameStory(MAE)
  const imageSelectionOptions: Array<SelectOption> = [
    { value: url_screenshot, name: 'Storycap captured' },
    { value: url_gray_difference, name: 'Gray-scale Difference' },
    { value: url_blue_difference, name: 'Blue-scale Difference' },
  ]

  useEffect(() => {
    setSelectedImage(imageSelectionOptions[0].value)
  }, [])

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

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false)
  }

  const handleOpenDetailModal = () => {
    setIsDetailModalOpen(true)
  }

  const drawCallback =
    (imageUrl?: string) =>
    async (canvas: HTMLCanvasElement, context: RenderingContext) => {
      if (!imageUrl) {
        return
      }

      await drawImage(canvas, context as CanvasRenderingContext2D, imageUrl)
    }

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
        <div className="mb-3 flex justify-between">
          <div className="flex justify-start">
            <IconButton
              icon={<ChevronLeftIcon className="w-4 h-4" />}
              onClick={handleClickBack}
              className="text-text-secondary z-20"
            >
              {ui('header.back')}
            </IconButton>
          </div>
          <div className="flex">
            <div className="flex flex-col justify-end">
              <p className="text-text-secondary text-right text-sm">
                {ui('result.updatedOn', {
                  date: convertUnixToDate(created_at, 'LLLL d'),
                })}
              </p>
              <LinkButton
                onClick={handleOpenDetailModal}
                className="justify-end text-sm"
              >
                {ui('result.seeDetails')}
              </LinkButton>
            </div>
          </div>
        </div>
        <h1 className="text-2xl text-primary-white w-6/12 text-center font-bold m-auto mb-5">
          {isSuccess ? ui('result.wellDone') : ui('result.sorry')} <br />
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
        <div className="flex mb-12">
          <div className="flex justify-start w-5/12 h-[220px]">
            <Canvas
              id="original-image"
              className="mb-2 border border-wf-tertiary"
              draw={drawCallback(originalImageUrl + '')}
              options={{ contextId: '2d' }}
              label={
                <>
                  <span className="block truncate mr-1">{name}</span>
                  <Tooltip
                    content={
                      <div className="flex justify-center items-center">
                        <span className="mr-24">{ui('result.dimensions')}</span>
                        <span className="whitespace-nowrap">{`${width} ✕ ${height}`}</span>
                      </div>
                    }
                    tooltipOffset={12}
                    placement="bottom"
                    customPopperStyles={{ padding: '22px 30px' }}
                  >
                    <InformationCircleIcon className="w-4 h-4 text-white/30 cursor-pointer" />
                  </Tooltip>
                </>
              }
              icon={<FigmaIcon width={12} height={17} />}
              width="100%"
              height="100%"
            />
          </div>
          <ResultStatus
            status={isSuccess ? REPORT_STATUS.SUCCESS : REPORT_STATUS.FAIL}
          />
          <div className="flex flex-col items-end w-5/12 h-[220px]">
            <div className="h-full w-full relative">
              <Canvas
                id="result-images"
                className="mb-2 border border-wf-tertiary"
                draw={drawCallback(selectedImage)}
                options={{ contextId: '2d' }}
                icon={
                  isStorybook ? (
                    <StorybookIcon width={12} height={17} />
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
        <p className="text-sm text-primary-white/80 mb-6 text-center">
          {isSuccess
            ? ui('result.description.success')
            : ui('result.description.fail')}
        </p>
        <div className="flex justify-center">
          <Button onClick={handleCreateNew} className="w-5/12 capitalize">
            {ui('result.createNew')}
          </Button>
        </div>
        {!isSuccess && (
          <div className="flex justify-center mt-5">
            <Button
              as="a"
              backgroundColor="#00000036"
              className="w-5/12 capitalize border border-solid border-primary-white text-center"
              primary
              href="https://engi.network/jobs/create"
              target="_blank"
            >
              {ui('result.createAJob')}
            </Button>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="px-12 pt-5 pb-10">
        {!isOpen && renderContent()}
        {renderModal()}
      </div>
      <DetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        title="Details"
        data={report}
      />
    </>
  )
}

export default ResultContainer
