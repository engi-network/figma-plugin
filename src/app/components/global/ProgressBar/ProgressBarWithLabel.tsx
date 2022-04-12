import ProgressBar, { ProgressBarProps } from './ProgressBar'

interface Props extends Omit<ProgressBarProps, 'label'> {
  rootClassName?: string
  title: string
}

function ProgressBarWithLabel({ title, percentage, ...rest }: Props) {
  return (
    <div className="flex justify-start items-center w-full">
      <label className="text-sm text-secondary-bg mr-6">{title}</label>
      <ProgressBar
        percentage={percentage}
        className="flex-1"
        {...rest}
        label={`${percentage}%`}
      />
    </div>
  )
}

export default ProgressBarWithLabel
