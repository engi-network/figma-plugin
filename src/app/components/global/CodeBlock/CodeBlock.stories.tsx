import CodeBlock from './CodeBlock'

export default {
  component: CodeBlock,
  title: 'Global/Components/CodeBlock',
}

const codeString = `
  function Button({
    backgroundColor,
    primary = false,
    size = BUTTON_SIZE.MEDIUM,
    className,
    onClick,
    children,
    disabled,
    ...rest
  }: ButtonProps) {
    const mode = primary ? styles.primary : styles.secondary

    return (
      <button
        type="button"
        css={[
          styles.button,
          styles[size],
          mode,
          disabled && styles.disabled,
          backgroundColor && { background: backgroundColor },
        ]}
        className={className}
        onClick={onClick}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    )
  }
`
export function CodeBlockStory() {
  return (
    <div className="bg-slate-800 h-full p-10">
      <CodeBlock codeString={codeString} className={'w-36 h-20'} />
    </div>
  )
}
