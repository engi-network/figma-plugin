import { CheckIcon, FailIcon } from '~/app/components/global/Icons'
import { REPORT_STATUS } from '~/app/models/Report'

function CellStatus({ value }: { value: REPORT_STATUS }) {
  if (value === REPORT_STATUS.SUCCESS) {
    return <CheckIcon className="text-primary-green" width={20} height={20} />
  }

  return (
    <FailIcon className="w-6 h-6 text-secondary-error" width={20} height={20} />
  )
}

export default CellStatus
