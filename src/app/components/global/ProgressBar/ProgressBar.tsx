export interface ProgressBarProps {
  className?: string
  label: string
  percentage: number
}

function ProgressBar({ percentage, label, className }: ProgressBarProps) {
  return (
    <div className={className}>
      <div className="w-full bg-primary-green bg-opacity-20">
        <div
          css={{ width: `${percentage}%`, transitionDuration: '0.3s' }}
          className="bg-primary-green text-xs font-medium text-secondary-bg text-center py-0.5 px-1.5 leading-none transition-[width]"
        >
          <label className="flex justify-center">{label}</label>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
