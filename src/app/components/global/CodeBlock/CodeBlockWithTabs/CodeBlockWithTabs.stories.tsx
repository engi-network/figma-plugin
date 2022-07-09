import { boolean } from '@storybook/addon-knobs'

import CodeBlockWithTabs from './CodeBlockWithTabs'

export default {
  component: CodeBlockWithTabs,
  title: 'Global/Components/CodeBlockWithTabs',
}

const codeString = `const TestCompenent = () => {
    return <div>Test</div>
  }
`
export function CodeBlockWithTabsStory() {
  const showLineNumbers = boolean('Show lineNumber?', true)

  const data = [
    { codeString, tabLabel: 'storybook.tsx' },
    { codeString, tabLabel: 'storybook.story.tsx' },
  ]

  return (
    <div className="bg-slate-700 h-full p-10">
      <CodeBlockWithTabs
        id="code-block-with-tabs"
        className={'w-full h-20 p-0 border-none'}
        showLineNumbers={showLineNumbers}
        data={data}
      />
    </div>
  )
}
