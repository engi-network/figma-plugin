import { ReactNode } from 'react'

interface StepperItemProps {
  children: ReactNode
}

function Step({ children }: StepperItemProps) {
  return <li>{children}</li>
}

export default Step
