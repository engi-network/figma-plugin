import { ReactNode } from 'react'

// import Header from '~/app/components/global/Header/Header'

interface Props {
  children: ReactNode
}

function Layout({ children }: Props) {
  return <main className="flex flex-1 flex-col">{children}</main>
}

export default Layout
