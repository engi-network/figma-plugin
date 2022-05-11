import { useState } from 'react'

import Slider from './Slider'

export default {
  component: Slider,
  title: 'Global/Components/Slider',
}

export function SliderWithKnobs() {
  const [[min, max], setSliderValue] = useState([0, 10000])

  const handleChange = (value: Array<number>) => {
    const [min, max] = value
    setSliderValue([min, max])
  }

  return (
    <div className="h-screen bg-slate-500 p-10">
      <Slider
        min={0}
        max={10000}
        minDistance={400}
        value={[min, max]}
        onChange={handleChange}
      />
    </div>
  )
}
