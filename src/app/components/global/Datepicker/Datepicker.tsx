import cn from 'classnames'
import { ChangeEvent } from 'react'

interface Props {
  className?: string
  disabled?: boolean
  id?: string
  label?: string
  onChange?: (value: string) => void
  value?: string
}

function Datepicker({
  onChange,
  value,
  className,
  disabled,
  id,
  ...rest
}: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value)
  }

  const rootClasses = cn(
    className,
    'inline-flex items-center border border-text-primary border-opacity-30 py-2 px-4',
  )

  return (
    <div className={rootClasses} data-testid={id}>
      <div className="relative">
        <input
          id={id}
          type="date"
          className="text-base text-text-primary border-none bg-transparent"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          aria-label="datepicker"
          {...rest}
        />
      </div>
    </div>
  )
}

export default Datepicker
