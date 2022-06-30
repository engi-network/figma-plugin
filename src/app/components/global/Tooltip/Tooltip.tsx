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
import React from 'react'

import { CSSStylesProp } from '~/app/lib/constants'

import styles from './Tooltip.styles'

interface Props {
  children: ReactElement
  content: ReactNode
  customArrowStyles?: CSSStylesProp
  customPopperStyles?: CSSStylesProp
  placement?: Placement
  tooltipOffset?: number
}

export default function Tooltip({
  placement = 'right',
  tooltipOffset = 6,
  content,
  children,
  customArrowStyles,
  customPopperStyles,
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
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    placement,
    middleware: [
      offset(tooltipOffset),
      flip(),
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

  const toggleTooltip = () => {
    setIsOpen(!isOpen)
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
      <div ref={reference} onClick={toggleTooltip} className="inline-flex">
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
              styles[`arrow_${staticSide}`],
              customArrowStyles,
            ]}
            style={{
              ...{
                bottom: '',
                left: arrowX ?? '',
                right: '',
                top: arrowY ?? '',
              },
              ...{ [staticSide]: '-8px' },
            }}
          />
        </div>
      )}
    </>
  )
}
