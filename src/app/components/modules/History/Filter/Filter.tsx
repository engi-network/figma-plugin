import { useState } from 'react'

import Checkbox from '~/app/components/global/Checkbox/Checkbox'
import Datepicker from '~/app/components/global/Datepicker/Datepicker'
import Popover from '~/app/components/global/Popover/Popover'
import Slider from '~/app/components/global/Slider/Slider'
import TogglePanel from '~/app/components/global/TogglePanel/TogglePanel'

import styles from './Filter.styles'

const DURATION_RANGE = [0, 60]

enum FILTER_FIELDS {
  CREATED_AFTER = 'createdAfter',
  CREATED_BEFORE = 'createdBefore',
  DURATION = 'duration',
  FAIL = 'fail',
  IN_PROGRESS = 'in_progress',
  SUCCESS = 'success',
}

interface FilterValues {
  [FILTER_FIELDS.SUCCESS]: boolean
  [FILTER_FIELDS.FAIL]: boolean
  [FILTER_FIELDS.IN_PROGRESS]: boolean
  [FILTER_FIELDS.CREATED_AFTER]: string
  [FILTER_FIELDS.CREATED_BEFORE]: string
  [FILTER_FIELDS.DURATION]: Array<number>
}
interface Props {
  title: string
}

const initialFilterState: FilterValues = {
  [FILTER_FIELDS.SUCCESS]: false,
  [FILTER_FIELDS.FAIL]: false,
  [FILTER_FIELDS.IN_PROGRESS]: false,
  [FILTER_FIELDS.CREATED_AFTER]: '',
  [FILTER_FIELDS.CREATED_BEFORE]: '',
  [FILTER_FIELDS.DURATION]: DURATION_RANGE,
}

/**
 *
 * @TODO making active panel's text-primary white otherwise text-secondary
 *
 */

function Filter({ title }: Props) {
  const [values, setValues] = useState<FilterValues>(initialFilterState)

  const handleChange =
    (fieldName: FILTER_FIELDS) => (value: boolean | string | Array<number>) => {
      setValues((prev) => ({
        ...prev,
        [fieldName]: value,
      }))
    }

  return (
    <Popover title={title} panelClassName="py-1">
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
