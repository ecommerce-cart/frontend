import { Product, Variation, VariationType } from '@/types/product.types'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import { QuantityStepper } from '@/components/app/Product/QuantityStepper'
import { VariationTypeComponent } from '@/components/app/Product/VariationType'
import { addToCartAction, getCartAction } from '@/network/cart.api'
import { useCartContext } from '@/contexts/cart.context'

type ProductVariationType = VariationType & {
  selectedVariation: Variation
}

export const AddToCart = ({ product }: { product: Product }) => {
  const [typesState, setTypesState] = useState<Array<ProductVariationType>>([])

  const [quantity, setQuantity] = useState(1)

  const { setCart } = useCartContext()

  /**
   * Select the first variation of the children of each type (first render only)
   */
  useEffect(() => {
    const newTypeStates: Array<ProductVariationType> = []

    product.variationTypes.forEach((variationType, index) => {
      const previousType = newTypeStates[index - 1]

      /**
       * getting only the variations that is feasible on the screen
       * if they are the first level with no parent then we expect to see them all in the screen
       * also if there parent is selected then we expect to see them
       */
      const childVariations = variationType.variations.filter(
        (variation) => !variation.parentId || previousType?.selectedVariation?.id === variation.parentId,
      )

      /**
       * Select the first variation of the children (for this type)
       */
      newTypeStates.push({ ...variationType, selectedVariation: childVariations[0] })
    })

    setTypesState(newTypeStates)
  }, [product])

  const changeSelectedVariation = (variation: Variation, type: ProductVariationType) => {
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
              (v) => v.parentId === newTypes[index - 1].selectedVariation?.id,
            ) as Variation,
          }
        }
      })

      return newTypes
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
          product,
          variations: typesState.map((t) => t.selectedVariation),
          quantity,
        }),
        {
          error: 'Something went wrong!',
          loading: 'Adding to cart...',
          success: 'Added to cart',
        },
      )
      .then(() =>
        getCartAction()
          .then((data) => setCart({ ...data, isReady: true }))
          .catch(console.log),
      )
      .catch(console.error)
  }

  return (
    <form className="mt-10" onSubmit={(e) => e.preventDefault()}>
      <Toaster />

      {typesState.map((t, index) => {
        const previousType = typesState[index - 1]
        const childVariations = t.variations.filter(
          (v) => !v.parentId || previousType?.selectedVariation?.id === v.parentId,
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
