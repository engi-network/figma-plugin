import { useState } from 'react'

import Checkbox from '~/app/components/global/Checkbox/Checkbox'
import Popover from '~/app/components/global/Popover/Popover'
import TogglePanel from '~/app/components/global/TogglePanel/TogglePanel'

import styles from './Filter.styles'

enum FILTER_FIELDS {
  FAIL = 'fail',
  IN_PROGRESS = 'in_progress',
  SUCCESS = 'success',
}

interface FilterValues {
  [FILTER_FIELDS.SUCCESS]: boolean
  [FILTER_FIELDS.FAIL]: boolean
  [FILTER_FIELDS.IN_PROGRESS]: boolean
}
interface Props {
  title: string
}

const initialFilterState: FilterValues = {
  [FILTER_FIELDS.SUCCESS]: false,
  [FILTER_FIELDS.FAIL]: false,
  [FILTER_FIELDS.IN_PROGRESS]: false,
}

/**
 *
 * @TODO making active panel's text-primary white otherwise text-secondary
 *
 */

function Filter({ title }: Props) {
  const [values, setValues] = useState<FilterValues>(initialFilterState)

  const handleChange =
    (fieldName: FILTER_FIELDS) => (value: boolean | undefined) => {
      setValues((prev) => ({
        ...prev,
        [fieldName]: !!value,
      }))
    }

  return (
    <Popover title={title}>
      <form>
        <TogglePanel
          title="Сomparison & status"
          customRootStyles={styles.togglePanel}
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
        <TogglePanel title="Date created" customRootStyles={styles.togglePanel}>
          <div>Date</div>
        </TogglePanel>
      </form>
    </Popover>
  )
}

export default Filter
