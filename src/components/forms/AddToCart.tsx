import { Product, Variation, VariationType } from '@/types/product.types'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import { QuantityStepper } from '@/components/app/Product/QuantityStepper'
import { VariationTypeComponent } from '@/components/app/Product/VariationType'
import { addToCartAction, getCart } from '@/network/cart.api'
import { useCartContext } from '@/contexts/cart.context'

type ProductVariationType = VariationType & {
  selectedVariation: Variation
}

export const AddToCart = ({ product }: { product: Product }) => {
  const [typesState, setTypesState] = useState<Array<ProductVariationType>>(
    product.variationTypes.map((t) => ({
      ...t,
      selectedVariation: t.variations[0],
    }))
  )

  const [quantity, setQuantity] = useState(1)

  const { setCart } = useCartContext()

  const changeSelectedVariation = (
    variation: Variation,
    type: ProductVariationType
  ) => {
    setTypesState((oldTypes) => {
      const newTypes = [...oldTypes]
      const updatedTypeIndex = oldTypes.findIndex((t) => t.id === type.id)

      newTypes.forEach((t, index) => {
        // update the selectedType with the new variation
        if (index === updatedTypeIndex) {
          newTypes[index] = {
            ...t,
            selectedVariation: variation,
          }
        }
        // update all next types (children with the first variation)
        else if (index > updatedTypeIndex) {
          newTypes[index] = {
            ...t,
            selectedVariation: t.variations.find(
              (v) => v.parentId === newTypes[index - 1].selectedVariation?.id
            ) as Variation,
          }
        }
      })

      return [...newTypes]
    })
  }

  const handleQuantityChange = (value: number) => {
    setQuantity(value)
  }

  const addToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    toast
      .promise(
        addToCartAction({
          productId: product.id,
          variations: typesState.map((t) => t.selectedVariation?.id),
          quantity,
        }),
        {
          error: 'Something went wrong!',
          loading: 'Adding to cart...',
          success: 'Added to cart',
        }
      )
      .then(() =>
        getCart()
          .then((data) => setCart(data))
          .catch(console.log)
      )
  }

  return (
    <form className="mt-10" onSubmit={(e) => e.preventDefault()}>
      <Toaster />
      {/* Sizes */}
      {typesState.map((t, index) => {
        const previousType = typesState[index - 1]
        const childVariations = t.variations.filter(
          (v) =>
            !v.parentId || previousType?.selectedVariation?.id === v.parentId
        )
        return (
          <div key={t.id} className={`mt-10`}>
            <div className="mb-4">{t.name}</div>
            <VariationTypeComponent
              variationType={t}
              onChangeVariation={changeSelectedVariation}
              variations={childVariations}
            />
          </div>
        )
      })}
      <div className="mt-10">
        <h3 className="mb-4 text-sm font-medium text-gray-900">quantity</h3>
        <QuantityStepper initial={quantity} onChange={handleQuantityChange} />
      </div>
      <button
        onClick={addToCart}
        type="submit"
        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add to cart
      </button>
    </form>
  )
}
