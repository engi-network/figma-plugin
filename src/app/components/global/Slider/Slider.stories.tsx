import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import Slider from './Slider'

export default {
  component: Slider,
  title: 'Global/Components/Slider',
  argTypes: {
    valuePair: { control: { type: 'range', min: 1, max: 30, step: 3 } },
  },
} as ComponentMeta<typeof Slider>

const Template: ComponentStory<typeof Slider> = (args) => {
  const [[min, max], setSliderValue] = useState([0, 10000])

  const handleChange = (value: Array<number>) => {
    const [min, max] = value
    setSliderValue([min, max])
  }
  return (
    <div className="h-screen bg-slate-500 p-10">
      <Slider {...args} value={[min, max]} onChange={handleChange} />
    </div>
  )
}

export const SliderStory = Template.bind({})
SliderStory.args = {
  min: 0,
  max: 10_000,
  minDistance: 400,
}
