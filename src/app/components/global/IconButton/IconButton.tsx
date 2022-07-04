import cn from 'classnames'
import { ReactNode } from 'react'

import {
  BUTTON_STYLE,
  DIRECTION,
  LINK_TYPE,
  LINK_TYPES,
} from '~/app/lib/constants'

import styles from './IconButton.styles'

interface Props {
  as?: LINK_TYPE
  buttonStyle?: BUTTON_STYLE
  children?: ReactNode
  className?: string
  href?: string
  icon: ReactNode
  iconPosition?: DIRECTION
  id?: string
  onClick?: () => void
  rel?: string
  target?: string
}

function IconButton({
  id,
  onClick,
  className,
  icon,
  buttonStyle = BUTTON_STYLE.SOLID,
  iconPosition = DIRECTION.LEFT,
  children,
  as = LINK_TYPES.BUTTON,
  rel,
  ...rest
}: Props) {
  const leftIcon = iconPosition === DIRECTION.LEFT && icon
  const rightIcon = iconPosition === DIRECTION.RIGHT && icon
  const btnClasses = cn('text-sm', className)

  const buttonStyles = [styles.root, styles[buttonStyle]]

  const isAnchor = as === LINK_TYPES.A

  if (isAnchor && 'href' in rest) {
    return (
      <a
        id={id}
        css={buttonStyles}
        rel={rel}
        className={btnClasses}
        data-testid={id}
        {...rest}
      >
        {leftIcon}
        {children && <span css={styles[iconPosition]}>{children}</span>}
        {rightIcon}
      </a>
    )
  }

  return (
    <button
      id={id}
      data-testid={id}
      className={btnClasses}
      css={buttonStyles}
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
