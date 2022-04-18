import { useState } from 'react'

import Datepicker from './Datepicker'

export default {
  component: Datepicker,
  title: 'Global/Components/Datepicker',
}

export function DatepickerWithKnobs() {
  const [value, setValue] = useState('')
  const onChange = (value: string) => {
    setValue(value)
  }

  return (
    <div className="bg-slate-700 h-56 pt-10 pl-10">
      <Datepicker value={value} onChange={onChange} />
    </div>
  )
}
