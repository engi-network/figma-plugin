import { ReactNode } from 'react'

import { BUTTON_STYLE } from '~/app/lib/constants'

import styles from './IconButton.styles'

interface Props {
  buttonStyle?: BUTTON_STYLE
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
    </button>
  )
}

export default IconButton
