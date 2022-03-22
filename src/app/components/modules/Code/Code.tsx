import { useState } from 'react'

import Input from '~/app/components/global/Input/Input'

enum FORM_FIELD {
  COMPONENT = 'component',
  REPOSITORY = 'repository',
  STORY = 'story',
}

export interface AnalyzeFormValues {
  [FORM_FIELD.COMPONENT]: string
  [FORM_FIELD.REPOSITORY]: string
  [FORM_FIELD.STORY]: string
}

const intialFormValue = {
  [FORM_FIELD.COMPONENT]: '',
  [FORM_FIELD.REPOSITORY]: '',
  [FORM_FIELD.STORY]: '',
}

interface Props {
  onChange: (values: AnalyzeFormValues) => void
  values?: AnalyzeFormValues
}

function Code({ values: intialValues, onChange }: Props) {
  console.info('values from parent', intialValues)
  const [values, setValues] = useState<AnalyzeFormValues>(intialFormValue)

  const handleInputChange = (field: FORM_FIELD) => (value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }))

    onChange({ ...values, [field]: value })
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg text-wf-secondary mb-5">Code</h2>
      <div className="flex mb-10">
        <div className="w-6/12">
          <Input
            id="component"
            label="Component"
            placeholder="Button"
            value={values[FORM_FIELD.COMPONENT]}
            onChange={handleInputChange(FORM_FIELD.COMPONENT)}
          />
        </div>
        <div className="w-6/12 ml-10">
          <Input
            id="story"
            label="Story"
            placeholder="Unwindowed"
            value={values[FORM_FIELD.STORY]}
            onChange={handleInputChange(FORM_FIELD.STORY)}
          />
        </div>
      </div>
      <div className="flex">
        <Input
          id="repository"
          label="Repository"
          placeholder="engi-network/engi-ui"
          value={values[FORM_FIELD.REPOSITORY]}
          onChange={handleInputChange(FORM_FIELD.REPOSITORY)}
        />
      </div>
    </div>
  )
}

export default Code
