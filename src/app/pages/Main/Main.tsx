import { PlusIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import HistoryIcon from '~/app/assets/icons/common/history.svg'
import Button from '~/app/components/global/Button/Button'
import IconButton from '~/app/components/global/IconButton/IconButton'
import Code, { AnalyzeFormValues } from '~/app/components/modules/Code/Code'
import Preview from '~/app/components/modules/Preview/Preview'
import { ui } from '~/app/lib/utils/ui-dictionary'

import styles from './Main.styles'

function Main() {
  const navigate = useNavigate()
  const [values, setValues] = useState<AnalyzeFormValues>()
  const handleChange = (values: AnalyzeFormValues) => {
    setValues(values)
  }

  const handleSubmit = () => {
    console.info('submitting=====>', values)
    navigate('/result')
  }

  useEffect(() => {
    fetch('/api/reminders')
      .then((response) => response.json())
      .then((json) => console.info('===>', json))
  }, [])

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
          <Preview />
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
