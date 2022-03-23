import { PublishCommand } from '@aws-sdk/client-sns'
import { PlusIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import HistoryIcon from '~/app/assets/icons/common/history.svg'
import Button from '~/app/components/global/Button/Button'
import IconButton from '~/app/components/global/IconButton/IconButton'
import Code, { AnalyzeFormValues } from '~/app/components/modules/Code/Code'
import Preview from '~/app/components/modules/Preview/Preview'
import usePreviewData from '~/app/components/modules/Preview/Preview.hooks'
import snsClient from '~/app/lib/snsClient'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { Message } from '~/app/models/Message'

import styles from './Main.styles'

function Main() {
  const navigate = useNavigate()
  const [values, setValues] = useState<AnalyzeFormValues>()
  const [_, setIsLoading] = useState<boolean>(false)
  const { selectionData, draw } = usePreviewData()
  const { width = 0, height = 0 } = selectionData || {}

  const handleChange = (values: AnalyzeFormValues) => {
    setValues(values)
  }

  /**
   * @TODO form value validation
   */
  const handleSubmit = async () => {
    console.info('submitting=====>', values)
    if (!values) {
      return
    }

    setIsLoading(true)
    const { component, repository, story } = values
    const checkId = Date.now()
    const message: Message = {
      check_id: checkId,
      component,
      height: height + '',
      repository,
      story,
      width: width + '',
    }

    const params = {
      Message: JSON.stringify(message),
      TopicArn: 'arn:aws:sns:us-west-2:163803973373:same-story-check-topic',
    }

    const run = async () => {
      try {
        const data = await snsClient.send(new PublishCommand(params))
        console.info('Success from sns', data)
        return data
      } catch (err) {
        console.error('Error====>', err)
      }
    }

    await run()
    setIsLoading(false)

    navigate('/result')
  }

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
          <Preview draw={draw} label={`${width} ✕ ${height}`} />
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
