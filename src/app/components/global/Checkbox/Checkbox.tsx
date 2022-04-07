import { CheckIcon, MinusIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import { ChangeEvent, InputHTMLAttributes } from 'react'

interface Props // use custom on change
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  isDisabled?: boolean
  onChange?: (value?: boolean) => void
}

function Checkbox({ checked, isDisabled = false, onChange, ...rest }: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked
    !isDisabled && onChange && onChange(value)
  }

  const iconWrapperClass = cn(
    'relative flex-shrink-0 h-4 w-4 overflow-hidden rounded',
    {
      'bg-primary-blue': !isDisabled && checked,
      'opacity-50 bg-primary-blue': !checked,
      'bg-red-500': isDisabled,
    },
  )

  return (
    <label className="flex">
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
            <CheckIcon className="w-4 h-4 text-wf-light" />
          </span>
        )}
        {isDisabled && (
          <span aria-hidden>
            <MinusIcon className="w-4 h-4 text-wf-light" />
          </span>
        )}
      </span>
    </label>
  )
}

export default Checkbox
