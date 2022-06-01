interface Props {
  className?: string
  subtitle?: string
  title: string
}

function TableHeader({ title, subtitle, className }: Props) {
  return (
    <div className={className}>
      <div className="text-text-primary text-xs font-medium">{title}</div>
      {subtitle && (
        <div className="text-text-secondary text-xs">{subtitle}</div>
      )}
    </div>
  )
}

export default TableHeader
