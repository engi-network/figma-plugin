interface Props {
  id: string
  label: string
  placeholder: string
  text: string
}

function TextWithLabel({ id, label, text, placeholder }: Props) {
  return (
    <div className="w-6/12 flex flex-col">
      <label className="text-sm text-primary-dark" htmlFor={id}>
        {label}
      </label>
      <p
        id="id"
        aria-readonly
        className="text-sm text-wf-tertiary min-h-[42px]  flex items-center"
      >
        {text || placeholder}
      </p>
    </div>
  )
}

export default TextWithLabel
