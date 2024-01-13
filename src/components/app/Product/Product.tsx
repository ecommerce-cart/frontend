// import { ColorPicker } from '@/components/UI/ColorPicker'
import { Product } from '@/types/product.types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Product = ({ product }: { product: Product }) => {
  return (
    <div key={product.id} className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full border-2 overflow-hidden rounded-md bg-gray-200  lg:aspect-none lg:h-80 cursor-zoom-in">
        {product?.images.length ? (
          <Image
            width={500}
            height={500}
            src={product.images[0]}
            alt={''}
            className="h-auto w-full object-cover object-center"
            priority={true}
          />
        ) : null}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/products/${product.id}`}>
              <span aria-hidden="true" className="absolute" />
              {product.name}
            </Link>
          </h3>
          {/* <p className="mt-1 text-sm text-gray-500">{'red'}</p> */}
        </div>
        <p className="text-sm font-medium text-gray-900">{'$35'}</p>
      </div>
      {/* <div>
        <ColorPicker colors={product.types[0].variations} />
      </div> */}
    </div>
  )
}

export default Product
