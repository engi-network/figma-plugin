import { useMemo, useState } from 'react'

import Button from '~/app/components/global/Button/Button'
import Input from '~/app/components/global/Input/Input'
import Select from '~/app/components/global/Select/Select'
import Table, {
  CellText,
  Column,
  Status,
} from '~/app/components/global/Table/Table'
import { mapHistoryToTable } from '~/app/components/global/Table/Table.utils'
import HistoryHeader from '~/app/components/modules/History/HistoryHeader/HistoryHeader'
import { ui } from '~/app/lib/utils/ui-dictionary'
import {
  mockHistoryData,
  sortByOptions,
} from '~/app/pages/History/History.data'

function Historycontainer() {
  const data = useMemo(() => mapHistoryToTable(mockHistoryData), [])
  const [sortBy, setSortBy] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [submitedValue, setSubmitedValue] = useState('')

  const onSearchTermChange = (value: string) => {
    setFilterBy(value)
  }
  const onSearch = () => {
    setSubmitedValue(filterBy)
  }

  const handleSelectChange = (value: string) => {
    setSortBy(value)
  }

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

  return (
    <>
      <HistoryHeader />
      <div className="p-8">
        <h2 className="text-2xl text-black mb-5 font-bold">
          {ui('history.history')}
        </h2>
        <div className="flex">
          <Input
            onChange={onSearchTermChange}
            placeholder={'Search...'}
            className=""
            value={filterBy}
          />
          <Button
            onClick={onSearch}
            backgroundColor="#18A0FB"
            primary
            className="ml-8"
          >
            {ui('history.search')}
          </Button>
        </div>
      </div>
      <div className="px-8 mb-8">
        <Select
          options={sortByOptions}
          onChange={handleSelectChange}
          value={sortBy}
          placeholder="Select one..."
          className="w-1/2"
        />
      </div>
      <Table
        columns={columns}
        data={data}
        sortBy={sortBy}
        filterBy={submitedValue}
        hideHeader
        className="px-8"
      />
    </>
  )
}

export default Historycontainer
