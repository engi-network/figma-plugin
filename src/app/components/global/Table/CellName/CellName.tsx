interface Props {
  value: {
    path: string
    story: string
  }
}

function CellName({ value: { path, story } }: Props) {
  return (
    <div>
      <h4 className="text-text-primary font-bold leading-6">{story}</h4>
      <p className="m-0 text-text-secondary font-sm leading-6">{path}</p>
    </div>
  )
}

export default CellName
