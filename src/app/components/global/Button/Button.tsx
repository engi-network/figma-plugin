import { ReactNode } from 'react'

import { BUTTON_SIZE, BUTTON_STYLE } from '~/app/lib/constants'

import styles from './Button.styles'

interface ButtonProps {
  backgroundColor?: string
  buttonStyle?: BUTTON_STYLE
  children: ReactNode
  className?: string
  disabled?: boolean
  label?: string
  onClick?: () => void
  primary?: boolean
  size?: BUTTON_SIZE
  type?: 'button' | 'reset' | 'submit'
}

function Button({
  backgroundColor,
  primary = false,
  size = BUTTON_SIZE.MEDIUM,
  className,
  onClick,
  children,
  disabled,
  type,
  ...rest
}: ButtonProps) {
  const mode = primary ? styles.primary : styles.secondary

  return (
    <button
      type={type}
      role="button"
      css={[
        styles.button,
        styles[size],
        mode,
        disabled && styles.disabled,
        backgroundColor && { background: backgroundColor },
      ]}
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
