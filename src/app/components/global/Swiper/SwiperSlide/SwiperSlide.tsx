import { ReactNode } from 'react'

import styles from './SwiperSlide.styles'

interface Props {
  children: ReactNode
}

function SwiperSlide({ children }: Props) {
  return <div css={styles.slide}>{children}</div>
}

export default SwiperSlide
