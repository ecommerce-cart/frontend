import Image from "next/image"
import { MouseEvent, useRef, useState } from "react"

export const ProductImageGallery = ({ images }: { images: string[] }) => {
    const [currentImage, setCurrentImage] = useState(0)

    const mainImageRef = useRef<HTMLImageElement>(null)
    const zoomedImageRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (zoomedImageRef.current && mainImageRef.current) {
            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
            const x = ((e.pageX - left) / width) * 100;
            const y = ((e.pageY - top) / height) * 100;
            mainImageRef.current.style.display = 'none'
            zoomedImageRef.current.style.display = 'block'
            zoomedImageRef.current.style.backgroundPosition = `${x}% ${y}%`
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
            <div className="w-full border">
                <div
                    className='w-3/4 m-auto relative pt-[100%] h-0 overflow-hidden cursor-zoom-in'
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}>
                    <Image
                        ref={mainImageRef}
                        src={images[currentImage]}
                        alt={"FIXME: product name"}
                        fill
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
                            backgroundSize: '170%', // Increase or decrease based on desired zoom
                            transition: 'background-position 0.1s ease-out'
                        }}
                    />
                </div>
            </div>
            {/* Thumbnails */}
            <div className='flex flex-wrap -mx-1 mt-4 overflow-hidden'>
                {images.map((image, index) => (
                    <div key={index} onClick={() => setCurrentImage(index)} className='w-1/4 px-1 mb-4'>
                        <div className={
                            `h-28 border rounded shadow relative cursor-pointer overflow-hidden ${index === currentImage ? 'border-2 border-indigo-500' : 'border-gray-200'}`
                        }>
                            <Image
                                src={image}
                                alt={"FIXME: product name"}
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
