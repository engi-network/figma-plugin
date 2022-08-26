import { ComponentMeta, ComponentStory } from '@storybook/react'

import CodeBlock from './CodeBlock'

export default {
  component: CodeBlock,
  title: 'Global/Components/CodeBlock',
} as ComponentMeta<typeof CodeBlock>

const codeString = `const TestCompenent = () => {
    return <div>Test</div>
  }
`

const Template: ComponentStory<typeof CodeBlock> = (args) => (
  <div className="bg-slate-800 h-full p-10" id="code-block-test">
    <CodeBlock {...args} />
  </div>
)

export const CodeBlockStory = Template.bind({})
CodeBlockStory.args = {
  codeString,
  className: 'w-full h-20',
  showLineNumbers: true,
}
