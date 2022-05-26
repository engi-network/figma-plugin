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

  const textClasses = cn('text-xs font-medium text-text-primary underline')
  const btnClasses = cn(className, 'inline-flex')

  return (
    <button onClick={handleClick} className={btnClasses}>
      <span className={textClasses}>{children}</span>
    </button>
  )
}

export default LinkButton
