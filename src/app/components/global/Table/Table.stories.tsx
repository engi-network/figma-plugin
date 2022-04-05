import { useMemo } from 'react'

import { mockHistoryData } from '~/app/pages/History/History.data'

import Table, { CellText, Column, Status } from './Table'
import { mapHistoryToTable } from './Table.utils'

export default {
  component: Table,
  title: 'Global/Components/Table',
}

export function TableWithKnobs() {
  const data = useMemo(() => mapHistoryToTable(mockHistoryData), [])

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

  return <Table columns={columns} data={data} hideHeader />
}
