interface Props {
  imageUrl?: string
}

function CellImage({ imageUrl }: Props) {
  return <div>{imageUrl && <img src={imageUrl} alt="frame image" />}</div>
}

export default CellImage
