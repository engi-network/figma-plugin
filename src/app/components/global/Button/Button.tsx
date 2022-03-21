import { ReactNode } from 'react'

import styles from './Button.styles'

enum BUTTON_SIZE {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
}
interface ButtonProps {
  children: ReactNode
  className?: string
  label?: string
  onClick?: () => void
  primary?: boolean
  size?: BUTTON_SIZE
}

function Button({
  primary = false,
  size = BUTTON_SIZE.MEDIUM,
  className,
  onClick,
  children,
  ...props
}: ButtonProps) {
  const mode = primary ? styles.primary : styles.secondary

  return (
    <button
      type="button"
      css={[styles.button, styles[size], mode]}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
