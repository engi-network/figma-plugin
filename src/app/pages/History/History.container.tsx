import { useEffect, useMemo, useState } from 'react'
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

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
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import { getFilterStateFromQuery } from '~/app/lib/utils/query'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { DetailedReport } from '~/app/models/Report'
import { SORT_BY_OPTIONS } from '~/app/pages/History/History.data'

import { useTableData } from './History.hooks'
import { extractBranchNames } from './History.utils'

function Historycontainer() {
  const { history } = useAppContext()
  const { state } = useLocation()
  const statesFromQuery = getFilterStateFromQuery(
    state as Record<string, string>,
  )
  const navigate = useNavigate()

  const [filter, setFilter] = useState<FilterValues>({
    ...initialFilterState,
    ...statesFromQuery,
  })
  const [sortBy, setSortBy] = useState('')
  const [searchBy, setSearchBy] = useState('')

  const { columns, filterItems, hiddenColumns } = useTableData(filter)
  const data = useMemo(() => mapHistoryToTable(history), [history])
  const branchNames = useMemo(() => extractBranchNames(history), [history])

  const onSearchTermChange = (value: string) => {
    setSearchBy(value)
  }

  const handleSelectChange = (value: string) => {
    setSortBy(value)
  }

  const handleFilterChange = (values: FilterValues) => {
    setFilter(values)
  }

  const handleClickRow = ({ checkId }: DetailedReport) => {
    const searchParam = {
      checkId,
    }

    navigate({
      pathname: ROUTES_MAP[ROUTES.RESULT],
      search: `?${createSearchParams(searchParam)}`,
    })
  }

  console.info('history on history=====>', history, data)

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
          options={SORT_BY_OPTIONS}
          onChange={handleSelectChange}
          value={sortBy}
          placeholder="Sort by"
          className="w-24"
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
        sortBy={sortBy}
        filterItems={filterItems}
        searchBy={searchBy}
        hiddenColumns={hiddenColumns}
        onClickRow={handleClickRow}
      />
    </>
  )
}

export default Historycontainer
