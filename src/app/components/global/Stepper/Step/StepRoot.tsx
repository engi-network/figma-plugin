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
  const bodyClasses = cn(
    'relative flex items-center justify-center rounded-full border',
    { 'border-primary-orange bg-primary-white': active },
    { 'border-primary-green bg-primary-green': completed },
    { 'border-none bg-primary-white/30': disabled },
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
  )

  const connectorClasses = cn(
    'border-[1px]',
    { 'border-primary-green': completed },
    { 'border-primary-white/30': !completed },
    {
      'w-6 h-[1px]': isHorizontal,
    },
    {
      'h-6 w-[1px]': !isHorizontal,
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
