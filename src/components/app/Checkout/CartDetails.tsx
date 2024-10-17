import React from 'react'

import { useCartContext } from '@/contexts/cart.context'

export const CartDetails = () => {
  const { cart } = useCartContext()
  return (
    <div className=" border-gray-900/10 pb-12 px-10">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Cart details</h2>

      <div className="mt-8">
        {cart.items.map((cartItem) => (
          <div className="flex items-center mt-4" key={cartItem.id}>
            <div className="w-16 h-16 bg-gray-500 relative rounded">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-slate-400 -right-2 -top-2 rounded-full text-white text-xs font-bold">
                {cartItem.quantity}
              </span>
            </div>
            <div className="ml-3 text-sm">
              <div>{cartItem.title.split('/').shift()}</div>
              <div>{cartItem.title.split('/').slice(1).join('/')}</div>
            </div>
            <div className="ml-auto">{cartItem.displayedPrice}</div>
          </div>
        ))}
        <div className="mt-8">
          <div className="flex mt-2 justify-between">
            <div>Products price</div>
            <div>{cart.displayedSubTotal}</div>
          </div>
          <div className="flex mt-2 justify-between">
            <div>Shipping</div>
            <div>{cart.displayedShipping}</div>
          </div>
          <div className="flex mt-2 justify-between">
            <div>Total</div>
            <div>{cart.displayedTotal}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
