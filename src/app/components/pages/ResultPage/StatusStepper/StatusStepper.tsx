import cn from 'classnames'
import { ReactNode, useMemo } from 'react'

import CodeBlockWithTabs from '~/app/components/global/CodeBlock/CodeBlockWithTabs/CodeBlockWithTabs'
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
import { CSSStylesProp } from '~/app/lib/constants'
import { MessageResult } from '~/app/models/Report'
import { STEP_MESSAGES } from '~/app/pages/Main/Main.types'

interface Props {
  activeStep: number
  className?: string
  data: MessageResult
  layerName: string
  originalImageUrl: string
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

function getLastPath(path: string): string {
  const temp = path.split('/')
  return temp[temp.length - 1]
}

function StatusStepper({
  activeStep,
  className,
  stepMessage,
  data,
  originalImageUrl,
  layerName,
}: Props) {
  const { code_paths = [], code_snippets = [] } = data

  const codeBlockData = code_paths.map((_, index) => ({
    codeString: code_snippets[index],
    tabLabel: getLastPath(code_paths[index]),
  }))

  const mapStepToTooltipProps: Record<
    string,
    {
      content: ReactNode
      customArrowStyles?: CSSStylesProp
      customPopperStyles?: CSSStylesProp
      disabled?: boolean
    }
  > = useMemo(
    () => ({
      0: {
        content: (
          <div className="flex flex-col justify-center items-center gap-3 w-[120px]">
            <div className="w-full h-[71px] overflow-hidden flex justify-center items-center min-h-[71px] max-h-[71px]">
              <img src={originalImageUrl} alt="no snippet" />
            </div>
            <p className="text-xs text-text-secondary">{layerName}</p>
          </div>
        ),
      },
      1: {
        content: (
          <span className="whitespace-nowrap text-xs text-text-secondary">
            {STEP_MESSAGES[1]}
          </span>
        ),
        disabled: true,
      },
      2: {
        content: (
          <span className="whitespace-nowrap text-xs text-text-secondary">
            {STEP_MESSAGES[2]}
          </span>
        ),
        disabled: true,
      },
      3: {
        content: !codeBlockData.length ? (
          <span className="whitespace-nowrap text-xs text-text-secondary">
            {STEP_MESSAGES[3]}
          </span>
        ) : (
          <CodeBlockWithTabs
            data={codeBlockData}
            showLineNumbers
            className="p-0 border-none h-20 w-full"
          />
        ),
        customPopperStyles: { padding: 0, background: 'none' },
      },
      4: {
        content: (
          <span className="whitespace-nowrap text-xs text-text-secondary">
            {STEP_MESSAGES[4]}
          </span>
        ),
        disabled: true,
      },
      5: {
        content: (
          <span className="whitespace-nowrap text-xs text-text-secondary">
            {STEP_MESSAGES[5]}
          </span>
        ),
        disabled: true,
      },
    }),
    [activeStep],
  )

  const stepElement = (index: number, activeStep: number) => {
    const completed = index < activeStep
    const current = index === activeStep
    const disabled = index > activeStep

    return (
      <Tooltip
        tooltipOffset={12}
        placement="top"
        // trigger="hover"
        // disabled={disabled}
        customPopperStyles={{
          background: 'rgb(35, 35, 35)',
          zIndex: 20,
        }}
        customArrowStyles={{
          background: 'rgb(35, 35, 35)',
        }}
        {...mapStepToTooltipProps[index]}
      >
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
        connector={<div className="w-[9px]" />}
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
