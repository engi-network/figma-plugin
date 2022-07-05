import { Tab } from '@headlessui/react'
import cn from 'classnames'
import { useState } from 'react'

import CodeBlock, { CodeBlockProps } from '../CodeBlock'
import styles from './CodeBlockWithTabs.styles'

interface Props extends CodeBlockProps {
  id: string
}

function CodeBlockWithTabs({ codeString, showLineNumbers, className }: Props) {
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
        <Tab.List>
          <Tab
            className={({ selected }) =>
              cn(
                selected ? 'bg-[#253520]' : 'bg-[#404040]',
                'backdrop-blur-[4px]',
              )
            }
          >
            <span>StoryBook.tsx</span>
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className={cn('focus:outline-none')}>
            <CodeBlock
              codeString={codeString}
              showLineNumbers={showLineNumbers}
              className={className}
              lineNumberStyle={styles.lineNumber}
              customStyle={styles.container}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default CodeBlockWithTabs
