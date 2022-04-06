import cn from 'classnames'
import { useCallback, useEffect, useMemo } from 'react'
import { useBlockLayout, useFilters, useSortBy, useTable } from 'react-table'
import { FixedSizeList } from 'react-window'

import Checkbox from '~/app/components/global/Checkbox/Checkbox'
import { getScrollbarWidth } from '~/app/lib/utils/scrollbar'

import { Cell, Column, ColumnGroup } from './Table.types'

interface Props {
  className?: string
  columns: Array<Column | ColumnGroup>
  data: Array<Cell>
  filterBy?: string
  hideHeader?: boolean
  sortBy?: string
}

function Table({
  columns,
  data,
  hideHeader,
  sortBy,
  filterBy,
  className,
}: Props) {
  const defaultColumn = useMemo(
    () => ({
      width: 150,
    }),
    [],
  )

  const scrollBarSize = useMemo(() => getScrollbarWidth(), [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
    toggleSortBy,
    setFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useFilters,
    useSortBy,
  )

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

  useEffect(() => {
    if (!sortBy) {
      return
    }

    toggleSortBy(sortBy, true)
  }, [sortBy])

  useEffect(() => {
    setFilter('component', filterBy)
  }, [filterBy])

  const tableClasses = cn('table', className)
  return (
    <div {...getTableProps()} className={tableClasses} role="table">
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

export function Status({ value }: { value: string }) {
  if (value === 'success') {
    return <Checkbox checked readOnly />
  }

  return <Checkbox isDisabled readOnly />
}

export function CellText({ value }: { value: string }) {
  return <p className="text-sm text-wf-secondary">{value}</p>
}

export default Table
