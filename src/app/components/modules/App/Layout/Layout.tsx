import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

/**
 *
 * @TODO abstract with Global header and back button except Error screen
 *
 */

function Layout({ children }: Props) {
  return (
    <main className="flex flex-1 flex-col bg-landing bg-cover relative overflow-x-hidden">
      {children}
    </main>
  )
}

export default Layout
