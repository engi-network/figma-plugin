import { useMemo, useState } from 'react'

import Select, { SelectOption } from '~/app/components/global/Select/Select'
import Filter from '~/app/components/modules/History/Filter/Filter'
import {
  FilterValues,
  initialFilterState,
} from '~/app/components/modules/History/Filter/Filter.data'
import { mockHistoryData } from '~/app/pages/History/History.data'
import { useTableData } from '~/app/pages/History/History.hooks'
import { extractBranchNames } from '~/app/pages/History/History.utils'

import Table from './Table'
import { mapHistoryToTable } from './Table.utils'

export default {
  component: Table,
  title: 'Global/Components/Table',
}

const sortByOptions: Array<SelectOption> = [
  { value: 'component', name: 'Component' },
  { value: 'story', name: 'Story' },
  { value: 'status', name: 'Status' },
]

export function TableWithKnobs() {
  const data = useMemo(() => mapHistoryToTable(mockHistoryData), [])
  const [sortBy, setSortBy] = useState('')
  const [filter, setFilter] = useState<FilterValues>(initialFilterState)
  const { columns, filterItems, hiddenColumns } = useTableData(filter)

  const handleSelectChange = (value: string) => {
    setSortBy(value)
  }

  const handleFilterChange = (values: FilterValues) => {
    setFilter(values)
  }

  const branchNames = extractBranchNames(mockHistoryData)

  return (
    <div>
      <div>
        <Select
          options={sortByOptions}
          onChange={handleSelectChange}
          value={sortBy}
          className={'mb-8'}
        />
        <Filter
          title={'Filter by'}
          onChange={handleFilterChange}
          value={filter}
          branchNames={branchNames}
        />
      </div>
      <Table
        columns={columns}
        data={data}
        hideHeader
        sortBy={sortBy}
        hiddenColumns={hiddenColumns}
        filterItems={filterItems}
      />
    </div>
  )
}
