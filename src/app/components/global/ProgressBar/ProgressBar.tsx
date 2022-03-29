interface Props {
  label: string
  percentage: number
}

function ProgressBar({ percentage, label }: Props) {
  return (
    <div>
      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          css={{ width: `${percentage}%` }}
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        >
          {label}
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
