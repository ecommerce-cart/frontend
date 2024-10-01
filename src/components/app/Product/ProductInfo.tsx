import { StarIcon } from "@heroicons/react/20/solid"

import { AddToCart } from "@/components/forms/AddToCart"
import { classNames } from "@/lib/general.lib"
import { Product } from "@/types/product.types"

const reviews = { href: '#', average: 4, totalCount: 117 }


export const ProductInfo = ({ product }: { product: Product }) => {
    return (
        <div className='w-1/2'>
            {/* Title */}
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-4">{product.name}</h2>
            {/* price */}
            <p className="text-3xl tracking-tight text-gray-900">
                {product.displayedPrice}
            </p>

            {/* FIXME:  */}
            {/* Reviews */}
            <div className="mt-2">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                    <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                                key={rating}
                                className={classNames(
                                    reviews.average > rating
                                        ? 'text-gray-900'
                                        : 'text-gray-200',
                                    'h-5 w-5 flex-shrink-0'
                                )}
                                aria-hidden="true"
                            />
                        ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                    <a
                        href={reviews.href}
                        className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        {reviews.totalCount} reviews
                    </a>
                </div>
            </div>

            {/* Description */}
            <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                    <p className="text-base text-gray-900">
                        {product.description}
                    </p>
                </div>
            </div>
            
            <AddToCart product={product} />
        </div>
    )
}
