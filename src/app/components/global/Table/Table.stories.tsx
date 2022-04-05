import { useMemo } from 'react'

import Table, { Column } from './Table'
import makeData from './Table.utils'

export default {
  component: Table,
  title: 'Global/Components/Table',
}

function Status({ value }: { value: string }) {
  return <p className="test">{value}</p>
}

export function TableWithKnobs() {
  const data = useMemo(() => makeData(100000), [])

  const columns: Array<Column> = useMemo(
    () => [
      {
        Header: 'Component',
        accessor: 'component',
      },
      {
        Header: 'Story',
        accessor: 'story',
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
