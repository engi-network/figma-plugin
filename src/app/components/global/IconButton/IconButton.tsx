import { ReactNode } from 'react'

import { BUTTON_STYLE } from '~/app/lib/constants'

import styles from './IconButton.styles'

interface Props {
  buttonStyle?: BUTTON_STYLE
  children?: ReactNode
  className?: string
  icon: ReactNode
  id?: string
  onClick?: () => void
}

function IconButton({
  id,
  onClick,
  className,
  icon,
  buttonStyle = BUTTON_STYLE.SOLID,
  children,
  ...rest
}: Props) {
  return (
    <button
      id={id}
      className={className}
      css={[styles.root, styles[buttonStyle]]}
      onClick={onClick}
      {...rest}
    >
      {icon}
      {children && <span css={styles.text}>{children}</span>}
    </button>
  )
}

export default IconButton
