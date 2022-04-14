interface Props {
  id: string
  label: string
  placeholder: string
  text: string
}

function TextWithLabel({ id, label, text, placeholder }: Props) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-text-primary" htmlFor={id}>
        {label}
      </label>
      <p
        id={id}
        aria-readonly
        className="text-sm text-text-secondary leading-[42px] overflow-hidden truncate"
      >
        {text || placeholder}
      </p>
    </div>
  )
}

export default TextWithLabel
