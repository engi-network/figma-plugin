import cn from 'classnames'
import { useState } from 'react'

import Checkbox from '~/app/components/global/Checkbox/Checkbox'
import Datepicker from '~/app/components/global/Datepicker/Datepicker'
import Popover from '~/app/components/global/Popover/Popover'
import Slider from '~/app/components/global/Slider/Slider'
import Tab from '~/app/components/global/Tab/Tab'
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
  branchNames: Array<string>
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

function Filter({
  title,
  onChange,
  value,
  className,
  branchNames,
}: FilterProps) {
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

  const handleBranchChange =
    (branchName: string) => (value: boolean | string) => {
      const newValues = {
        ...values,
        [FILTER_FIELDS.BRANCH]: {
          ...values[FILTER_FIELDS.BRANCH],
          [branchName]: value as boolean,
        },
      }

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
          id={TOGGLE_NAMES.DATE_CREATED}
          title="Date created"
          onToggle={handleToggle(TOGGLE_NAMES.DATE_CREATED)}
          initialOpen={toggleState[TOGGLE_NAMES.DATE_CREATED]}
        >
          <Tab tabLabels={['After', 'Before']}>
            <Datepicker
              value={values[FILTER_FIELDS.CREATED_BEFORE]}
              onChange={handleChange(FILTER_FIELDS.CREATED_BEFORE)}
              className="w-full"
            />
            <Datepicker
              value={values[FILTER_FIELDS.CREATED_AFTER]}
              onChange={handleChange(FILTER_FIELDS.CREATED_AFTER)}
              className="w-full"
            />
          </Tab>
        </TogglePanel>
        <TogglePanel
          id={TOGGLE_NAMES.DURATION}
          title="Duration of the check"
          onToggle={handleToggle(TOGGLE_NAMES.DURATION)}
          initialOpen={toggleState[TOGGLE_NAMES.DURATION]}
        >
          <div className="py-4">
            <Slider
              min={0}
              max={1000}
              minDistance={40}
              value={values[FILTER_FIELDS.DURATION]}
              onChange={handleChange(FILTER_FIELDS.DURATION)}
            />
          </div>
        </TogglePanel>
        <TogglePanel
          id={TOGGLE_NAMES.BRANCH}
          title="Branch"
          onToggle={handleToggle(TOGGLE_NAMES.BRANCH)}
          initialOpen={toggleState[TOGGLE_NAMES.DURATION]}
        >
          <div css={styles.branch}>
            {branchNames.map((branch) => (
              <Checkbox
                key={branch}
                checked={values[FILTER_FIELDS.BRANCH][branch]}
                onChange={handleBranchChange(branch)}
                label={branch}
                className="mb-4"
              />
            ))}
          </div>
        </TogglePanel>
      </form>
    </Popover>
  )
}

export default Filter
