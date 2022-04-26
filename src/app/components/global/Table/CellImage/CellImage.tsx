import { useMemo } from 'react'

import { getPlaceholderImageUrl } from '~/app/lib/utils/string'

import styles from './CellImage.styles'

interface Props {
  value?: string
}

function CellImage({ value: imageUrl }: Props) {
  const placeholderImageUrl = useMemo(
    () => getPlaceholderImageUrl([134, 71]),
    [],
  )

  const src = imageUrl ? imageUrl : placeholderImageUrl

  return (
    <div className="border border-primary-gray/30 w-full h-[71px] overflow-hidden flex justify-start items-center min-h-[71px] max-h-[71px]">
      <img src={src} alt="frame image" css={styles.image} />
    </div>
  )
}

export default CellImage
