import { useMemo } from 'react'

import CellCodeBlock from '~/app/components/global/Table/CellCodeBlock/CellCodeBlock'
import CellImage from '~/app/components/global/Table/CellImage/CellImage'
import CellName from '~/app/components/global/Table/CellName/CellName'
import CellStatus from '~/app/components/global/Table/CellStatus/CellStatus'
import CellText from '~/app/components/global/Table/CellText/CellText'
import CellVersion from '~/app/components/global/Table/CellVersion/CellVersion'
import { TB_ACCESSORS } from '~/app/components/global/Table/Table.data'
import { Column } from '~/app/components/global/Table/Table.types'
import TableHeader from '~/app/components/global/Table/TableHeader/TableHeader'
import { FilterValues } from '~/app/components/modules/History/Filter/Filter.data'
import { mapFilterFormToTableFilter } from '~/app/components/modules/History/Filter/Filter.utils'

const hiddenColumns = [
  TB_ACCESSORS.REPOSITORY,
  TB_ACCESSORS.CHECKID,
  TB_ACCESSORS.CREATED_AT,
  TB_ACCESSORS.COMPLETED_AT,
  TB_ACCESSORS.DURATION,
  TB_ACCESSORS.PATH,
  TB_ACCESSORS.STORY,
  TB_ACCESSORS.COMMIT,
  TB_ACCESSORS.BRANCH,
]

function dateRangeFilter(rows, id, filterValue) {
  const [start, end] = filterValue

  const greaterThanPredicator = (row) => row.values[id] > start
  const lessThanPredicator = (row) => row.values[id] < end
  const rangePredicator = (row) =>
    row.values[id] < end && row.values[id] > start

  if (start && end) {
    return rows.filter(rangePredicator)
  }

  if (start) {
    return rows.filter(greaterThanPredicator)
  }

  if (end) {
    return rows.filter(lessThanPredicator)
  }
}

// this should be the same thing that has been done Filter.utils.ts line 50
dateRangeFilter.autoRemove = ([start, end]: Array<number>) => !start && !end

function inclusionFilter(rows, id, filterValue) {
  return rows.filter((row) => filterValue.includes(row.values[id]))
}

// this should be the same thing that has been done Filter.utils.ts line 50
inclusionFilter.autoRemove = (filterValue: Array<string>) => !filterValue.length

export function useTableData(filter: FilterValues) {
  const columns: Array<Column> = useMemo(
    () => [
      {
        accessor: TB_ACCESSORS.IMAGE,
        Cell: CellImage,
        disableGlobalFilter: true,
        Header: <TableHeader title="Designs" />,
        id: TB_ACCESSORS.IMAGE,
        width: 140,
      },
      {
        accessor: TB_ACCESSORS.STATUS,
        Cell: CellStatus,
        disableGlobalFilter: true,
        filter: inclusionFilter,
        Header: '',
        width: 56,
      },
      {
        accessor: TB_ACCESSORS.CODE,
        Cell: CellCodeBlock,
        Header: <TableHeader title="Rendered code" />,
        id: TB_ACCESSORS.CODE,
        width: 140,
      },
      {
        accessor: TB_ACCESSORS.NAME,
        Cell: CellName,
        disableGlobalFilter: true,
        Header: (
          <TableHeader
            title="Components"
            subtitle="Branch name"
            className="pl-8"
          />
        ),
        width: 200,
      },
      {
        accessor: TB_ACCESSORS.VERSION,
        Cell: CellVersion,
        disableGlobalFilter: true,
        filter: inclusionFilter,
        Header: <TableHeader title="Version" subtitle="Commit hash" />,
        id: TB_ACCESSORS.VERSION,
      },

      {
        Header: TB_ACCESSORS.CHECKID,
        accessor: TB_ACCESSORS.CHECKID,
        Cell: CellText,
        id: TB_ACCESSORS.CHECKID,
      },
      {
        Header: TB_ACCESSORS.COMMIT,
        accessor: TB_ACCESSORS.COMMIT,
        Cell: CellText,
        id: TB_ACCESSORS.COMMIT,
      },
      {
        accessor: TB_ACCESSORS.PATH,
        Cell: CellText,
        Header: TB_ACCESSORS.PATH,
        id: TB_ACCESSORS.PATH,
      },
      {
        accessor: TB_ACCESSORS.CREATED_AT,
        Cell: CellText,
        disableGlobalFilter: true,
        filter: dateRangeFilter,
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
        accessor: TB_ACCESSORS.BRANCH,
        Cell: CellText,
        disableGlobalFilter: true,
        filter: inclusionFilter,
        Header: TB_ACCESSORS.BRANCH,
        id: TB_ACCESSORS.BRANCH,
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
