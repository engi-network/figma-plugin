import cn from 'classnames'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

function StoryContainer({ children, className }: Props) {
  const rootClasses = cn(
    className,
    'h-[100vh] w-full bg-slate-800 flex justify-center items-center container mx-auto p-10',
  )

  return <div className={rootClasses}>{children}</div>
}

export default StoryContainer
