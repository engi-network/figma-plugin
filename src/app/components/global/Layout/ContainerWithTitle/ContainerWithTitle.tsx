import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  description?: string
  title: string
  width?: number
}

function ContainerWithTitle({ width, title, children, description }: Props) {
  return (
    <div
      className={`flex flex-col h-full ${width ? `w-[${width}px]` : 'w-full'}`}
    >
      <h2 className="text-2xl text-black mb-6 font-bold text-center">
        {title}
      </h2>
      <div className="px-10 pt-8 flex-1">{children}</div>
      {description && (
        <label className="text-base text-gray-400 text-center absolute -bottom-8 left-0 right-0">
          {description}
        </label>
      )}
    </div>
  )
}

export default ContainerWithTitle
