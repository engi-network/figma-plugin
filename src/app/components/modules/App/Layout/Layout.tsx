import { ReactNode } from 'react'

import Header from '~/app/components/global/Header/Header'

interface Props {
  children: ReactNode
}

function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col p-10">{children}</main>
    </>
  )
}

export default Layout
