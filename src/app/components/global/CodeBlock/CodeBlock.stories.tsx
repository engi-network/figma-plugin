import { boolean } from '@storybook/addon-knobs'

import CodeBlock from './CodeBlock'

export default {
  component: CodeBlock,
  title: 'Global/Components/CodeBlock',
}

const codeString = `const TestCompenent = () => {
    return <div>Test</div>
  }
`
export function CodeBlockStory() {
  const showLineNumbers = boolean('Show lineNumber?', true)

  return (
    <div className="bg-slate-800 h-full p-10" id="code-block-test">
      <CodeBlock
        codeString={codeString}
        className={'w-full h-20'}
        showLineNumbers={showLineNumbers}
      />
    </div>
  )
}
