interface Props {
  value: {
    path: string
    story: string
  }
}

function CellName({ value: { path, story } }: Props) {
  return (
    <div className="w-full px-8 overflow-hidden">
      <h4 className="text-text-primary text-sm font-bold leading-6 overflow-hidden truncate">
        {story}
      </h4>
      <p className="m-0 text-text-secondary text-xs leading-6 overflow-hidden truncate">
        {path}
      </p>
    </div>
  )
}

export default CellName
