import { Tab } from '@headlessui/react'
import cn from 'classnames'
import { Children, ReactNode, useState } from 'react'

interface Props {
  children: ReactNode
  className?: string
  defaultIndex?: number
  onChange?: (index: number) => void
  tabLabels: Array<string>
}

function CustomTab({
  tabLabels,
  children,
  onChange,
  defaultIndex = 0,
  className,
}: Props) {
  const [selectedTab, setSelectTab] = useState<number>(-1)
  const handleTabChange = (index: number) => {
    onChange && onChange(index)
    setSelectTab(index)
  }

  const rootClasses = cn(className, 'w-full')

  return (
    <div className={rootClasses}>
      <Tab.Group
        onChange={handleTabChange}
        selectedIndex={selectedTab}
        defaultIndex={defaultIndex}
      >
        <Tab.List className="flex p-1 space-x-1 bg-primary-white/[0.14]">
          {tabLabels.map((label) => (
            <Tab
              key={label}
              className={({ selected }) =>
                cn(
                  'w-full py-2.5 text-sm leading-5 font-medium focus:outline-none',
                  selected
                    ? 'bg-primary-green text-secondary-bg'
                    : 'text-primary-white hover:bg-white/[0.12] hover:text-blue-100',
                )
              }
            >
              {label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4">
          {Children.map(children, (child, idx) => (
            <Tab.Panel key={idx} className={cn('focus:outline-none')}>
              {child}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default CustomTab
