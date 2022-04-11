import { useMemo, useState } from 'react'

import Input from '~/app/components/global/Input/Input'
import Select from '~/app/components/global/Select/Select'
import Table, { CellText, Status } from '~/app/components/global/Table/Table'
import { Column } from '~/app/components/global/Table/Table.types'
import { mapHistoryToTable } from '~/app/components/global/Table/Table.utils'
import HistoryHeader from '~/app/components/modules/History/HistoryHeader/HistoryHeader'
import { useAppContext } from '~/app/contexts/App.context'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { sortByOptions } from '~/app/pages/History/History.data'

function Historycontainer() {
  const { history } = useAppContext()
  const data = useMemo(() => mapHistoryToTable(history), [])
  const [sortBy, setSortBy] = useState('')
  const [filterBy, setFilterBy] = useState('')

  const onSearchTermChange = (value: string) => {
    setFilterBy(value)
  }

  const handleSelectChange = (value: string) => {
    setSortBy(value)
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
        <h2 className="text-base text-black mb-5 font-bold">
          {ui('history.history')}
        </h2>
        <div className="flex">
          <Input
            onChange={onSearchTermChange}
            placeholder={'Search...'}
            className=""
            value={filterBy}
          />
        </div>
      </div>
      <div className="px-8 mb-8 mt-4">
        <Select
          options={sortByOptions}
          onChange={handleSelectChange}
          value={sortBy}
          placeholder="Sort by"
          className="w-2/12"
        />
      </div>
      <Table
        columns={tableColumns}
        data={data}
        sortBy={sortBy}
        filterBy={filterBy}
        hideHeader
      />
    </>
  )
}

export default Historycontainer
