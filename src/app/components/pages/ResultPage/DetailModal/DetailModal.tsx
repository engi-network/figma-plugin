import { XIcon } from '@heroicons/react/solid'

import Modal from '~/app/components/global/Modal/Modal'
import { formatFileSize } from '~/app/lib/utils/string'
import { convertUnixToDate } from '~/app/lib/utils/time'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { Report, ReportResult } from '~/app/models/Report'

interface Props {
  data: Report
  isOpen: boolean
  onClose: () => void
  title: string
}

export interface DetailModalRowProps {
  label: string
  value: string | null
}

function Row({ label, value }: DetailModalRowProps) {
  return (
    <div className="flex justify-between mb-4 last:mb-0">
      <p className="text-base text-primary-white">{label}</p>
      <p className="text-base text-primary-white">{value}</p>
    </div>
  )
}

function DetailModal({ title, isOpen, onClose, data }: Props) {
  const { result } = data
  const {
    created_at,
    completed_at,
    repository,
    code_size = 0,
  } = result as ReportResult

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
            {ui('result.detailModal.size')}
          </h5>
          <Row label={repository} value={formatFileSize(code_size)} />
        </div>
        <div className="mt-12">
          <h5 className="font-bold text-xl text-primary-white mb-4 text-left">
            {ui('result.detailModal.history')}
          </h5>
          <div>
            <Row label="Started" value={convertUnixToDate(created_at)} />
            <Row label="Completed" value={convertUnixToDate(completed_at)} />
            <Row
              label="Capturing screenshots"
              value={convertUnixToDate(completed_at)}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DetailModal
