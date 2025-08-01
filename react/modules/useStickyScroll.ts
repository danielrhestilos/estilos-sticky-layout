import { useCallback, useState, useRef } from 'react'
import { useWindowListener } from './useWindowListener'
import { Positions } from '../types'

interface StickyProps {
  position?: Positions
  verticalSpacing?: number
  stickOffset?: number
  contentHeight: number | string
  wrapperOffsetTop: number
  onlyWhenScrollingUp?: boolean //  NUEVO
}

export const useStickyScroll = ({
  position,
  verticalSpacing = 0,
  stickOffset = 0,
  contentHeight,
  wrapperOffsetTop,
  onlyWhenScrollingUp = false, //  NUEVO
}: StickyProps) => {
  const [isStuck, setStuck] = useState<boolean>(false)
  const lastScrollY = useRef<number>(0) //  Para detectar dirección

  const handlePosition = useCallback(
    () => {
      if (!contentHeight || typeof contentHeight !== 'number') return

      const offset = stickOffset + verticalSpacing
      const currentScrollY = window.scrollY
      const scrollingUp = currentScrollY < lastScrollY.current
      lastScrollY.current = currentScrollY

      let currentPosition = currentScrollY
      let stuckPosition = wrapperOffsetTop

      if (position === Positions.TOP) {
        stuckPosition -= offset

        if (stuckPosition === 0 && currentPosition === 0) {
          currentPosition -= 1
        }
      } else {
        currentPosition += window.innerHeight
        stuckPosition += offset + contentHeight
      }

      let shouldStick = currentPosition >= stuckPosition

      //  Si solo queremos stick al subir, y no se está subiendo, no aplicar sticky
      if (onlyWhenScrollingUp && !scrollingUp) {
        shouldStick = false
      }

      if (isStuck === shouldStick) return

      setStuck(shouldStick)
    },
    [
      contentHeight,
      wrapperOffsetTop,
      position,
      isStuck,
      stickOffset,
      verticalSpacing,
      onlyWhenScrollingUp,
    ]
  )

  useWindowListener(['resize', 'scroll'], handlePosition)

  return {
    isStuck,
  }
}