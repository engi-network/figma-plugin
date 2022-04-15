import { Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import { ReactNode, useState } from 'react'

interface Props {
  children: ReactNode
  className?: string
  initialOpen?: boolean
  title: string
}

function TogglePanel({ title, initialOpen, children, className }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(!!initialOpen)

  const togglePanel = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className={className}>
      <div
        className="text-base text-primary-white flex justify-between"
        onClick={togglePanel}
      >
        <p>{title}</p>
        {isOpen ? (
          <ChevronUpIcon className="w-5 h-5" />
        ) : (
          <ChevronDownIcon className="w-5 h-5" />
        )}
      </div>
      <Transition
        show={isOpen}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="py-4 text-primary-white">{children}</div>
      </Transition>
    </div>
  )
}

export default TogglePanel
