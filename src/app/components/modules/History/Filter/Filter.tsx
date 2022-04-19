import cn from 'classnames'
import { useState } from 'react'

import Checkbox from '~/app/components/global/Checkbox/Checkbox'
import Datepicker from '~/app/components/global/Datepicker/Datepicker'
import Popover from '~/app/components/global/Popover/Popover'
import Slider from '~/app/components/global/Slider/Slider'
import TogglePanel from '~/app/components/global/TogglePanel/TogglePanel'

import { FILTER_FIELDS, FilterValues, initialFilterState } from './Filter.data'
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
  const [values, setValues] = useState<FilterValues>(
    value || initialFilterState,
  )

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
          title="Сomparison & status"
          panelClassName="pt-4"
          className="py-4"
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
          title="Date created after"
          panelClassName="pt-4"
          className="py-4"
        >
          <Datepicker
            value={values[FILTER_FIELDS.CREATED_AFTER]}
            onChange={handleChange(FILTER_FIELDS.CREATED_AFTER)}
          />
        </TogglePanel>
        <TogglePanel
          title="Date created before"
          panelClassName="pt-4"
          className="py-4"
        >
          <Datepicker
            value={values[FILTER_FIELDS.CREATED_BEFORE]}
            onChange={handleChange(FILTER_FIELDS.CREATED_BEFORE)}
          />
        </TogglePanel>
        <TogglePanel
          title="Duration of the check"
          panelClassName="pt-4"
          className="py-4"
        >
          <div className="py-4">
            <Slider
              min={0}
              max={60}
              minDistance={1}
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
