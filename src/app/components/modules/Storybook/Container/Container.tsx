import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

function Container({ children }: Props) {
  return (
    <div className="h-[100vh] w-full bg-slate-800 flex justify-center items-center container mx-auto p-10">
      {children}
    </div>
  )
}

export default Container
