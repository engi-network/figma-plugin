import { XIcon } from '@heroicons/react/solid'

import Modal from '~/app/components/global/Modal/Modal'
import { DetailModalRowProps } from '~/app/components/pages/ResultPage/DetailModal/DetailModal'
import { convertUnixToDate } from '~/app/lib/utils/time'
import { History } from '~/app/models/Report'

interface ErrorListModalProps {
  data: History
  isOpen: boolean
  onClose: () => void
  title: string
}

function ErrorRow({ label, value }: DetailModalRowProps) {
  return (
    <div className="flex justify-between mb-4 last:mb-0 border-b border-white border-opacity-30 px-4 py-2">
      <p className="text-base text-primary-white">{label}</p>
      <p className="text-base text-primary-white">{value}</p>
    </div>
  )
}

function ErrorListModal({ data, isOpen, onClose, title }: ErrorListModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-9 bg-secondary-bg/80">
        <div className="flex justify-between">
          <h2 className="text-4xl text-primary-green font-bold text-left">
            {title}
          </h2>
          <button onClick={onClose} className="">
            <XIcon className="w-5 h-5 text-primary-white" />
          </button>
        </div>
        <div className="mt-6 max-h-48 overflow-y-scroll">
          {data.map(({ checkId, result }) => (
            <ErrorRow
              key={checkId}
              label={checkId}
              value={convertUnixToDate(result.created_at)}
            />
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default ErrorListModal
