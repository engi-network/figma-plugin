import { useState } from 'react'

import { SORT_BY_OPTIONS } from '~/app/pages/History/History.data'

import Select from './Select'

export default {
  component: Select,
  title: 'Global/Components/Select',
}

export function SelectWithKnobs() {
  const [sortBy, setSortBy] = useState(SORT_BY_OPTIONS[0].value)

  const handleSelectChange = (value: string) => {
    setSortBy(value)
  }

  return (
    <div className="h-[100vh] w-full bg-slate-800">
      <Select
        options={SORT_BY_OPTIONS}
        onChange={handleSelectChange}
        value={sortBy}
        placeholder="Sort by"
        className="w-1/12"
      />
    </div>
  )
}
