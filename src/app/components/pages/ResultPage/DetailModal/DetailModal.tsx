import { XIcon } from '@heroicons/react/solid'
import { format } from 'date-fns'

import Modal from '~/app/components/global/Modal/Modal'
import { DetailedReport, ReportResult } from '~/app/models/Report'

interface Props {
  data: DetailedReport
  isOpen: boolean
  onClose: () => void
  title: string
}

interface RowProps {
  label: string
  value: string
}

function Row({ label, value }: RowProps) {
  return (
    <div className="flex justify-between mb-4 last:mb-0">
      <p className="text-base text-primary-white">{label}</p>
      <p className="text-base text-primary-white">{value}</p>
    </div>
  )
}

function DetailModal({ title, isOpen, onClose, data }: Props) {
  const { result } = data
  const { created_at, completed_at } = result as ReportResult

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
        <div className="mt-6">
          <h5 className="font-bold text-xl text-primary-white mb-4 text-left">
            Size of codebase
          </h5>
          <Row label="Codebase name" value="3826gb" />
        </div>
        <div className="mt-12">
          <h5 className="font-bold text-xl text-primary-white mb-4 text-left">
            History
          </h5>
          <div>
            <Row label="Started" value={format(created_at, 'MM.dd.yyyy')} />
            <Row label="Completed" value={format(completed_at, 'MM.dd.yyyy')} />
            <Row
              label="Capturing screenshots"
              value={format(completed_at, 'MM.dd.yyyy')}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DetailModal
