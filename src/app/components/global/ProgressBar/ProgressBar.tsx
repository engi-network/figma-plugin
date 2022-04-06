interface Props {
  className?: string
  label: string
  percentage: number
}

function ProgressBar({ percentage, label, className }: Props) {
  return (
    <div className={className}>
      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          css={{ width: `${percentage}%`, transitionDuration: '0.3s' }}
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-2 transition-[width]"
        />
      </div>
      <label className="flex justify-center">{label}</label>
    </div>
  )
}

export default ProgressBar
