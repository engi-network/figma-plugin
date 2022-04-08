import { ReactNode } from 'react'

import { BUTTON_STYLE, DIRECTION } from '~/app/lib/constants'

import styles from './IconButton.styles'

interface Props {
  buttonStyle?: BUTTON_STYLE
  children?: ReactNode
  className?: string
  icon: ReactNode
  iconPosition?: DIRECTION
  id?: string
  onClick?: () => void
}

function IconButton({
  id,
  onClick,
  className,
  icon,
  buttonStyle = BUTTON_STYLE.SOLID,
  iconPosition = DIRECTION.LEFT,
  children,
  ...rest
}: Props) {
  const leftIcon = iconPosition === DIRECTION.LEFT && icon
  const rightIcon = iconPosition === DIRECTION.RIGHT && icon

  return (
    <button
      id={id}
      className={className}
      css={[styles.root, styles[buttonStyle]]}
      onClick={onClick}
      {...rest}
    >
      {leftIcon}
      {children && <span css={styles[iconPosition]}>{children}</span>}
      {rightIcon}
    </button>
  )
}

export default IconButton
