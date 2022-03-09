import styles from './Button.styles'

interface ButtonProps {
  backgroundColor?: string
  label: string
  onClick?: () => void
  primary?: boolean
  size?: 'small' | 'medium' | 'large'
}

function Button({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) {
  const mode = primary ? styles.primary : styles.secondary

  return (
    <button
      type="button"
      css={[styles.button, styles[size], mode]}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  )
}

export default Button
