import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import StoryContainer from '~/app/components/modules/Storybook/StoryContainer/StoryContainer'
import { SORT_BY_OPTIONS } from '~/app/pages/History/History.data'

import Select from './Select'

export default {
  component: Select,
  title: 'Global/Components/Select',
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => {
  const [sortBy, setSortBy] = useState(SORT_BY_OPTIONS[0].value)

  const handleSelectChange = (value: string) => {
    setSortBy(value)
  }

  return (
    <StoryContainer>
      <Select {...args} onChange={handleSelectChange} value={sortBy} />
    </StoryContainer>
  )
}

export const SelectStory = Template.bind({})
SelectStory.args = {
  options: SORT_BY_OPTIONS,
  placeholder: 'Sort by',
  className: 'w-1/12',
}
