import { InformationCircleIcon } from '@heroicons/react/outline'
import { useCallback, useEffect, useRef, useState } from 'react'
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
import { LOCAL_STORAGE_KEY, SAME_STORY_FORM_UPDATE } from '~/plugin/constants'

import styles from './Main.container.styles'

function Main() {
  const navigate = useNavigate()
  const { selectionData, draw } = useSelectionData()
  const [values, setValues] = useState<AnalyzeFormValues>()
  const [_, setIsLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<AnalyzeFormValues>()
  const originCanvasRef = useRef<HTMLCanvasElement>(null)

  const { width = 0, height = 0, commit, branch } = selectionData || {}

  const handleChange = async (values: AnalyzeFormValues) => {
    setValues(values)
    setErrors(undefined)

    if (values) {
      parent.postMessage(
        {
          pluginMessage: {
            type: SAME_STORY_FORM_UPDATE,
            data: {
              [LOCAL_STORAGE_KEY.REPOSITORY]: values.repository,
            },
          },
        },
        '*',
      )
    }
  }

  /**
   * @TODO form value validation
   */
  const handleSubmit = useCallback(async () => {
    if (!values || !values.repository) {
      setErrors({
        repository: 'This field is required!',
        story: '',
        component: '',
      })
      return
    }

    if (!originCanvasRef || !originCanvasRef.current || !selectionData) {
      return
    }

    setIsLoading(true)

    const { component, repository, story } = values
    const checkId: string = uuidv4()
    const message: Message = {
      branch,
      check_id: checkId,
      commit,
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

  useEffect(() => {
    if (!selectionData) {
      return
    }

    const { name = '', repository = '' } = selectionData
    const [component, story = ''] = name.split('-')

    setValues({
      story,
      component,
      repository,
    })
  }, [selectionData])

  return (
    <>
      <div className="flex justify-between border-y border-text-secondary px-7 py-5">
        <h1 className="font-base text-black font-medium">{ui('main.title')}</h1>
        <div className="flex justify-center items-center">
          <IconButton
            className="text-wf-secondary"
            icon={
              <img
                src={HistoryIcon}
                width={24}
                height={24}
                css={styles.historyIcon}
              />
            }
          >
            {ui('main.history')}
          </IconButton>
        </div>
      </div>
      <div className="flex mb-10 p-10">
        <section className="w-1/2 flex justify-end">
          <Preview
            draw={draw}
            label={`${width} ✕ ${height}`}
            originalCanvasRef={originCanvasRef}
          />
        </section>
        <section className="w-1/2">
          <Code onChange={handleChange} values={values} errors={errors} />
        </section>
      </div>
      <footer className="flex justify-between px-6">
        <a href="#" className="flex items-center">
          <span className="mr-6 text-sm text-[#B3B3B3] flex">
            <InformationCircleIcon className="w-5 h-5 text-[#B3B3B3] mr-3" />
            {ui('header.learnMore')}
          </span>
        </a>
        <Button
          primary
          onClick={handleSubmit}
          className="w-3/12"
          backgroundColor="#18A0FB"
        >
          {ui('main.analyze')}
        </Button>
      </footer>
    </>
  )
}

export default Main
