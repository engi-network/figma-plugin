import { useEffect, useState } from 'react'

import Input from '~/app/components/global/Input/Input'
import TextWithLabel from '~/app/components/global/TextWithLabel/TextWithLabel'
import { ui } from '~/app/lib/utils/ui-dictionary'

export enum FORM_FIELD {
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
  errors?: AnalyzeFormValues
  onChange: (values: AnalyzeFormValues) => void
  values?: AnalyzeFormValues
}

function Code({ values: parentValues, onChange, errors }: Props) {
  const [values, setValues] = useState<AnalyzeFormValues>(intialFormValue)
  const [showMore, setShowMore] = useState<boolean>(false)

  const handleInputChange = (field: FORM_FIELD) => (value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }))

    onChange({ ...values, [field]: value })
  }

  const handleClickSeeMore = () => {
    setShowMore(true)
  }

  useEffect(() => {
    if (!parentValues) {
      return
    }

    setValues(parentValues)
  }, [parentValues])

  return (
    <div className="flex flex-col h-full w-[304px]">
      <h2 className="text-2xl text-black mb-5 font-bold text-center">
        {ui('main.preview.code')}
      </h2>
      <div className="p-10 border-y border-r border-wf-tertiery">
        <div className="flex mb-5">
          <div className="w-6/12 flex flex-col">
            <TextWithLabel
              label="Component"
              id="component"
              text={values[FORM_FIELD.COMPONENT]}
              placeholder="Component"
            />
          </div>
          <div className="w-6/12 ml-7 flex flex-col">
            <TextWithLabel
              label="Story"
              id="story"
              text={values[FORM_FIELD.STORY]}
              placeholder="Story"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Input
            id="repository"
            label="Repository"
            placeholder="Git repository name"
            value={values[FORM_FIELD.REPOSITORY]}
            onChange={handleInputChange(FORM_FIELD.REPOSITORY)}
            error={errors && errors[FORM_FIELD.REPOSITORY]}
          />
          {showMore && (
            <span role="link" onClick={handleClickSeeMore}>
              See more options
            </span>
          )}
          <Input
            id="branch"
            label="Branch name"
            placeholder="feature/new-button"
            containerClass="mt-5"
            value={values[FORM_FIELD.REPOSITORY]}
            onChange={handleInputChange(FORM_FIELD.REPOSITORY)}
            error={errors && errors[FORM_FIELD.REPOSITORY]}
          />
          <Input
            id="commit"
            label="Commit hash"
            placeholder="7e2c7d4"
            containerClass="mt-5"
            value={values[FORM_FIELD.REPOSITORY]}
            onChange={handleInputChange(FORM_FIELD.REPOSITORY)}
            error={errors && errors[FORM_FIELD.REPOSITORY]}
          />
        </div>
      </div>
    </div>
  )
}

export default Code
