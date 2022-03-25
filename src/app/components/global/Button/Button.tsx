import { ReactNode } from 'react'

import { BUTTON_SIZE } from '~/app/lib/constants'

import styles from './Button.styles'

interface ButtonProps {
  backgroundColor?: string
  children: ReactNode
  className?: string
  label?: string
  onClick?: () => void
  primary?: boolean
  size?: BUTTON_SIZE
}

function Button({
  backgroundColor,
  primary = false,
  size = BUTTON_SIZE.MEDIUM,
  className,
  onClick,
  children,
  ...rest
}: ButtonProps) {
  const mode = primary ? styles.primary : styles.secondary

  return (
    <button
      type="button"
      css={[
        styles.button,
        styles[size],
        mode,
        backgroundColor && { background: backgroundColor },
      ]}
      className={className}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
