import { Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import { ReactNode, useState } from 'react'

import { CSSStylesProp } from '~/app/lib/constants'

interface Props {
  children: ReactNode
  className?: string
  customRootStyles?: CSSStylesProp
  id?: string
  initialOpen?: boolean
  onToggle?: (state: boolean) => void
  panelClassName?: string
  title: string
}

function TogglePanel({
  id,
  title,
  initialOpen,
  children,
  className,
  customRootStyles,
  panelClassName,
  onToggle,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(!!initialOpen)

  const togglePanel = () => {
    setIsOpen((prev) => !prev)
    onToggle && onToggle(!isOpen)
  }

  const rootClasses = cn(className, 'relative py-4')
  const panelClasses = cn(panelClassName, 'text-primary-white pt-4')

  return (
    <div className={rootClasses} css={customRootStyles} id={id}>
      <div
        className="text-base text-primary-white flex justify-between cursor-pointer"
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
        <div className={panelClasses}>{children}</div>
      </Transition>
    </div>
  )
}

export default TogglePanel
