import cn from 'classnames'
import { ChangeEvent, useEffect, useState } from 'react'

import { randomString } from '~/app/lib/utils/string'

interface Props {
  className?: string
  disabled?: boolean
  id?: string
  label?: string
  onChange?: (value: string) => void
  placeholder?: string
  required?: boolean
  type?: string
  value?: string
}

function Input({
  id,
  onChange,
  value,
  disabled,
  label,
  required,
  type,
  className,
  placeholder,
  ...rest
}: Props) {
  const [inputId, setInputId] = useState(id)

  useEffect(() => {
    if (!id) {
      setInputId(`${randomString(10)}-input`)
    }
  }, [id])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    onChange(value)
  }

  const classname = cn(
    'border border-wf-tertiary text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
    className,
  )

  return (
    <span className="flex flex-col">
      {label && (
        <label className="text-sm text-wf-tertiary mb-4" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={id}
        disabled={disabled}
        onChange={handleChange}
        value={value}
        required={required}
        type={type}
        className={classname}
        placeholder={placeholder}
        {...rest}
      />
    </span>
  )
}

export default Input
