import ProgressBar, { ProgressBarProps } from './ProgressBar'

interface Props extends ProgressBarProps {
  title: string
}

function ProgressBarWithLabel({ title, ...rest }: Props) {
  return (
    <div className="flex justify-start items-center w-full">
      <label className="text-sm text-secondary-bg mr-6">{title}</label>
      <ProgressBar className="flex-1" {...rest} />
    </div>
  )
}

export default ProgressBarWithLabel
