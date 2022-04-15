import { useMemo, useState } from 'react'

import Input from '~/app/components/global/Input/Input'
import Select from '~/app/components/global/Select/Select'
import Table, { CellText, Status } from '~/app/components/global/Table/Table'
import { Column } from '~/app/components/global/Table/Table.types'
import { mapHistoryToTable } from '~/app/components/global/Table/Table.utils'
import HistoryHeader from '~/app/components/modules/History/HistoryHeader/HistoryHeader'
import { useAppContext } from '~/app/contexts/App.context'
import { ui } from '~/app/lib/utils/ui-dictionary'
import {
  filterByOptions,
  sortByOptions,
} from '~/app/pages/History/History.data'

function Historycontainer() {
  const { history } = useAppContext()
  const data = useMemo(() => mapHistoryToTable(history), [])
  const [sortBy, setSortBy] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [searchBy, setSearchBy] = useState('')

  const onSearchTermChange = (value: string) => {
    setSearchBy(value)
  }

  const handleSelectChange = (value: string) => {
    setSortBy(value)
  }

  const handleFilterByChange = (value: string) => {
    setFilterBy(value)
  }

  const tableColumns: Array<Column> = useMemo(
    () => [
      {
        Header: 'CheckId',
        accessor: 'checkId',
        Cell: CellText,
      },
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
        Header: 'Repository',
        accessor: 'repository',
        Cell: CellText,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: Status,
        width: 40,
      },
    ],
    [],
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
        <Select
          options={filterByOptions}
          onChange={handleFilterByChange}
          value={sortBy}
          placeholder="Filter"
          className="w-24"
        />
      </div>
      <Table
        columns={tableColumns}
        data={data}
        sortBy={sortBy}
        filterBy={filterBy}
        searchBy={searchBy}
        hideHeader
      />
    </>
  )
}

export default Historycontainer
