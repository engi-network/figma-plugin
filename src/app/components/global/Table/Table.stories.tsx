import { useMemo } from 'react'

import Table from './Table'
import makeData from './Table.utils'

export default {
  component: Table,
  title: 'Global/Components/Table',
}

export function TableWithKnobs() {
  const data = useMemo(() => makeData(100000), [])

  const columns = useMemo(
    () => [
      {
        Header: 'Row Index',
        accessor: (row, i) => i,
      },
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
            width: 50,
          },
          {
            Header: 'Visits',
            accessor: 'visits',
            width: 60,
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    [],
  )

  return <Table columns={columns} data={data} />
}
