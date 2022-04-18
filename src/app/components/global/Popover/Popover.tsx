import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import React, { Fragment, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  panelClassName?: string
  title: string
}

function CustomPopover({ title, children, className, panelClassName }: Props) {
  const rootClasses = cn('w-full max-w-sm px-4 fixed top-16', className)
  const panelClasses = cn(
    'px-6 overflow-hidden ring-1 ring-black ring-opacity-5 bg-[#23232333] backdrop-blur-[200px]',
    panelClassName,
  )

  return (
    <div className={rootClasses}>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={
                'text-text-primary group p-1 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
              }
            >
              <span className="text-sm">{title}</span>
              <ChevronDownIcon
                className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-text-primary group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-5 transform -translate-x-1/2 left-1/2">
                <div className={panelClasses}>{children}</div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

export default CustomPopover
