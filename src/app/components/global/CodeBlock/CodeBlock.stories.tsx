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
  return (
    <div className="bg-slate-800 h-full p-10">
      <CodeBlock codeString={codeString} className={'w-36 h-20'} />
    </div>
  )
}
