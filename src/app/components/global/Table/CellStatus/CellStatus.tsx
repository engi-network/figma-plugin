import { CheckIcon, FailIcon } from '~/app/components/global/Icons'
import { STATUS } from '~/app/models/Report'

function CellStatus({ value }: { value: STATUS }) {
  if (value === STATUS.SUCCESS) {
    return <CheckIcon className="text-primary-green" width={20} height={20} />
  }

  if (value === STATUS.FAIL) {
    return (
      <FailIcon
        className="w-6 h-6 text-secondary-error"
        width={20}
        height={20}
      />
    )
  }

  return null
}

export default CellStatus
