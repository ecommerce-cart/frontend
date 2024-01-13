import React, { useEffect, useRef } from 'react'

export type NiceScrollProps = {
  children: React.ReactElement
  containerRef: React.RefObject<HTMLDivElement>
}

export const NiceScroll = ({ children, containerRef }: NiceScrollProps) => {
  const sliderScrollbar = useRef<HTMLDivElement>(null)
  const scrollBarThumb = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateScrollThumbPosition = () => {
      if (
        containerRef.current &&
        sliderScrollbar.current &&
        scrollBarThumb.current
      ) {
        const imageContainer = containerRef.current
        const maxScrollLeft =
          imageContainer.scrollWidth - imageContainer.clientWidth
        const newThumbPosition =
          (imageContainer.scrollLeft / maxScrollLeft) *
          (sliderScrollbar.current.clientWidth -
            scrollBarThumb.current.offsetWidth)

        scrollBarThumb.current.style.left = `${newThumbPosition}px`
      }
    }

    if (containerRef && containerRef.current) {
      containerRef.current.onscroll = updateScrollThumbPosition
    }
  }, [containerRef])

  const handleGrabbingThumb = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const startX = e.clientX
    console.log('clientX', e.clientX)
    const thumbPosition = e.currentTarget.offsetLeft
    console.log('thumbPosition', thumbPosition)

    const handleMouseMove = (e: MouseEvent) => {
      if (
        scrollBarThumb.current &&
        sliderScrollbar.current &&
        containerRef.current
      ) {
        console.log('containerClientWidth', containerRef.current.clientWidth)
        console.log('containerScrollWidth', containerRef.current.scrollWidth)
        const maxScrollLeft =
          containerRef.current.scrollWidth - containerRef.current.clientWidth

        console.log('containerMaxScrollLeft', maxScrollLeft)

        const deltaX = e.clientX - startX
        console.log('deltaX', deltaX)

        const newThumbPosition = thumbPosition + deltaX

        console.log(
          'sliderScrollbarClientWidth',
          sliderScrollbar.current.offsetWidth
        )
        console.log(
          'thumbWidth',
          scrollBarThumb.current.offsetWidth,
          scrollBarThumb.current.clientWidth
        )

        const maxThumbPosition =
          sliderScrollbar.current.clientWidth -
          scrollBarThumb.current.clientWidth

        const boundedPosition = Math.max(
          0,
          Math.min(maxThumbPosition, newThumbPosition)
        )

        const scrollPosition =
          (boundedPosition / maxThumbPosition) * maxScrollLeft
        containerRef.current.scrollLeft = scrollPosition

        scrollBarThumb.current.style.left = `${boundedPosition}px`
      }
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove, true)
      document.removeEventListener('mouseup', handleMouseUp, true)
    }

    document.addEventListener('mousemove', handleMouseMove, true)
    document.addEventListener('mouseup', handleMouseUp, true)
  }

  return (
    <div className="nice-scroll relative">
      {children}

      <div
        className="slider-scrollbar h-6 w-full flex items-center"
        ref={sliderScrollbar}
      >
        <div className="scrollbar-track h-1 w-full bg-gray-400 relative rounded">
          <div
            className="scrollbar-thumb absolute h-full w-1/2 bg-black rounded cursor-grab active:h-2 active:cursor-grabbing active:-top-[2px]"
            ref={scrollBarThumb}
            onMouseDown={handleGrabbingThumb}
          ></div>
        </div>
      </div>
    </div>
  )
}
