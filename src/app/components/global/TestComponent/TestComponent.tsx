import { Transition } from '@headlessui/react'
import { useState } from 'react'

function MyComponent() {
  const [isShowing, setIsShowing] = useState(false)

  return (
    <div>
      <button onClick={() => setIsShowing((isShowing) => !isShowing)}>
        Toggle
      </button>
      <Transition
        show={isShowing}
        enter="transition-all ease-in-out transform duration-1000"
        enterFrom="opacity-0 -translate-y-full"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all duration-1000"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-full"
      >
        <div css={{ width: 100, height: 100, background: 'blue' }}>
          I will fade in and out
        </div>
      </Transition>
    </div>
  )
}

export default MyComponent
