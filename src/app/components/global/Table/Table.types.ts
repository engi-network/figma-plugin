import { ReactNode } from 'react'

export interface Column {
  Cell?: ReactNode
  Header: string
  accessor: number | string | ((_: number, index: number) => number)
  height?: number
  width?: number
}
export interface ColumnGroup extends Column {
  columns?: Array<Column>
}

export type Cell = Record<string, string | number>
