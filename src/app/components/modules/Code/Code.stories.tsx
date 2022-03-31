import { useState } from 'react'

import Code, { AnalyzeFormValues } from './Code'

export default {
  component: Code,
  title: 'Global/Modules/Code',
}

export function CodeWithKnobs() {
  const [values, setValues] = useState<AnalyzeFormValues>()
  const [errors, setErrors] = useState()

  const handleChange = (values: AnalyzeFormValues) => {
    setValues(values)
    setErrors(undefined)
  }

  return (
    <div className="bg-primary-white">
      <Code values={values} errors={errors} onChange={handleChange} />
    </div>
  )
}
