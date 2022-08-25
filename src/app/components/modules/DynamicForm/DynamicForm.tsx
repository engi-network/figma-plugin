import { MinusCircleIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import { useState } from 'react'

import IconButton from '~/app/components/global/IconButton/IconButton'
import Input from '~/app/components/global/Input/Input'
import LinkButton from '~/app/components/global/LinkButton/LinkButton'

interface Props {
  className?: string
  handleSubmit?: () => void
  onChange: (values: DFormValues) => void
  title?: string
}

export interface DFormValue {
  name: string
  value: string
}

export type DFormValues = Array<DFormValue>

const initialFormValues = [{ name: '', value: '' }]

function DynamicForm({ onChange, title, className }: Props) {
  const [formFields, setFormFields] = useState<DFormValues>(initialFormValues)

  const handleFormChange = (
    index: number,
    key: 'name' | 'value',
    value: string,
  ) => {
    const data = [...formFields]
    data[index][key] = value
    setFormFields(data)
    onChange(data)
  }

  const addFields = () => {
    setFormFields([
      ...formFields,
      {
        name: '',
        value: '',
      },
    ])
  }

  const removeFields = (index: number) => {
    const data = [...formFields]
    data.splice(index, 1)
    setFormFields(data)
  }

  const rootClasses = cn(className, 'flex flex-col')

  return (
    <div className={rootClasses}>
      {title && (
        <h5 className="text-sm text-text-primary font-medium mb-2">{title}</h5>
      )}
      <div>
        {formFields.map(({ name, value }, index) => {
          return (
            <div className="flex mb-5 gap-1" key={index}>
              <div className="w-6/12 flex flex-col">
                <Input
                  id={`name-${index}`}
                  label={`Name ${index + 1}`}
                  placeholder="Enter a name."
                  value={name}
                  onChange={(value) => handleFormChange(index, 'name', value)}
                />
              </div>
              <div className="w-6/12 flex flex-col">
                <Input
                  id={`value-${index}`}
                  label={`Value ${index + 1}`}
                  placeholder="Enter a value."
                  value={value}
                  onChange={(value) => handleFormChange(index, 'value', value)}
                />
              </div>
              <IconButton
                className="text-text-secondary mt-8"
                icon={
                  <MinusCircleIcon className="text-text-secondary w-5 h-5" />
                }
                onClick={() => removeFields(index)}
              />
            </div>
          )
        })}
      </div>
      <LinkButton onClick={addFields} className="justify-end mt-2">
        Add More...
      </LinkButton>
    </div>
  )
}

export default DynamicForm
