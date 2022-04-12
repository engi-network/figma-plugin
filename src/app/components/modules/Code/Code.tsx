import { useEffect, useState } from 'react'

import { StorybookIcon } from '~/app/components/global/Icons'
import Input from '~/app/components/global/Input/Input'
import ContainerWithTitle from '~/app/components/global/Layout/ContainerWithTitle/ContainerWithTitle'
import TextWithLabel from '~/app/components/global/TextWithLabel/TextWithLabel'
import { ui } from '~/app/lib/utils/ui-dictionary'

import { AnalyzeFormValues, FORM_FIELD, initialFormValue } from './Code.data'

interface Props {
  errors?: AnalyzeFormValues
  onChange: (values: AnalyzeFormValues) => void
  values?: AnalyzeFormValues
}

function Code({ values: parentValues, onChange, errors }: Props) {
  const [values, setValues] = useState<AnalyzeFormValues>(initialFormValue)
  const [showMore, setShowMore] = useState<boolean>(true)

  const handleInputChange = (field: FORM_FIELD) => (value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }))

    onChange({ ...values, [field]: value })
  }

  const handleClickSeeMore = () => {
    setShowMore(false)
  }

  useEffect(() => {
    if (!parentValues) {
      return
    }

    setValues(parentValues)
  }, [parentValues])

  return (
    <ContainerWithTitle width={304} title={ui('main.preview.code')}>
      <div className="border-y border-r border-wf-tertiery flex-1 relative">
        <StorybookIcon
          className="absolute right-1 top-[-1]"
          width={41}
          height={41}
        />
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
          {showMore ? (
            <span
              role="button"
              className="text-sm text-primary-blue flex justify-end cursor-pointer mt-4"
              onClick={handleClickSeeMore}
            >
              {ui('main.preview.seeMore')}
            </span>
          ) : (
            <>
              <Input
                id="branch"
                label="Branch name"
                placeholder="feature/new-button"
                containerClass="mt-5"
                value={values[FORM_FIELD.BRANCH]}
                onChange={handleInputChange(FORM_FIELD.BRANCH)}
                error={errors && errors[FORM_FIELD.BRANCH]}
              />
              <Input
                id="commit"
                label="Commit hash"
                placeholder="7e2c7d4"
                containerClass="mt-5"
                value={values[FORM_FIELD.COMMIT]}
                onChange={handleInputChange(FORM_FIELD.COMMIT)}
                error={errors && errors[FORM_FIELD.COMMIT]}
              />
            </>
          )}
        </div>
      </div>
    </ContainerWithTitle>
  )
}

export default Code
