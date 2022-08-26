import { useState } from 'react'

import DatePicker from './Datepicker'

export default {
  component: DatePicker,
  title: 'Global/Components/Datepicker',
}

export function DatePickerWithKnobs() {
  const [value, setValue] = useState('')
  const onChange = (value: string) => {
    setValue(value)
  }

  return (
    <div className="bg-slate-700 h-screen pt-10 pl-10">
      <DatePicker value={value} onChange={onChange} />
    </div>
  )
}
