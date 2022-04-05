import { boolean } from '@storybook/addon-knobs'
import { useState } from 'react'

import Checkbox from './Checkbox'

export default {
  component: Checkbox,
  title: 'Global/Components/Checkbox',
}

export function CheckboxWithKnobs() {
  const [value, setValue] = useState<boolean>()
  const handleChange = (value: boolean) => {
    setValue(value)
  }

  return (
    <div>
      <Checkbox
        checked={value}
        onChange={handleChange}
        isDisabled={boolean('Disabled?', false)}
      />
    </div>
  )
}
