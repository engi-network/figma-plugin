import { useMemo, useState } from 'react'
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import Input from '~/app/components/global/Input/Input'
import LinkButton from '~/app/components/global/LinkButton/LinkButton'
import Select from '~/app/components/global/Select/Select'
import Table from '~/app/components/global/Table/Table'
import { mapHistoryToTable } from '~/app/components/global/Table/Table.utils'
import Filter from '~/app/components/modules/History/Filter/Filter'
import {
  FilterValues,
  initialFilterState,
} from '~/app/components/modules/History/Filter/Filter.data'
import HistoryHeader from '~/app/components/modules/History/HistoryHeader/HistoryHeader'
import ErrorListModal from '~/app/components/pages/HistoryPage/ErrorListModal/ErrorListModal'
import { useAppContext } from '~/app/contexts/App.context'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { REPORT_STATUS } from '~/app/models/Report'
import { SORT_BY_OPTIONS } from '~/app/pages/History/History.data'

import { useTableData } from './History.hooks'
import { extractBranchNames } from './History.utils'

function HistoryContainer() {
  const { history } = useAppContext()
  const [searchParams] = useSearchParams()
  const stringFilterValues = searchParams.get('filter') as string
  const filterFromQuery =
    (JSON.parse(stringFilterValues) as Record<string, string> | null) || {}
  const navigate = useNavigate()

  const [filter, setFilter] = useState<FilterValues>({
    ...initialFilterState,
    ...filterFromQuery,
  })
  const [sortBy, setSortBy] = useState('')
  const [searchBy, setSearchBy] = useState('')
  const [isErrorListModalOpen, setIsErrorListModalOpen] = useState(false)

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

  const handleClickRow = ({ checkId, status }: Record<string, string>) => {
    const searchParam = {
      checkId,
    }

    if (status === REPORT_STATUS.IN_PROGRESS) {
      navigate({
        pathname: ROUTES_MAP[ROUTES.LOADING],
        search: `?${createSearchParams(searchParam)}`,
      })
      return
    }

    navigate({
      pathname: ROUTES_MAP[ROUTES.RESULT],
      search: `?${createSearchParams(searchParam)}`,
    })
  }

  const handleOpenErrorListModal = () => {
    setIsErrorListModalOpen(true)
  }

  const handleCloseErrorListModal = () => {
    setIsErrorListModalOpen(false)
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
            value={searchBy}
          />
        </div>
      </div>
      <div className="flex px-8 mb-8 mt-4">
        <div>
          <Select
            options={SORT_BY_OPTIONS}
            onChange={handleSelectChange}
            value={sortBy}
            placeholder="Sort by"
            className="w-24"
          />
          <Filter
            title="Filter by"
            onChange={handleFilterChange}
            value={filter}
            branchNames={branchNames}
          />
        </div>
        <LinkButton onClick={handleOpenErrorListModal} className="">
          {ui('history.viewErrors')}
        </LinkButton>
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
      <ErrorListModal
        data={[]}
        isOpen={isErrorListModalOpen}
        onClose={handleCloseErrorListModal}
      />
    </>
  )
}

export default HistoryContainer
