import cn from 'classnames'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  contentClassName?: string
  description?: string
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
}: Props) {
  const rootClasses = cn(
    `flex flex-col h-full ${width ? 'w-full' : ''}`,
    className,
  )
  const contentClasses = cn(
    'flex-1 relative  border-wf-tertiery',
    contentClassName,
  )

  return (
    <div css={[width && { width }]} className={rootClasses}>
      <h2 className="text-2xl text-black mb-6 font-bold text-center">
        {title}
      </h2>
      <div className={contentClasses}>{children}</div>
      {description && (
        <label className="text-base text-gray-400 text-center absolute -bottom-8 left-0 right-0">
          {description}
        </label>
      )}
    </div>
  )
}

export default ContainerWithTitle
