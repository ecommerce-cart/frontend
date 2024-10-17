import Image from 'next/image'
import { MouseEvent, useRef, useState } from 'react'

export const ProductImageGallery = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0)

  const mainImageRef = useRef<HTMLImageElement>(null)
  const zoomedImageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (zoomedImageRef.current && mainImageRef.current) {
      const { left, top } = e.currentTarget.getBoundingClientRect()
      let x = e.pageX - left
      let y = e.pageY - top

      // fix if there is a scroll
      x = x - window.scrollX
      y = y - window.scrollY

      mainImageRef.current.style.display = 'none'
      zoomedImageRef.current.style.display = 'block'
      zoomedImageRef.current.style.backgroundPosition = `-${x}px -${y}px`
    }
  }

  const handleMouseLeave = () => {
    if (zoomedImageRef.current && mainImageRef.current) {
      mainImageRef.current.style.display = 'block'
      zoomedImageRef.current.style.display = 'none'
      zoomedImageRef.current.style.backgroundPosition = 'center'
    }
  }

  return (
    <div className="w-1/2 flex flex-col">
      <div className="w-full">
        <div
          className="w-[450px] h-[500px] m-auto relative overflow-hidden cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            width={450}
            height={500}
            ref={mainImageRef}
            src={images[currentImage]}
            alt={'FIXME: product name'}
            sizes="100%"
            priority
            className="object-center object-contain absolute inset-0"
          />

          <div
            className="w-full h-full bg-no-repeat absolute inset-0"
            ref={zoomedImageRef}
            style={{
              display: 'none',
              backgroundPosition: 'center',
              backgroundImage: `url(${images[currentImage]})`,
              backgroundSize: '200%', // Increase or decrease based on desired zoom
            }}
          />
        </div>
      </div>
      {/* Thumbnails */}
      <div className="flex flex-wrap -mx-1 mt-4 overflow-hidden">
        {images.map((image, index) => (
          <div key={index} onClick={() => setCurrentImage(index)} className="w-1/4 px-1 mb-4">
            <div
              className={`h-28 border rounded shadow relative cursor-pointer overflow-hidden ${index === currentImage ? 'border-2 border-indigo-500' : 'border-gray-200'}`}
            >
              <Image
                src={image}
                alt={'FIXME: product name'}
                fill
                priority
                sizes="100%"
                className="w-full h-full object-center object-contain absolute inset-0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
