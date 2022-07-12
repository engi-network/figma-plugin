import { Tab } from '@headlessui/react'
import cn from 'classnames'
import { useState } from 'react'

import CodeBlock, { CodeBlockProps } from '../CodeBlock'
import styles from './CodeBlockWithTabs.styles'

interface Props extends Omit<CodeBlockProps, 'codeString'> {
  data: Array<{ codeString: string; tabLabel: string }>
  id?: string
}

function CodeBlockWithTabs({ showLineNumbers, className, data }: Props) {
  const [selectedTab, setSelectTab] = useState<number>(-1)
  const handleTabChange = (index: number) => {
    setSelectTab(index)
  }

  return (
    <div>
      <Tab.Group
        onChange={handleTabChange}
        selectedIndex={selectedTab}
        defaultIndex={1}
      >
        <Tab.List className="flex">
          {data.map(({ tabLabel }, index) => (
            <Tab
              key={`${tabLabel}_${index}`}
              className={({ selected }) =>
                cn(
                  selected ? 'bg-[#232323]' : 'bg-[#3e3e3e]',
                  'backdrop-blur-[4px]',
                )
              }
            >
              {({ selected }) => (
                <span
                  className={cn(
                    'text-xs font-medium py-1 px-3',
                    selected ? 'text-text-primary' : 'text-text-secondary',
                  )}
                >
                  {tabLabel}
                </span>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {data.map(({ codeString, tabLabel }, index) => (
            <Tab.Panel
              className={cn('focus:outline-none')}
              key={`${tabLabel}_${index}`}
            >
              <CodeBlock
                codeString={codeString}
                showLineNumbers={showLineNumbers}
                className={className}
                lineNumberStyle={styles.lineNumber}
                customStyle={styles.container}
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default CodeBlockWithTabs
