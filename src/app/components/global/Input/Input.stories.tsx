import { boolean, text } from '@storybook/addon-knobs'
import { useState } from 'react'

import Input from './Input'

export default {
  component: Input,
  title: 'Global/Components/Input',
}

export function InputWithKnobs() {
  const [value, setValue] = useState('')
  const handleChangeValue = (value: string) => {
    setValue(value)
  }
  const isDisabled = boolean('Disabled?', false)

  return (
    <div className="bg-primary-white">
      <Input
        label="Component"
        onChange={handleChangeValue}
        value={value}
        placeholder={text('Placehoder', 'placehoder')}
        error={text('Error', 'This field has an error!')}
        disabled={isDisabled}
      />
    </div>
  )
}
