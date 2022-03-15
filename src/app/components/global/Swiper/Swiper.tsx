import { ReactNode } from 'react'

import styles from './Swiper.styles'

interface Props {
  children: ReactNode
}

function Swiper({ children }: Props) {
  return (
    <div css={styles.root}>
      <div css={styles.swiper}>{children}</div>
    </div>
  )
}

export default Swiper
