import { CheckIcon, MinusIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import { ChangeEvent, InputHTMLAttributes } from 'react'

interface Props // use custom on change
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  className?: string
  isDisabled?: boolean
  label?: string
  onChange?: (value?: boolean) => void
}

function Checkbox({
  checked,
  isDisabled = false,
  onChange,
  label,
  className,
  ...rest
}: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked
    !isDisabled && onChange && onChange(value)
  }

  const iconWrapperClass = cn(
    'relative flex-shrink-0 h-4 w-4 overflow-hidden',
    {
      'bg-primary-green': !isDisabled && checked,
      'opacity-50 bg-primary-green': !checked,
      'bg-red-500': isDisabled,
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
        {!isDisabled && checked && (
          <span aria-hidden>
            <CheckIcon className="w-4 h-4 text-[#140C36]" />
          </span>
        )}
        {isDisabled && (
          <span aria-hidden>
            <MinusIcon className="w-4 h-4 text-[#140C36]" />
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
