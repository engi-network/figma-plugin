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

import Tooltip from '~/app/components/global/Tooltip/Tooltip'
import { TableFilterItem } from '~/app/components/modules/History/Filter/Filter.data'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { REPORT_STATUS } from '~/app/models/Report'

import { TB_ACCESSORS } from './Table.data'
import { Cell, Column, ColumnGroup } from './Table.types'

interface Props {
  className?: string
  columns: Array<Column | ColumnGroup>
  data: Array<Cell>
  filterItems: Array<TableFilterItem>
  hiddenColumns?: Array<TB_ACCESSORS>
  hideHeader?: boolean
  onClickRow: (report: Record<string, string>) => void
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
  onClickRow,
}: Props) {
  const defaultColumn = useMemo(
    () => ({
      width: 150,
    }),
    [],
  )

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

  useEffect(() => {
    setAllFilters(filterItems)
  }, [filterItems])

  useEffect(() => {
    if (!hiddenColumns) {
      return
    }

    setHiddenColumns(hiddenColumns)
  }, [hiddenColumns])

  const handleClickRow = (values: Record<string, string>) => () => {
    if (!!values.MAE && values.status === REPORT_STATUS.FAIL) {
      return
    }

    onClickRow(values)
  }

  const rowElements = useCallback(
    ({ index, style }) => {
      const row = rows[index]
      prepareRow(row)

      const rowClasses = cn(
        'tr justify-between border-b border-text-secondary border-opacity-30 py-4 px-7 cursor-pointer',
        'cursor-pointer',
      )

      const renderCells = row.cells.map((cell, index) => {
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
      })

      // this is fallback for very rare case to happen because most result will be success or error
      if (!!row.values.MAE && row.values.status === REPORT_STATUS.FAIL) {
        return (
          <Tooltip
            placement="top"
            content={
              <span className="text-text-secondary">
                {ui('history.tooltip.fail')}
              </span>
            }
            customPopperStyles={{
              padding: '10px 12px',
              background: 'rgba(35, 35, 35, 0.9)',
              zIndex: 10,
            }}
            customArrowStyles={{
              background: 'rgba(35, 35, 35, 0.9)',
            }}
            {...row.getRowProps({
              style,
            })}
            className={rowClasses}
          >
            {renderCells}
          </Tooltip>
        )
      }

      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className={rowClasses}
          onClick={handleClickRow(row.values)}
        >
          {renderCells}
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
              className="tr py-3 px-7 text-sm text-text-secondary bg-primary-dark/20"
              key={index}
            >
              {headerGroup.headers.map((column, index) => (
                <div
                  {...column.getHeaderProps([
                    {
                      style: {
                        alignItems: 'start',
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
