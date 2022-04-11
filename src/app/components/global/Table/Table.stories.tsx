import { useMemo, useState } from 'react'

import Select, { SelectOption } from '~/app/components/global/Select/Select'
import { mockHistoryData } from '~/app/pages/History/History.data'

import Input from '../Input/Input'
import Table, { CellText, Status } from './Table'
import { Column } from './Table.types'
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
  const [filterBy, setFilterBy] = useState('')

  const columns: Array<Column> = useMemo(
    () => [
      {
        Header: 'Component',
        accessor: 'component',
        Cell: CellText,
      },
      {
        Header: 'Story',
        accessor: 'story',
        Cell: CellText,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: Status,
      },
    ],
    [],
  )

  const handleSelectChange = (value: string) => {
    setSortBy(value)
  }

  const handleFilterChange = (value: string) => {
    setFilterBy(value)
  }

  return (
    <div>
      <div>
        <Select
          options={sortByOptions}
          onChange={handleSelectChange}
          value={sortBy}
          className={'mb-8'}
        />
        <Input
          onChange={handleFilterChange}
          className="mb-8"
          placeholder="Filter by..."
        />
      </div>
      <Table
        columns={columns}
        data={data}
        hideHeader
        sortBy={sortBy}
        filterBy={filterBy}
      />
    </div>
  )
}
