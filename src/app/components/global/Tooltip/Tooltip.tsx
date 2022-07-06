import { Placement } from '@floating-ui/core'
import {
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react-dom'
import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react'

import { CSSStylesProp } from '~/app/lib/constants'

import styles from './Tooltip.styles'

const flipMap = {
  top: 'bottom',
  right: 'left',
  left: 'right',
  bottom: 'top',
}

interface Props {
  children: ReactElement
  content: ReactNode
  customArrowStyles?: CSSStylesProp
  customPopperStyles?: CSSStylesProp
  placement?: Placement
  tooltipOffset?: number
  trigger?: 'click' | 'hover'
}

export default function Tooltip({
  placement = 'right',
  tooltipOffset = 6,
  content,
  children,
  customArrowStyles,
  customPopperStyles,
  trigger = 'click',
}: Props) {
  const arrowRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const {
    x,
    y,
    reference,
    floating,
    strategy,
    update,
    refs,
    middlewareData: {
      arrow: { x: arrowX, y: arrowY } = {},
      flip: { overflows = [] } = {},
    },
  } = useFloating({
    placement,
    middleware: [
      offset(tooltipOffset),
      flip({
        fallbackStrategy: 'bestFit',
      }),
      shift({ padding: 10 }),
      arrow({ element: arrowRef }),
    ],
  })

  const staticSide =
    {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[placement.split('-')[0]] ?? 'right'

  const flipped = overflows.length > 0

  const toggleTooltip = () => {
    setIsOpen(!isOpen)
  }

  const closeTooltip = () => {
    setIsOpen(false)
  }

  const openTooltip = () => {
    setIsOpen(true)
  }

  const handlers =
    trigger === 'click'
      ? {
          onClick: toggleTooltip,
        }
      : {
          onMouseEnter: openTooltip,
          onMouseLeave: closeTooltip,
        }

  // Update on scroll and resize for all relevant nodes
  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return
    }
    return autoUpdate(refs.reference.current, refs.floating.current, update)
  }, [refs.reference, refs.floating, update])

  return (
    <>
      <div ref={reference} className="inline-flex" {...handlers}>
        {children}
      </div>
      {isOpen && (
        <div
          css={[styles.popper, customPopperStyles]}
          ref={floating}
          style={{
            position: strategy,
            top: y ?? '',
            left: x ?? '',
          }}
        >
          {content}
          <div
            ref={arrowRef}
            css={[
              styles.arrow,
              styles[
                flipped ? `arrow_${flipMap[staticSide]}` : `arrow_${staticSide}`
              ],
              customArrowStyles,
            ]}
            style={{
              ...{
                bottom: '',
                left: arrowX ?? '',
                right: '',
                top: arrowY ?? '',
              },
              ...{ [flipped ? flipMap[staticSide] : staticSide]: '-8px' },
            }}
          />
        </div>
      )}
    </>
  )
}
