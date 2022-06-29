import { Placement } from '@floating-ui/core'
import {
  arrow,
  autoUpdate,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react-dom'
import { ReactElement, useEffect, useRef, useState } from 'react'
import React from 'react'

import { CSSStylesProp } from '~/app/lib/constants'

import styles from './Tooltip.styles'

interface Props {
  children: ReactElement
  customArrowStyles?: CSSStylesProp
  customPopperStyles?: CSSStylesProp
  label: string
  placement?: Placement
  tooltipOffset?: number
}

export default function Tooltip({
  placement = 'right',
  tooltipOffset = 6,
  label,
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
    middleware: [offset(tooltipOffset), shift(), arrow({ element: arrowRef })],
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
      <div ref={reference} onClick={toggleTooltip}>
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
          {label}
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
              ...{ [staticSide]: '-4px' },
            }}
          >
            a
          </div>
        </div>
      )}
    </>
  )
}
