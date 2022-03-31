import { text } from '@storybook/addon-knobs'
import { useState } from 'react'

import Input from './Input'

export default {
  component: Input,
  title: 'Global/Input',
}

export function InputWithKnobs() {
  const [value, setValue] = useState('')
  const handleChangeValue = (value: string) => {
    setValue(value)
  }

  return (
    <div className="bg-primary-white">
      <Input
        label="Component"
        onChange={handleChangeValue}
        value={value}
        placeholder={text('Placehoder', 'placehoder')}
        error={text('Error', 'This field has an error!')}
      />
    </div>
  )
}
