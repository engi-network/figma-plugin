import cn from 'classnames'
import { ReactNode } from 'react'

interface StepRootProps {
  active: boolean
  children: ReactNode
  className?: string
  completed: boolean
  connector?: ReactNode
  disabled?: boolean
  last: boolean
  orientation: 'horizontal' | 'vertical'
  step?: number
}

function StepRoot({
  children,
  last,
  active,
  orientation,
  completed,
  connector,
  disabled,
}: StepRootProps) {
  const borderColor = completed
    ? 'border-primary-green'
    : 'border-primary-white/30'

  const bodyClasses = cn(
    { 'border-primary-green': active },
    `relative flex items-center justify-center rounded-full border ${borderColor}`,
    { 'bg-primary-green': active },
    { 'bg-primary-white/30': completed || disabled },
  )

  const isHorizontal = orientation === 'horizontal'

  const rootClasses = cn(
    'relative flex',
    {
      'flex-row': isHorizontal,
    },
    { 'flex-col': !isHorizontal },
    { 'max-w-20': !last && isHorizontal },
    { 'max-h-20': !last && !isHorizontal },
    { 'w-0': last && isHorizontal },
    { 'h-0': last && !isHorizontal },
  )

  const connectorClasses = cn(
    `border-[0.5px] ${borderColor}`,
    {
      'w-10 h-[1px]': isHorizontal,
    },
    {
      'h-10 w-[1px]': !isHorizontal,
    },
  )

  return (
    <div className={rootClasses}>
      <div className={bodyClasses}>{children}</div>
      {!last && !connector && (
        <div
          className="flex justify-center items-center flex-1"
          aria-hidden="true"
        >
          <div className={connectorClasses} />
        </div>
      )}
      {!last && connector && (
        <div
          className="flex justify-center items-center flex-1"
          aria-hidden="true"
        >
          {connector}
        </div>
      )}
    </div>
  )
}

export default StepRoot
