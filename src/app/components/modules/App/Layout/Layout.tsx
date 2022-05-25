import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

function Layout({ children }: Props) {
  return (
    <main className="flex flex-1 flex-col bg-landing bg-cover relative">
      {children}
    </main>
  )
}

export default Layout
