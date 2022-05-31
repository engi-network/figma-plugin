import cn from 'classnames'
import { ReactNode } from 'react'

interface StepRootProps {
  active: boolean
  children: ReactNode
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
}: StepRootProps) {
  const borderColor = completed ? 'border-primary-green' : 'border-[ffffff4d]'

  const bodyClasses = cn(
    { 'border-primary-green': active },
    `relative flex items-center justify-center rounded-full p-2 border ${borderColor}`,
    { 'bg-primary-green': active },
  )

  const isHorizontal = orientation === 'horizontal'

  const rootClasses = cn(
    'relative flex',
    {
      'flex-row': isHorizontal,
    },
    { 'flex-col': !isHorizontal },
    { 'w-20': !last && isHorizontal },
    { 'h-20': !last && !isHorizontal },
    { 'w-0': last && isHorizontal },
    { 'h-0': last && !isHorizontal },
  )

  const connectorClasses = cn(
    `border-[0.5px] ${borderColor}`,
    {
      'w-full h-[1px]': isHorizontal,
    },
    {
      'h-full w-[1px]': !isHorizontal,
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
