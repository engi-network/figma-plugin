import cn from 'classnames'
import { ChangeEvent } from 'react'

import { CalendarIcon } from '~/app/components/global/Icons'

import styles from './Datepicker.styles'

interface Props {
  className?: string
  disabled?: boolean
  label?: string
  onChange?: (value: string) => void
  value?: string
}

function Datepicker({ onChange, value, className, disabled }: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value)
  }

  const rootClasses = cn(
    className,
    'inline-flex items-center relative border border-text-primary border-opacity-30 pl-5',
  )

  return (
    <span className={rootClasses}>
      <div className="flex items-center justify-center absolute left-4 h-full">
        <button
          className="inline-flex items-center justify-center select-none"
          tabIndex={0}
        >
          <CalendarIcon width={17} height={17} />
        </button>
      </div>
      <input
        type="date"
        className="text-base text-text-primary border-none pl-5 p-4 bg-transparent"
        value={value}
        css={styles.input}
        onChange={handleChange}
        disabled={disabled}
      />
    </span>
  )
}

export default Datepicker
