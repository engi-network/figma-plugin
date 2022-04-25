import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid'

function CellStatus({ value }: { value: string }) {
  if (value === 'success') {
    return <CheckCircleIcon className="w-6 h-6 text-primary-green" />
  }

  return <XCircleIcon className="w-6 h-6 text-secondary-error" />
}

export default CellStatus
