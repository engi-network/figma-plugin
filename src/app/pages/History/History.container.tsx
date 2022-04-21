import { useMemo, useState } from 'react'

import Input from '~/app/components/global/Input/Input'
import Select from '~/app/components/global/Select/Select'
import Table, { CellText, Status } from '~/app/components/global/Table/Table'
import { Column } from '~/app/components/global/Table/Table.types'
import { mapHistoryToTable } from '~/app/components/global/Table/Table.utils'
import Filter from '~/app/components/modules/History/Filter/Filter'
import {
  FilterValues,
  initialFilterState,
} from '~/app/components/modules/History/Filter/Filter.data'
import { mapFilterFormToTableFilter } from '~/app/components/modules/History/Filter/Filter.utils'
import HistoryHeader from '~/app/components/modules/History/HistoryHeader/HistoryHeader'
import { useAppContext } from '~/app/contexts/App.context'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { sortByOptions, TB_ACCESSORS } from '~/app/pages/History/History.data'

function Historycontainer() {
  const { history } = useAppContext()
  const data = useMemo(() => mapHistoryToTable(history), [])
  const [filter, setFilter] = useState<FilterValues>(initialFilterState)
  const [sortBy, setSortBy] = useState('')
  const [searchBy, setSearchBy] = useState('')

  const onSearchTermChange = (value: string) => {
    setSearchBy(value)
  }

  const handleSelectChange = (value: string) => {
    setSortBy(value)
  }

  const handleFilterChange = (values: FilterValues) => {
    setFilter(values)
  }

  const tableColumns: Array<Column> = useMemo(
    () => [
      {
        Header: TB_ACCESSORS.CHECKID,
        accessor: TB_ACCESSORS.CHECKID,
        Cell: CellText,
        id: TB_ACCESSORS.CHECKID,
      },
      {
        accessor: TB_ACCESSORS.PATH,
        Cell: CellText,
        disableGlobalFilter: true,
        Header: TB_ACCESSORS.PATH,
        id: TB_ACCESSORS.PATH,
      },
      {
        accessor: TB_ACCESSORS.CREATED_AT,
        Cell: CellText,
        disableGlobalFilter: true,
        filter: 'between',
        Header: TB_ACCESSORS.CREATED_AT,
        id: TB_ACCESSORS.CREATED_AT,
      },
      {
        accessor: TB_ACCESSORS.COMPLETED_AT,
        Cell: CellText,
        disableGlobalFilter: true,
        Header: TB_ACCESSORS.COMPLETED_AT,
        id: TB_ACCESSORS.COMPLETED_AT,
      },
      {
        accessor: TB_ACCESSORS.STORY,
        Cell: CellText,
        disableGlobalFilter: true,
        Header: TB_ACCESSORS.STORY,
        id: TB_ACCESSORS.STORY,
      },
      {
        accessor: TB_ACCESSORS.REPOSITORY,
        Cell: CellText,
        disableGlobalFilter: true,
        Header: TB_ACCESSORS.REPOSITORY,
        id: TB_ACCESSORS.REPOSITORY,
      },
      {
        accessor: TB_ACCESSORS.DURATION,
        disableGlobalFilter: true,
        filter: 'between',
        Header: TB_ACCESSORS.DURATION,
        id: TB_ACCESSORS.DURATION,
      },
      {
        accessor: TB_ACCESSORS.STATUS,
        Cell: Status,
        disableGlobalFilter: true,
        filter: 'equals',
        Header: TB_ACCESSORS.STATUS,
        width: 40,
      },
    ],
    [],
  )

  const filterItems = useMemo(
    () => mapFilterFormToTableFilter(filter),
    [filter],
  )

  return (
    <>
      <HistoryHeader />
      <div className="px-8 py-6 border-b border-text-secondary border-opacity-30">
        <h2 className="text-base text-text-primary mb-5 font-bold">
          {ui('history.history')}
        </h2>
        <div className="flex">
          <Input
            onChange={onSearchTermChange}
            placeholder={ui('history.searchPlaceholder')}
            className=""
            value={searchBy}
          />
        </div>
      </div>
      <div className="flex px-8 mb-8 mt-4">
        <Select
          options={sortByOptions}
          onChange={handleSelectChange}
          value={sortBy}
          placeholder="Sort by"
          className="w-24"
        />
        <Filter
          title={'Filter by'}
          onChange={handleFilterChange}
          value={filter}
        />
      </div>
      <Table
        columns={tableColumns}
        data={data}
        sortBy={sortBy}
        filterItems={filterItems}
        searchBy={searchBy}
        hideHeader
      />
    </>
  )
}

export default Historycontainer
