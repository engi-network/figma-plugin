import cn from 'classnames'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco'

import styles from './CodeBlock.styles'

SyntaxHighlighter.registerLanguage('javascript', js)

interface Props {
  className?: string
  codeString: string
}

function CodeBlock({ className, codeString }: Props) {
  const rootClasses = cn(
    className,
    'border border-primary-gray/30 overflow-hidden p-[10px]',
  )

  return (
    <div className={rootClasses}>
      <SyntaxHighlighter
        language="javascript"
        style={docco}
        wrapLines
        wrapLongLines
        customStyle={styles.highlighter}
        lineProps={(lineNumber) => {
          const style = {} as Record<string, string>
          if (lineNumber > 3) {
            style.display = 'none'
          }
          return { style }
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
