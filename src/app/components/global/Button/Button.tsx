import { ReactNode } from 'react'

import {
  BUTTON_SIZE,
  BUTTON_STYLE,
  LINK_BUTTON_TYPE,
  LINK_TYPE,
  LINK_TYPES,
} from '~/app/lib/constants'

import styles from './Button.styles'

interface Props {
  as?: LINK_TYPE
  backgroundColor?: string
  buttonStyle?: BUTTON_STYLE
  children: ReactNode
  className?: string
  disabled?: boolean
  label?: string
  onClick?: () => void
  primary?: boolean
  rel?: string
  size?: BUTTON_SIZE
  target?: string
  type?: 'button' | 'reset' | 'submit'
}

export interface AnchorProps extends Props {
  href: string
}

export interface ButtonElementProps extends Props {
  type?: LINK_BUTTON_TYPE
}

export type ButtonProps = AnchorProps | ButtonElementProps

function Button({
  backgroundColor,
  primary = false,
  size = BUTTON_SIZE.MEDIUM,
  className,
  onClick,
  children,
  disabled,
  type,
  as = LINK_TYPES.BUTTON,
  rel,
  ...rest
}: ButtonProps) {
  const mode = primary ? styles.primary : styles.secondary

  const isAnchor = as === LINK_TYPES.A

  const buttonStyles = [
    styles.button,
    styles[size],
    mode,
    disabled && styles.disabled,
    backgroundColor && { background: backgroundColor },
  ]

  if (isAnchor && 'href' in rest) {
    return (
      <a css={buttonStyles} {...rest} rel={rel} className={className}>
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      role="button"
      css={buttonStyles}
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
