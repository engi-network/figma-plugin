import { CheckIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import { ChangeEvent, InputHTMLAttributes } from 'react'

interface Props // use custom on change
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  className?: string
  isDisabled?: boolean
  label?: string
  onChange?: (value: boolean | string) => void
  toggleValues?: [string, string]
}

function Checkbox({
  checked,
  isDisabled = false,
  onChange,
  label,
  className,
  toggleValues,
  ...rest
}: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked
    if (toggleValues) {
      !isDisabled &&
        onChange &&
        onChange(value ? toggleValues[0] : toggleValues[1])
    } else {
      !isDisabled && onChange && onChange(value)
    }
  }

  const iconWrapperClass = cn(
    'relative flex-shrink-0 h-4 w-4 overflow-hidden',
    {
      'bg-primary-green': !isDisabled && checked,
      'bg-primary-white bg-opacity-20 border border-primary-white border-opacitiy-60':
        !checked,
      'opacity-50': isDisabled,
    },
  )

  const rootClasses = cn('flex items-center', className)

  return (
    <label className={rootClasses}>
      <input
        className="appearance-none opacity-0 disabled:pointer-events-none"
        aria-checked={checked}
        aria-disabled={isDisabled}
        onChange={handleChange}
        type="checkbox"
        {...rest}
      />
      <span className={iconWrapperClass}>
        {checked && (
          <span aria-hidden>
            <CheckIcon className="w-4 h-4 text-primary-dark" />
          </span>
        )}
      </span>
      {label && (
        <span className="ml-3 text-base text-text-primary">{label}</span>
      )}
    </label>
  )
}

export default Checkbox
