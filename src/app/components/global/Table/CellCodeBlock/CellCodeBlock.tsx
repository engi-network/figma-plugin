import CodeBlock from '~/app/components/global/CodeBlock/CodeBlock'

function CellCodeBlock({ value }: { value: string }) {
  let codeString = value
  if (!value) {
    codeString = 'No code snippet!'
  }
  return <CodeBlock codeString={codeString} className="h-full w-full" />
}

export default CellCodeBlock
