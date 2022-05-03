import { boolean, text } from '@storybook/addon-knobs'
import { useState } from 'react'

import Checkbox from './Checkbox'

export default {
  component: Checkbox,
  title: 'Global/Components/Checkbox',
}

export function CheckboxWithKnobs() {
  const [value, setValue] = useState<boolean>(false)
  const handleChange = (value?: boolean | string) => {
    setValue(!!value)
  }

  return (
    <div className="bg-slate-700 h-screen">
      <Checkbox
        checked={value}
        onChange={handleChange}
        isDisabled={boolean('Disabled?', false)}
        label={text('Checkbox Label', 'Check me')}
      />
    </div>
  )
}
