import { useState } from 'react'

import { sortByOptions } from '~/app/pages/History/History.data'

import Select from './Select'

export default {
  component: Select,
  title: 'Global/Components/Select',
}

export function SelectWithKnobs() {
  const [sortBy, setSortBy] = useState('')

  const handleSelectChange = (value: string) => {
    setSortBy(value)
  }

  return (
    <div>
      <Select
        options={sortByOptions}
        onChange={handleSelectChange}
        value={sortBy}
        placeholder="Sort by"
        className="w-1/12"
      />
    </div>
  )
}
