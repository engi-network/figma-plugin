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
  const rootClasses = cn(
    className,
    'flex jusitfy-center items-center p-2 relative',
  )
  const panelClasses = cn(
    panelClassName,
    'px-6 overflow-x-hidden max-h-[400px] overflow-y-scroll ring-1 ring-black ring-opacity-5 bg-[#23232333] backdrop-blur-[200px]',
  )

  return (
    <div className={rootClasses}>
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button
              className={
                'text-text-primary font-normal rounded-md inline-flex items-center text-base hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
              }
            >
              <span className="text-sm">{title}</span>
              <ChevronDownIcon
                className={`${open ? '' : 'text-opacity-70'}
                  ml-1 mt-1 h-4 w-4 text-text-primary`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-75"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 mt-4">
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
