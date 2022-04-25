function CellText({ value }: { value: string }) {
  return (
    <p className="text-sm text-text-primary w-full overflow-hidden truncate">
      {value}
    </p>
  )
}

export default CellText
