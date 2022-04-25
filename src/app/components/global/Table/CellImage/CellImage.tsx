import styles from './CellImage.styles'
interface Props {
  value?: string
}

function CellImage({ value: imageUrl }: Props) {
  return (
    <div className="border border-primary-gray/30">
      {imageUrl && <img src={imageUrl} alt="frame image" css={styles.image} />}
    </div>
  )
}

export default CellImage
