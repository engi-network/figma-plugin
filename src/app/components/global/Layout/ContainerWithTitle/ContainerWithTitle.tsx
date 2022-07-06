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
    'flex-1 relative border-primary-gray border-opacity-30',
    contentClassName,
  )

  return (
    <div css={[width && { width }]} className={rootClasses}>
      <div className="flex mb-6 justify-center items-center">
        <h2 className="text-2xl text-text-primary font-bold text-center">
          {title}
        </h2>
        {icon && (
          <div className="ml-3 bg-black/40 backdrop-blur-[4px] rounded-full flex justify-center items-center min-h-[32px] min-w-[32px]">
            {icon}
          </div>
        )}
      </div>
      <div className={contentClasses}>
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
