import { useEffect, useState } from 'react'

import Input from '~/app/components/global/Input/Input'
import TextWithLabel from '~/app/components/global/TextWithLabel/TextWithLabel'
import { ui } from '~/app/lib/utils/ui-dictionary'

enum FORM_FIELD {
  COMPONENT = 'component',
  REPOSITORY = 'repository',
  STORY = 'story',
}

export interface AnalyzeFormValues {
  [FORM_FIELD.STORY]: string
  [FORM_FIELD.COMPONENT]: string
  [FORM_FIELD.REPOSITORY]: string
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

function Code({ values: parentValues, onChange }: Props) {
  const [values, setValues] = useState<AnalyzeFormValues>(intialFormValue)

  const handleInputChange = (field: FORM_FIELD) => (value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }))

    onChange({ ...values, [field]: value })
  }

  useEffect(() => {
    if (!parentValues) {
      return
    }

    setValues(parentValues)
  }, [parentValues])

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl text-black mb-5 font-bold text-center">
        {ui('main.preview.code')}
      </h2>
      <div className="p-10 border border-wf-tertiery">
        <div className="flex mb-5">
          <div className="w-6/12 flex flex-col">
            <TextWithLabel
              label="Component"
              id="component"
              text={values[FORM_FIELD.COMPONENT]}
              placeholder="Placehoder1"
            />
          </div>
          <div className="w-6/12 ml-7 flex flex-col">
            <TextWithLabel
              label="Story"
              id="story"
              text={values[FORM_FIELD.STORY]}
              placeholder="Placehoder2"
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
    </div>
  )
}

export default Code
