import { useMemo, useState } from 'react'

import Input from '~/app/components/global/Input/Input'
import Select from '~/app/components/global/Select/Select'
import Table from '~/app/components/global/Table/Table'
import { mapHistoryToTable } from '~/app/components/global/Table/Table.utils'
import Filter from '~/app/components/modules/History/Filter/Filter'
import {
  FilterValues,
  initialFilterState,
} from '~/app/components/modules/History/Filter/Filter.data'
import HistoryHeader from '~/app/components/modules/History/HistoryHeader/HistoryHeader'
import { useAppContext } from '~/app/contexts/App.context'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { sortByOptions } from '~/app/pages/History/History.data'

import { useTableData } from './History.hooks'

function Historycontainer() {
  const { history } = useAppContext()
  const data = useMemo(() => mapHistoryToTable(history), [])
  const [filter, setFilter] = useState<FilterValues>(initialFilterState)
  const [sortBy, setSortBy] = useState('')
  const [searchBy, setSearchBy] = useState('')
  const { columns, filterItems } = useTableData(filter)

  const onSearchTermChange = (value: string) => {
    setSearchBy(value)
  }

  const handleSelectChange = (value: string) => {
    setSortBy(value)
  }

  const handleFilterChange = (values: FilterValues) => {
    setFilter(values)
  }

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
        columns={columns}
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
