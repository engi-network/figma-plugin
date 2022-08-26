import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import Checkbox from './Checkbox'

export default {
  component: Checkbox,
  title: 'Global/Components/Checkbox',
} as ComponentMeta<typeof Checkbox>

const Template: ComponentStory<typeof Checkbox> = (args) => {
  const [value, setValue] = useState<boolean>(false)
  const handleChange = (value?: boolean | string) => {
    setValue(!!value)
  }

  return (
    <div className="bg-slate-700 h-screen">
      <Checkbox checked={value} onChange={handleChange} {...args} />
    </div>
  )
}
export const CheckboxStory = Template.bind({})

CheckboxStory.args = {
  isDisabled: false,
  label: 'Check me',
}

export function CheckboxWithKnobs() {}
