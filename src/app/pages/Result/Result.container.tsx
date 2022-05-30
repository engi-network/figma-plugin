import { ArrowLeftIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import Button from '~/app/components/global/Button/Button'
import Canvas from '~/app/components/global/Canvas/CanvasContainer'
import Header from '~/app/components/global/Header/Header'
import IconButton from '~/app/components/global/IconButton/IconButton'
import { FigmaIcon, StorybookIcon } from '~/app/components/global/Icons'
import Select, { SelectOption } from '~/app/components/global/Select/Select'
import { useAppContext } from '~/app/contexts/App.context'
import { BUTTON_STYLE, ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import { drawImage } from '~/app/lib/utils/canvas'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { ReportResult, STATUS } from '~/app/models/Report'

function ResultContainer() {
  const navigate = useNavigate()
  const { report } = useAppContext()
  const [selectedImage, setSelectedImage] = useState('')

  if (!report || report.status !== STATUS.SUCCESS) {
    navigate(ROUTES_MAP[ROUTES.HOME])
    return null
  }

  const { originalImageUrl, result } = report

  const {
    url_blue_difference,
    url_gray_difference,
    url_screenshot,
    width,
    height,
  } = result as ReportResult

  const imageSelectionOptions: Array<SelectOption> = [
    { value: url_screenshot, name: 'Storycap captured' },
    { value: url_gray_difference, name: 'Gray-scale Difference' },
    { value: url_blue_difference, name: 'Blue-scale Difference' },
  ]

  console.info('report in result======> ', report)

  const handleClickBack = () => {
    navigate(ROUTES_MAP[ROUTES.HOME])
  }

  const handleCreateNew = () => {
    navigate(ROUTES_MAP[ROUTES.HOME])
  }

  const handleSelectChange = (value: string) => {
    setSelectedImage(value)
  }

  const drawCallback =
    (imageUrl?: string) =>
    (canvas: HTMLCanvasElement, context: RenderingContext) => {
      !!imageUrl &&
        drawImage(canvas, context as CanvasRenderingContext2D, imageUrl)
    }

  useEffect(() => {
    setSelectedImage(imageSelectionOptions[0].value)
  }, [])

  const isStorybook = selectedImage === imageSelectionOptions[0].value

  return (
    <>
      <Header />
      <div className="px-10 pt-10">
        <div className="flex justify-between mb-16 relative">
          <IconButton
            icon={<ArrowLeftIcon className="w-4 h-4 text-primary-white z-20" />}
            buttonStyle={BUTTON_STYLE.OUTLINED}
            onClick={handleClickBack}
          />
          <div className="absolute flex justify-center top-0 left-0 right-0 z-10">
            <h1 className="text-2xl text-primary-white w-6/12 text-center font-bold">
              {ui('result.wellDone')} <br />
              {ui('result.its')}
              <span className="bg-primary-green mix-blend-screen text-[#000]">
                {ui('result.same')}
              </span>
            </h1>
          </div>
        </div>
        <div className="flex mb-8">
          <div className="w-6/12 flex justify-start">
            <Canvas
              id="orignal-image"
              className="mb-4 border border-wf-tertiery"
              width={210}
              height={210}
              draw={drawCallback(originalImageUrl + '')}
              options={{ contextId: '2d' }}
              label={`${width} ✕ ${height}`}
              icon={<FigmaIcon width={32} height={32} />}
            />
          </div>
          <div></div>
          <div className="w-6/12 flex flex-col items-end">
            <div>
              <Canvas
                id="blue-scale"
                className="mb-4 border border-wf-tertiery"
                width={210}
                height={210}
                draw={drawCallback(url_screenshot + '')}
                options={{ contextId: '2d' }}
                icon={
                  isStorybook ? (
                    <StorybookIcon width={32} height={32} />
                  ) : undefined
                }
              />
              <Select
                options={imageSelectionOptions}
                onChange={handleSelectChange}
                value={selectedImage}
                placeholder="Result Images"
                className="flex justify-center"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button onClick={handleCreateNew} className="w-5/12 capitalize">
            {ui('result.createNew')}
          </Button>
        </div>
      </div>
    </>
  )
}

export default ResultContainer
