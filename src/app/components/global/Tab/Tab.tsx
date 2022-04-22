import { Tab } from '@headlessui/react'
import cn from 'classnames'
import { Children, ReactNode } from 'react'

interface Props {
  children: ReactNode
  tabLabels: Array<string>
}

function CustomTab({ tabLabels, children }: Props) {
  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          {tabLabels.map((label) => (
            <Tab
              key={label}
              className={({ selected }) =>
                cn(
                  'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                )
              }
            >
              {label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Children.map(children, (child, idx) => (
            <Tab.Panel
              key={idx}
              className={cn(
                'bg-white rounded-xl p-3',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              )}
            >
              {child}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default CustomTab
