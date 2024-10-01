import React from 'react'
import { GetServerSidePropsContext } from 'next'

import AppLayout from '@/layouts/App.layout'
import { Product } from '@/types/product.types'
import { getProduct } from '@/network/product.api'
import { ProductImageGallery } from '@/components/app/Product/ProductImageGallery'
import { ProductInfo } from '@/components/app/Product/ProductInfo'

//FIXME: When loading the correct categories
export const ProductBreadcrumb = () => {
  return (
    <div className="flex items-center mb-6 text-base text-gray-500">
      <a href="#" className="hover:underline text-gray-700">Men</a>
      <span className="mx-2">/</span>
      <a href="#" className="hover:underline text-gray-700">Clothing</a>
      <span className="mx-2">/</span>
      <span className='text-gray-500'>Tipped Polo</span>
    </div>
  )
}


export default function ProductPage({ product }: { product: Product }) {
  return (
    <AppLayout>
      <>
        {product ? (
          <div className='bg-white border border-gray-200 rounded px-8 py-10'>
            <ProductBreadcrumb />
            <div className="flex gap-8">
              <ProductImageGallery images={product.images} />
              <ProductInfo product={product} />
            </div>
          </div>
          // FIXME: add page not found
        ) : <div>Page not found</div>}
      </>

    </AppLayout>
  )
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext<{ id: string }>) {
  const result: { props: { product: Product | null } } = {
    props: {
      product: null,
    }
  }

  if (!params?.id) {
    return result
  }

  const product = await getProduct(params?.id)

  if (!product) {
    return result
  }

  result.props.product = product

  return result
}



