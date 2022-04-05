import { ReactNode, useCallback, useMemo } from 'react'
import { useBlockLayout, useTable } from 'react-table'
import { FixedSizeList } from 'react-window'

import scrollbarWidth from './scrollbarWidth'

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

interface Props {
  columns: Array<Column | ColumnGroup>
  data: any
  hideHeader?: boolean
}

function Table({ columns, data, hideHeader }: Props) {
  const defaultColumn = useMemo(
    () => ({
      width: 150,
    }),
    [],
  )

  const scrollBarSize = useMemo(() => scrollbarWidth(), [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
  )

  console.log('=====>', headerGroups)

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index]
      prepareRow(row)
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map((cell, index) => {
            return (
              <div {...cell.getCellProps()} className="td" key={index}>
                {cell.render('Cell')}
              </div>
            )
          })}
        </div>
      )
    },
    [prepareRow, rows],
  )

  return (
    <div {...getTableProps()} className="table" role="table">
      {!hideHeader && (
        <div>
          {headerGroups.map((headerGroup, index) => (
            <div
              {...headerGroup.getHeaderGroupProps()}
              className="tr"
              key={index}
            >
              {headerGroup.headers.map((column, index) => (
                <div
                  {...column.getHeaderProps()}
                  className="th"
                  key={index}
                  role="columnheader"
                >
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div {...getTableBodyProps()}>
        <FixedSizeList
          height={400}
          itemCount={rows.length}
          itemSize={35}
          width={totalColumnsWidth + scrollBarSize}
        >
          {RenderRow}
        </FixedSizeList>
      </div>
    </div>
  )
}

export default Table
