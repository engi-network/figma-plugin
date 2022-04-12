import cn from 'classnames'
import { ChangeEvent, useEffect, useState } from 'react'

import { randomString } from '~/app/lib/utils/string'

interface Props {
  className?: string
  containerClass?: string
  disabled?: boolean
  error?: string
  id?: string
  label?: string
  onChange: (value: string) => void
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
  error,
  containerClass,
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

  const classes = cn(
    'border text-sm rounded-lg block w-full p-2.5 disabled:text-wf-secondary',
    {
      'text-gray-900 border-wf-secondary focus:ring-wf-secondary focus:border-wf-secondary placeholder:text-text-secondary':
        !error,
    },
    {
      'border-red-500 text-red-600 placeholder:text-red-600 focus:ring-red-500 focus:border-red-500':
        !!error,
    },
    className,
  )

  const containerClassname = cn('flex flex-col relative w-full', containerClass)

  return (
    <div className={containerClassname}>
      {label && (
        <label className="text-sm text-primary-dark mb-2" htmlFor={inputId}>
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
        className={classes}
        placeholder={placeholder}
        {...rest}
      />
      {error && (
        <span className="text-red-600 text-xs absolute bottom-[-20px]">
          {error}
        </span>
      )}
    </div>
  )
}

export default Input
