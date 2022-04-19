import { useState } from 'react'

import Filter from './Filter'
import { FilterValues, initialFilterState } from './Filter.data'

export default {
  component: Filter,
  title: 'Global/Modules/Filter',
}

export function FilterWithKnobs() {
  const [values, setValues] = useState<FilterValues>(initialFilterState)

  const handleFilterChange = (values: FilterValues) => {
    setValues(values)
  }

  return (
    <div className="h-screen bg-slate-700">
      <Filter
        title={'Filter by'}
        onChange={handleFilterChange}
        value={values}
      />
    </div>
  )
}
