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

import { TB_ACCESSORS } from './Table.data'
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

  console.log('filteredItems======>', filterItems)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    toggleSortBy,
    setAllFilters,
    // state,
    // filters,
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

  // useEffect(() => {
  //   setAllFilters(filterItems)
  // }, [filterItems])

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
              <div
                {...cell.getCellProps([
                  {
                    style: {
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                    },
                  },
                ])}
                className="td"
                key={index}
              >
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
              {...headerGroup.getHeaderGroupProps([
                {
                  style: {
                    width: '100%',
                  },
                },
              ])}
              className="tr py-3 px-7 text-sm text-text-secondary bg-primary-white/20"
              key={index}
            >
              {headerGroup.headers.map((column, index) => (
                <div
                  {...column.getHeaderProps([
                    {
                      style: {
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'start',
                      },
                    },
                  ])}
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
              itemSize={102}
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

export default Table
