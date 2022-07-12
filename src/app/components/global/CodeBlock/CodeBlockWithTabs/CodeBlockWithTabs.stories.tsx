import { boolean } from '@storybook/addon-knobs'

import CodeBlockWithTabs from './CodeBlockWithTabs'

export default {
  component: CodeBlockWithTabs,
  title: 'Global/Components/CodeBlockWithTabs',
}

const codeString = `import { action } from '@storybook/addon-actions'\nimport { boolean, select, text } from '@storybook/addon-knobs'\n\nimport Button from './Button'\n\n",
name: 'layer name`

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
