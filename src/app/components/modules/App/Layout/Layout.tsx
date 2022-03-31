import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

function Layout({ children }: Props) {
  return <main className="flex flex-1 flex-col">{children}</main>
}

export default Layout
