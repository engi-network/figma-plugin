import cn from 'classnames'
import {
  Light as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import styles from './CodeBlock.styles'

SyntaxHighlighter.registerLanguage('javascript', js)

export interface CodeBlockProps extends SyntaxHighlighterProps {
  className?: string
  codeString: string
  showLineNumbers?: boolean
}

function CodeBlock({
  className,
  codeString,
  showLineNumbers,
  customStyle,
  ...rest
}: CodeBlockProps) {
  const rootClasses = cn(
    className,
    'border border-primary-gray/30 overflow-hidden p-[10px]',
  )

  return (
    <div className={rootClasses}>
      <SyntaxHighlighter
        language="javascript"
        style={atomOneDark}
        wrapLines
        // wrapLongLines
        showLineNumbers={showLineNumbers}
        customStyle={{ ...styles.highlighter, ...customStyle }}
        lineProps={(lineNumber) => {
          const style = {} as Record<string, string>
          if (lineNumber > 3) {
            style.display = 'none'
          }
          return { style }
        }}
        {...rest}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
