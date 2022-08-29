import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import Input from './Input'

export default {
  component: Input,
  title: 'Global/Components/Input',
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => {
  const [value, setValue] = useState('')
  const handleChangeValue = (value: string) => {
    setValue(value)
  }

  return (
    <div className="bg-primary-white">
      <Input value={value} {...args} onChange={handleChangeValue} />
    </div>
  )
}

export const InputStory = Template.bind({})
InputStory.args = {
  label: 'Component',
  placeholder: 'Placeholder',
  error: 'This field has an error',
  disabled: false,
}
