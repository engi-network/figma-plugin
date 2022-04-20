import cn from 'classnames'
import { ChangeEvent } from 'react'

// import styles from './Datepicker.styles'

// import { CalendarIcon } from '~/app/components/global/Icons'

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
    'inline-flex items-center border border-text-primary border-opacity-30 py-2 px-4',
  )

  return (
    <div className={rootClasses}>
      <div className="relative">
        <input
          type="date"
          className="text-base text-text-primary border-none bg-transparent"
          value={value}
          // css={styles.input}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

export default Datepicker
