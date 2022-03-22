import { ReactNode } from 'react'

import styles from './IconButton.styles'

interface Props {
  className?: string
  id?: string
  onClick?: () => void
  renderIcon: () => ReactNode
}

function IconButton({ id, onClick, className, renderIcon, ...rest }: Props) {
  return (
    <button
      id={id}
      css={styles.root}
      className={className}
      onClick={onClick}
      {...rest}
    >
      {renderIcon()}
    </button>
  )
}

export default IconButton
