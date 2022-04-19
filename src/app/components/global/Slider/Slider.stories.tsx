import { useState } from 'react'

import Slider from './Slider'

export default {
  component: Slider,
  title: 'Global/Components/Slider',
}

const MIN_HOURS = 0
const MAX_HOURS = 20

export function SliderWithKnobs() {
  const [[min, max], setSliderValue] = useState([0, 10])

  const handleChange = (value: Array<number>) => {
    const [min, max] = value
    setSliderValue([min, max])
  }

  return (
    <div className="h-screen bg-slate-500 p-10">
      <Slider
        min={MIN_HOURS}
        max={MAX_HOURS}
        minDistance={1}
        value={[min, max]}
        onChange={handleChange}
      />
    </div>
  )
}
