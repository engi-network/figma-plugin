import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid'

import { STATUS } from '../Table.types'

function CellStatus({ value }: { value: STATUS }) {
  if (value === STATUS.SUCCESS) {
    return <CheckCircleIcon className="w-6 h-6 text-primary-green" />
  }

  return <XCircleIcon className="w-6 h-6 text-secondary-error" />
}

export default CellStatus
