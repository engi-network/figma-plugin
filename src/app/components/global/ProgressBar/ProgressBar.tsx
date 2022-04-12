export interface ProgressBarProps {
  className?: string
  label: string
  percentage: number
  progressMinWidth?: number
}

function ProgressBar({
  percentage,
  label,
  className,
  progressMinWidth,
}: ProgressBarProps) {
  const innerBarStyles = {
    width: `${percentage}%`,
    transitionDuration: '0.3s',
    minWidth: progressMinWidth ? progressMinWidth : undefined,
    maxWidth: '100%',
  }

  return (
    <div className={className}>
      <div className="w-full bg-primary-green bg-opacity-20">
        <div
          css={innerBarStyles}
          className="bg-primary-green text-xs font-medium text-secondary-bg text-center py-0.5 px-1.5 leading-none transition-[width]"
        >
          <label className="flex justify-center">{label}</label>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
