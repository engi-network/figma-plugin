import { PlusIcon } from '@heroicons/react/solid'
import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import HistoryIcon from '~/app/assets/icons/common/history.svg'
import Button from '~/app/components/global/Button/Button'
import IconButton from '~/app/components/global/IconButton/IconButton'
import Code, { AnalyzeFormValues } from '~/app/components/modules/Code/Code'
import Preview from '~/app/components/modules/Preview/Preview'
import useSelectionData from '~/app/hooks/useSelectionData'
import {
  pollCheckReport,
  startEcsCheck,
  uploadCheckSpecificationToS3,
  uploadEncodedFrameToS3,
} from '~/app/lib/utils/aws'
import { decodeOriginal, encode } from '~/app/lib/utils/canvas'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { Message } from '~/app/models/Message'

import styles from './Main.container.styles'

function Main() {
  const navigate = useNavigate()
  const [values, setValues] = useState<AnalyzeFormValues>()
  const [_, setIsLoading] = useState<boolean>(false)
  const { selectionData, draw } = useSelectionData()
  const originCanvasRef = useRef<HTMLCanvasElement>(null)

  const { width = 0, height = 0 } = selectionData || {}

  const handleChange = (values: AnalyzeFormValues) => {
    setValues(values)
  }

  /**
   * @TODO form value validation
   */
  const handleSubmit = useCallback(async () => {
    if (
      !values ||
      !originCanvasRef ||
      !originCanvasRef.current ||
      !selectionData
    ) {
      return
    }

    setIsLoading(true)

    const { component, repository, story } = values
    const checkId: string = uuidv4()
    const message: Message = {
      check_id: checkId,
      component,
      height: height + '',
      repository,
      story,
      width: width + '',
    }

    const name = component + '-' + story
    const context = originCanvasRef.current.getContext(
      '2d',
    ) as CanvasRenderingContext2D

    const imageData = await decodeOriginal(
      originCanvasRef.current,
      context,
      selectionData.frame,
    )
    const frame = await encode(originCanvasRef.current, context, imageData)

    console.info('selecteddata======>', selectionData.frame, frame)
    try {
      await uploadEncodedFrameToS3(name, checkId, frame)
      console.info('uploading to S3 success')
      await uploadCheckSpecificationToS3(message)
      await startEcsCheck(message)
      await pollCheckReport(checkId)

      setIsLoading(false)
      navigate('/result')
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }, [values, selectionData])

  return (
    <>
      <div className="flex justify-between mb-10">
        <h1 css={styles.title}>{ui('main.title')}</h1>
        <div className="flex justify-center items-center">
          <IconButton
            icon={<PlusIcon className="w-4 h-4" />}
            className="mr-5"
          />
          <IconButton icon={<img src={HistoryIcon} width={24} height={24} />} />
        </div>
      </div>
      <div className="flex mb-10">
        <section className="w-6/12 border-solid border-r border-wf-tertiery">
          <Preview
            draw={draw}
            label={`${width} ✕ ${height}`}
            originalCanvasRef={originCanvasRef}
          />
        </section>
        <section className="w-6/12 pl-10">
          <Code onChange={handleChange} values={values} />
        </section>
      </div>
      <div className="flex justify-center mb-7">
        <Button primary onClick={handleSubmit} className="w-5/12">
          {ui('main.analyze')}
        </Button>
      </div>
      <footer className="flex justify-center">
        <a href="#" className="flex items-center">
          <span className="mr-6 text-sm text-wf-secondary">
            {ui('header.learnMore')}
            <span className="text-wf-primary">{ui('header.companyName')}</span>
          </span>
        </a>
      </footer>
    </>
  )
}

export default Main
