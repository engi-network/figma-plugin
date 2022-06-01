import { ReactNode } from 'react'

import {
  CameraIcon,
  CheckIcon,
  CompareIcon,
  FolderIcon,
  StorybookIcon,
  WrenchIcon,
} from '~/app/components/global/Icons'
import Step from '~/app/components/global/Stepper/Step/Step'
import Stepper from '~/app/components/global/Stepper/Stepper'

interface Props {
  activeStep: number
  className?: string
}

export const mapStepToIcon = (
  width: number,
  height: number,
): Record<string, ReactNode> => ({
  0: <FolderIcon width={width} height={height} />,
  1: <WrenchIcon width={width} height={height} />,
  2: <StorybookIcon width={width} height={height} />,
  3: <CameraIcon width={width} height={height} />,
  4: <CompareIcon width={width} height={height} />,
})

function StatusStepper({ activeStep, className }: Props) {
  const stepElement = (index: number, activeStep: number) => {
    const completed = index < activeStep
    const current = index === activeStep
    const disabled = index > activeStep

    return (
      <div>
        {completed && <CheckIcon width={14} height={14} />}
        {current && (
          <div className="w-5 h-5 flex justify-center items-center bg-white rounded-full">
            {mapStepToIcon(14, 14)[index]}
          </div>
        )}
        {disabled && <div className="w-3 h-3 rounded-full bg-[#ffffff4d]" />}
      </div>
    )
  }
  return (
    <div className={className}>
      <Stepper
        activeStep={activeStep}
        orientation="horizontal"
        connector={<div className="w-3" />}
      >
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Step key={index}>{stepElement(index, activeStep)}</Step>
          ))}
      </Stepper>
    </div>
  )
}

export default StatusStepper
