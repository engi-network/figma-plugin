import styles from './Button.styles'

interface ButtonProps {
  className?: string
  label: string
  onClick?: () => void
  primary?: boolean
  size?: 'small' | 'medium' | 'large'
}

function Button({
  primary = false,
  size = 'medium',
  className,
  label,
  ...props
}: ButtonProps) {
  const mode = primary ? styles.primary : styles.secondary

  return (
    <button
      type="button"
      css={[styles.button, styles[size], mode]}
      className={className}
      {...props}
    >
      {label}
    </button>
  )
}

export default Button
