import cn from 'classnames'
import { useState } from 'react'

import Checkbox from '~/app/components/global/Checkbox/Checkbox'
import Datepicker from '~/app/components/global/Datepicker/Datepicker'
import Popover from '~/app/components/global/Popover/Popover'
import Slider from '~/app/components/global/Slider/Slider'
import TogglePanel from '~/app/components/global/TogglePanel/TogglePanel'

import {
  FILTER_FIELDS,
  FilterValues,
  initialFilterState,
  TOGGLE_NAMES,
  toggleInitialState,
  ToggleValues,
} from './Filter.data'
import styles from './Filter.styles'

export interface FilterProps {
  className?: string
  onChange: (values: FilterValues) => void
  title: string
  value?: FilterValues
}

/**
 *
 * @TODO making active panel's text-primary white otherwise text-secondary
 *
 */

function Filter({ title, onChange, value, className }: FilterProps) {
  const [toggleState, setToggleState] =
    useState<ToggleValues>(toggleInitialState)
  const [values, setValues] = useState<FilterValues>(
    value || initialFilterState,
  )

  const handleToggle = (fieldName: TOGGLE_NAMES) => (value: boolean) => {
    setToggleState((prev) => ({ ...prev, [fieldName]: value }))
  }

  const handleChange =
    (fieldName: FILTER_FIELDS) => (value: boolean | string | Array<number>) => {
      const newValues = { ...values, [fieldName]: value }

      setValues(newValues)
      onChange(newValues)
    }

  const rootClasses = cn(className, 'py-1 w-64')

  return (
    <Popover title={title} panelClassName={rootClasses}>
      <form css={styles.form}>
        <TogglePanel
          id={TOGGLE_NAMES.COMPARE}
          title="Сomparison & status"
          panelClassName="pt-4"
          className="py-4"
          onToggle={handleToggle(TOGGLE_NAMES.COMPARE)}
          initialOpen={toggleState[TOGGLE_NAMES.COMPARE]}
        >
          <Checkbox
            checked={values[FILTER_FIELDS.SUCCESS]}
            onChange={handleChange(FILTER_FIELDS.SUCCESS)}
            label="Successful"
            className="mb-4"
          />
          <Checkbox
            checked={values[FILTER_FIELDS.FAIL]}
            onChange={handleChange(FILTER_FIELDS.FAIL)}
            label="Failed"
            className="mb-4"
          />
          <Checkbox
            checked={values[FILTER_FIELDS.IN_PROGRESS]}
            onChange={handleChange(FILTER_FIELDS.IN_PROGRESS)}
            label="In progress"
          />
        </TogglePanel>
        <TogglePanel
          id={TOGGLE_NAMES.DATE_BEFORE}
          title="Date created before"
          panelClassName="pt-4"
          className="py-4"
          onToggle={handleToggle(TOGGLE_NAMES.DATE_BEFORE)}
          initialOpen={toggleState[TOGGLE_NAMES.DATE_BEFORE]}
        >
          <Datepicker
            value={values[FILTER_FIELDS.CREATED_BEFORE]}
            onChange={handleChange(FILTER_FIELDS.CREATED_BEFORE)}
            className="w-full"
          />
        </TogglePanel>
        <TogglePanel
          id={TOGGLE_NAMES.DATE_AFTER}
          title="Date created after"
          panelClassName="pt-4"
          className="py-4"
          onToggle={handleToggle(TOGGLE_NAMES.DATE_AFTER)}
          initialOpen={toggleState[TOGGLE_NAMES.DATE_AFTER]}
        >
          <Datepicker
            value={values[FILTER_FIELDS.CREATED_AFTER]}
            onChange={handleChange(FILTER_FIELDS.CREATED_AFTER)}
            className="w-full"
          />
        </TogglePanel>
        <TogglePanel
          id={TOGGLE_NAMES.DURATION}
          title="Duration of the check"
          panelClassName="pt-4"
          className="py-4"
          onToggle={handleToggle(TOGGLE_NAMES.DURATION)}
          initialOpen={toggleState[TOGGLE_NAMES.DURATION]}
        >
          <div className="py-4">
            <Slider
              min={10}
              max={1000}
              minDistance={40}
              value={values[FILTER_FIELDS.DURATION]}
              onChange={handleChange(FILTER_FIELDS.DURATION)}
            />
          </div>
        </TogglePanel>
      </form>
    </Popover>
  )
}

export default Filter
