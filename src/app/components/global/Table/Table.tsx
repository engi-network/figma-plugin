import { ReactNode, useCallback, useMemo, useState } from 'react'
import { useBlockLayout, useFilters, useSortBy, useTable } from 'react-table'
import { FixedSizeList } from 'react-window'

import Checkbox from '~/app/components/global/Checkbox/Checkbox'
import Select, { SelectOption } from '~/app/components/global/Select/Select'

import Input from '../Input/Input'
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

export type Cell = Record<string, string>

interface Props {
  columns: Array<Column | ColumnGroup>
  data: Array<Cell>
  hideHeader?: boolean
}

const sortByOptions: Array<SelectOption> = [
  { value: 'component', name: 'Component' },
  { value: 'story', name: 'Story' },
  { value: 'status', name: 'Status' },
]

function Table({ columns, data, hideHeader }: Props) {
  const [selectedOption, setSelectedOption] = useState('')
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

  const handleSelectChange = (value: string) => {
    // Function(ColumnId: String, descending: Bool, isMulti: Bool) => void
    toggleSortBy(value, true)
    setSelectedOption(value)
  }

  const handleFilterChange = (value: string) => {
    setFilter('component', value)
  }

  return (
    <>
      <div>
        <Select
          options={sortByOptions}
          onChange={handleSelectChange}
          value={selectedOption}
        />
        <Input onChange={handleFilterChange} />
      </div>
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
    </>
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
