import { Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import { ReactNode, useState } from 'react'

import { CSSStylesProp } from '~/app/lib/constants'

interface Props {
  children: ReactNode
  className?: string
  customRootStyles?: CSSStylesProp
  initialOpen?: boolean
  panelClassName?: string
  title: string
}

function TogglePanel({
  title,
  initialOpen,
  children,
  className,
  customRootStyles,
  panelClassName,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(!!initialOpen)

  const togglePanel = () => {
    setIsOpen((prev) => !prev)
  }

  const rootClasses = cn('relative', className)
  const panelClasses = cn('text-primary-white', panelClassName)

  return (
    <div className={rootClasses} css={customRootStyles}>
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
