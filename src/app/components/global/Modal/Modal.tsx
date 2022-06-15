import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import { Fragment, ReactNode } from 'react'

interface Props {
  backButton?: ReactNode
  children: ReactNode
  className?: string
  hasCloseButton?: boolean
  isFullScreen?: boolean
  isOpen: boolean
  onClose: () => void
}

function Modal({
  isOpen,
  onClose,
  children,
  className,
  isFullScreen = false,
  hasCloseButton = false,
  backButton,
}: Props) {
  const rootClasses = cn(className, 'relative z-50')
  const contentWrapperClasses = cn('w-full transform transition-all', {
    'max-w-[650px]': !isFullScreen,
  })

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={rootClasses} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="flex min-h-full items-center justify-center p-4 text-center overflow-hidden">
              {backButton && backButton}
              <div className={contentWrapperClasses}>
                {hasCloseButton && (
                  <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-20"
                  >
                    <XIcon className="w-4 h-5 text-primary-white" />
                  </button>
                )}
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
