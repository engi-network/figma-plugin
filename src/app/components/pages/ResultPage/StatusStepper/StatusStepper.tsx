import cn from 'classnames'
import { ReactNode } from 'react'

import {
  CameraIcon,
  CheckIcon,
  CompareIcon,
  FolderIcon,
  StorybookIcon,
  UploadDesignIcon,
  WrenchIcon,
} from '~/app/components/global/Icons'
import Step from '~/app/components/global/Stepper/Step/Step'
import Stepper from '~/app/components/global/Stepper/Stepper'
import Tooltip from '~/app/components/global/Tooltip/Tooltip'

interface Props {
  activeStep: number
  className?: string
  stepMessage?: string
}

export const mapStepToIcon = (
  width: number,
  height: number,
): Record<string, ReactNode> => ({
  0: <UploadDesignIcon width={width} height={height} />,
  1: <FolderIcon width={width} height={height} />,
  2: <WrenchIcon width={width} height={height} />,
  3: <StorybookIcon width={width} height={height} />,
  4: <CameraIcon width={width} height={height} />,
  5: <CompareIcon width={width} height={height} />,
})

function StatusStepper({ activeStep, className, stepMessage }: Props) {
  const stepElement = (index: number, activeStep: number) => {
    const completed = index < activeStep
    const current = index === activeStep
    const disabled = index > activeStep

    return (
      <Tooltip content="Tooltip" tooltipOffset={12} placement="top">
        <div>
          {completed && <CheckIcon width={14} height={14} />}
          {current && (
            <div className="w-5 h-5 flex justify-center items-center bg-white rounded-full">
              {mapStepToIcon(14, 14)[index]}
            </div>
          )}
          {disabled && <div className="w-3 h-3 rounded-full bg-[#ffffff4d]" />}
        </div>
      </Tooltip>
    )
  }

  const rootClasses = cn(
    className,
    'flex flex-col items-center justify-center gap-2',
  )
  return (
    <div className={rootClasses}>
      <Stepper
        activeStep={activeStep}
        orientation="horizontal"
        connector={<div className="w-3" />}
      >
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <Step key={index}>{stepElement(index, activeStep)}</Step>
          ))}
      </Stepper>
      {stepMessage && (
        <span className="text-xs text-text-primary">{stepMessage}</span>
      )}
    </div>
  )
}

export default StatusStepper
