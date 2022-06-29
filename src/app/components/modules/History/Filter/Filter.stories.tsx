import { useState } from 'react'

import logger from '~/app/lib/utils/logger'

import Filter from './Filter'
import { FilterValues, initialFilterState } from './Filter.data'
import { mapFilterFormToTableFilter } from './Filter.utils'

export default {
  component: Filter,
  title: 'Global/Modules/Filter',
}

export function FilterWithKnobs() {
  const [values, setValues] = useState<FilterValues>(initialFilterState)

  const handleFilterChange = (values: FilterValues) => {
    setValues(values)
  }

  const filterItems = mapFilterFormToTableFilter(values)
  logger.info('filter:', filterItems)

  return (
    <div className="h-screen bg-slate-700">
      <Filter
        title={'Filter by'}
        onChange={handleFilterChange}
        value={values}
        branchNames={['main', 'feature1', 'feature2']}
      />
    </div>
  )
}
