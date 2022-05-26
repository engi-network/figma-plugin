import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

interface Props {
  children
  className?: string
  href?: string
  onClick?: () => void
}

function LinkButton({ href, onClick, children, className }: Props) {
  const navigate = useNavigate()

  const handleClick = () => {
    href && navigate(href)
    onClick && onClick()
  }

  const textClasses = cn(
    className,
    'text-xs font-medium text-text-primary underline',
  )

  return (
    <button onClick={handleClick}>
      <span className={textClasses}>{children}</span>
    </button>
  )
}

export default LinkButton
