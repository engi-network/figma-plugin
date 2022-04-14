import cn from 'classnames'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  contentClassName?: string
  description?: string
  icon?: ReactNode
  title: string
  width?: number
}

function ContainerWithTitle({
  width,
  title,
  children,
  description,
  className,
  contentClassName,
  icon,
}: Props) {
  const rootClasses = cn(
    `flex flex-col h-full ${width ? 'w-full' : ''}`,
    className,
  )
  const contentClasses = cn(
    'flex-1 relative border-text-secondary border-opacity-30',
    contentClassName,
  )

  return (
    <div css={[width && { width }]} className={rootClasses}>
      <h2 className="text-2xl text-text-primary mb-6 font-bold text-center">
        {title}
      </h2>
      <div className={contentClasses}>
        {icon && <div className="absolute right-1 top-[-1]">{icon}</div>}
        {children}
        {description && (
          <label className="text-sm text-gray-400 text-center absolute -bottom-6 left-0 right-0">
            {description}
          </label>
        )}
      </div>
    </div>
  )
}

export default ContainerWithTitle
