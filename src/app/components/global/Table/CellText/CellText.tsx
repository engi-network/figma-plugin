function CellText({ value }: { value: string }) {
  return (
    <p className="text-sm text-text-secondary w-full overflow-hidden truncate leading-6 text-right">
      {value}
    </p>
  )
}

export default CellText
