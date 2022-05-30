import {
  CheckIcon,
  FailIcon,
  ProgressIcon,
} from '~/app/components/global/Icons'
import { STATUS } from '~/app/models/Report'

function CellStatus({ value }: { value: STATUS }) {
  if (value === STATUS.SUCCESS) {
    return <CheckIcon className="text-primary-green" width={23} height={23} />
  }

  if (value === STATUS.FAIL) {
    return (
      <FailIcon
        className="w-6 h-6 text-secondary-error"
        width={24}
        height={24}
      />
    )
  }

  return <ProgressIcon className="text-primary-orange" width={24} height={24} />
}

export default CellStatus
