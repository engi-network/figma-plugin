import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid'

import { ProgressIcon } from '~/app/components/global/Icons'

import { STATUS } from '../Table.types'

function CellStatus({ value }: { value: STATUS }) {
  if (value === STATUS.SUCCESS) {
    return <CheckCircleIcon className="w-6 h-6 text-primary-green" />
  }

  if (value === STATUS.FAIL) {
    return <XCircleIcon className="w-6 h-6 text-secondary-error" />
  }

  return <ProgressIcon className="text-primary-orange" width={20} height={20} />
}

export default CellStatus
