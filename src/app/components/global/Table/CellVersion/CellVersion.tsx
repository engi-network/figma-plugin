interface Props {
  value: {
    branch: string
    commit: string
  }
}

function CellVersion({ value: { commit, branch } }: Props) {
  return (
    <div className="w-full overflow-hidden">
      <h4 className="text-text-primary text-sm font-bold leading-6 overflow-hidden truncate">
        {branch}
      </h4>
      <p className="m-0 text-text-secondary text-xs leading-6 overflow-hidden truncate">
        {commit}
      </p>
    </div>
  )
}

export default CellVersion
