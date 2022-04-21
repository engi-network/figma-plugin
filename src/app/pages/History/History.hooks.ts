import { useMemo } from 'react'

import { CellText, Status } from '~/app/components/global/Table/Table'
import { Column } from '~/app/components/global/Table/Table.types'
import { FilterValues } from '~/app/components/modules/History/Filter/Filter.data'
import { mapFilterFormToTableFilter } from '~/app/components/modules/History/Filter/Filter.utils'
import { TB_ACCESSORS } from '~/app/pages/History/History.data'

const hiddenColumns = [
  TB_ACCESSORS.REPOSITORY,
  TB_ACCESSORS.CHECKID,
  TB_ACCESSORS.CREATED_AT,
  TB_ACCESSORS.COMPLETED_AT,
  TB_ACCESSORS.DURATION,
]

export function useTableData(filter: FilterValues) {
  const columns: Array<Column> = useMemo(
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

  return { columns, filterItems, hiddenColumns }
}
