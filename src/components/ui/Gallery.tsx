import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { NiceScroll } from './NiceScroll'

interface GalleryProps {
  images: Array<string>
}

export const Gallery = ({ images }: GalleryProps) => {
  const [canSlideLeft, setCanSlideLeft] = useState(false)
  const [canSlideRight, setCanSlideRight] = useState(true)

  const imageContainerRef = useRef<HTMLDivElement>(null)

  const slide = (toLeft = true) => {
    if (imageContainerRef.current) {
      const direction = toLeft ? -1 : 1
      const imageContainer = imageContainerRef.current
      const scrollAmount = imageContainer.clientWidth * direction
      imageContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const handleSlidingButtons = () => {
    if (imageContainerRef.current) {
      const imageContainer = imageContainerRef.current
      const maxScrollLeft =
        imageContainer.scrollWidth - imageContainer.clientWidth
      if (imageContainer.scrollLeft <= 10) setCanSlideLeft(false)
      else if (!canSlideLeft) setCanSlideLeft(true)
      if (imageContainer.scrollLeft >= maxScrollLeft - 10)
        setCanSlideRight(false)
      else if (!canSlideRight) setCanSlideRight(true)
    }
  }

  const handleScroll = () => {
    handleSlidingButtons()
  }

  return (
    <NiceScroll containerRef={imageContainerRef}>
      <>
        {/* Slide Left Button */}
        {canSlideLeft ? (
          <button
            onClick={() => slide()}
            className="prev absolute h-12 w-12 cursor-pointer border-none outline-none top-[50%] bg-black text-white rounded-full transform -translate-y-1/2 -left-5 hover:bg-gray-700"
          >
            <ChevronLeftIcon />
          </button>
        ) : null}

        {/* List container button */}
        <div
          className="flex overflow-x-auto max-w-7xl nice-scroll gap-x-4 p-4 border-2"
          ref={imageContainerRef}
          onScroll={handleScroll}
        >
          {images.map((image) => (
            <div
              key={image}
              className="w-[325px] flex-none rounded-lg shadow border-2"
            >
              <Image
                width={300}
                height={100}
                src={image}
                priority
                alt="replace me"
                className="h-full w-auto object-cover object-center"
              />
            </div>
          ))}
        </div>

        {/* Slide Right Button */}
        {canSlideRight ? (
          <button
            onClick={() => slide(false)}
            className="next absolute h-12 w-12 cursor-pointer border-none outline-none top-[50%] bg-black text-white rounded-full transform -translate-y-1/2 -right-5 hover:bg-gray-700"
          >
            <ChevronRightIcon />
          </button>
        ) : null}
      </>
    </NiceScroll>
  )
}
