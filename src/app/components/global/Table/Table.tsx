import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import { useCallback, useEffect, useMemo } from 'react'
import {
  useBlockLayout,
  useFilters,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'

import { TableFilterItem } from '~/app/components/modules/History/Filter/Filter.data'
import { TB_ACCESSORS } from '~/app/pages/History/History.data'

import { Cell, Column, ColumnGroup } from './Table.types'

interface Props {
  className?: string
  columns: Array<Column | ColumnGroup>
  data: Array<Cell>
  filterItems: Array<TableFilterItem>
  hiddenColumns?: Array<TB_ACCESSORS>
  hideHeader?: boolean
  searchBy?: string
  sortBy?: string
}

function Table({
  columns,
  data,
  hideHeader,
  sortBy,
  className,
  searchBy,
  filterItems,
  hiddenColumns,
}: Props) {
  const defaultColumn = useMemo(
    () => ({
      width: 150,
    }),
    [],
  )

  console.info('filterValues=====>', filterItems)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    toggleSortBy,
    setAllFilters,
    // state,
    filters,
    setGlobalFilter,
    setHiddenColumns,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useGlobalFilter,
    useFilters,
    useSortBy,
  )

  console.info('set filter state====>', filters)
  useEffect(() => {
    setAllFilters(filterItems)
  }, [filterItems])

  useEffect(() => {
    if (!hiddenColumns) {
      return
    }

    setHiddenColumns(hiddenColumns)
  }, [hiddenColumns])

  const rowElements = useCallback(
    ({ index, style }) => {
      const row = rows[index]
      prepareRow(row)
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr justify-between border-b border-text-secondary border-opacity-30 py-4 px-7"
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
    setGlobalFilter(searchBy)
  }, [searchBy])

  const tableClasses = cn('table', className)

  if (!rowElements.length) {
    return (
      <p className="text-sm text-wf-secondary">{"You don't have history!"}</p>
    )
  }

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

      <div {...getTableBodyProps()} css={{ height: 350 }}>
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              height={height}
              itemCount={rows.length}
              itemSize={57}
              width={width}
            >
              {rowElements}
            </FixedSizeList>
          )}
        </AutoSizer>
      </div>
    </div>
  )
}

export function Status({ value }: { value: string }) {
  if (value === 'success') {
    return <CheckCircleIcon className="w-6 h-6 text-primary-green" />
  }

  return <XCircleIcon className="w-6 h-6 text-secondary-error" />
}

export function CellText({ value }: { value: string }) {
  return (
    <p className="text-sm text-text-primary w-full overflow-hidden truncate">
      {value}
    </p>
  )
}

export default Table
