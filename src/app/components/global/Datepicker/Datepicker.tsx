import { CalendarIcon } from '~/app/components/global/Icons'

import styles from './Datepicker.styles'

function Datepicker() {
  return (
    <span className="inline-flex items-center relative cursor-text border border-text-primary border-opacity-30 pl-5">
      <div className="flex items-center justify-center">
        <button
          className="inline-flex items-center justify-center cursor-pointer select-none relative z-0"
          tabIndex={0}
        >
          <CalendarIcon width={16} height={16} />
        </button>
      </div>
      <input
        type="date"
        className="text-base text-text-primary border-none p-4 bg-transparent"
        css={styles.input}
      />
    </span>
  )
}

export default Datepicker
