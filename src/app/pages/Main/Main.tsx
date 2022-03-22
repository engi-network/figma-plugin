import { ReplyIcon, XIcon } from '@heroicons/react/solid'
import { useState } from 'react'

import IconButton from '~/app/components/global/IconButton/IconButton'
import Code, { AnalyzeFormValues } from '~/app/components/modules/Code/Code'
import Preview from '~/app/components/modules/Preview/Preview'
import { ui } from '~/app/lib/utils/ui-dictionary'

import styles from './Main.styles'

function Main() {
  const [values, setValues] = useState<AnalyzeFormValues>()
  const handleChange = (values: AnalyzeFormValues) => {
    setValues(values)
  }

  return (
    <>
      <div className="flex justify-between mb-10">
        <h1 css={styles.title}>{ui('main.title')}</h1>
        <div className="flex justify-center items-center">
          <IconButton
            renderIcon={() => <XIcon className="w-5 h-5" />}
            className="bg-wf-light rounded-full w-8 h-8 mr-5"
          />
          <IconButton
            renderIcon={() => <ReplyIcon className="w-5 h-5" />}
            className="bg-wf-light rounded-full w-8 h-8"
          />
        </div>
      </div>
      <div className="flex flex-1">
        <section className="w-6/12 border-solid border-r border-wf-tertiery">
          <Preview />
        </section>
        <section className="w-6/12 pl-10">
          <Code onChange={handleChange} values={values} />
        </section>
      </div>
      <div className="flex">footer</div>
    </>
  )
}

export default Main
