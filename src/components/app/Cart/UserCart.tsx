import React from 'react'
import {
  ArchiveBoxXMarkIcon,
  ArrowRightIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import { motion } from 'framer-motion'
import { Backdrop } from '@/components/ui/Backdrop'
import { useCartContext } from '@/contexts/cart.context'
import { QuantityStepper } from '../Product/QuantityStepper'
import {
  deleteCartProductAction,
  getCartAction,
  updateCartQuantityAction,
} from '@/network/cart.api'
import toast from 'react-hot-toast'
import { createOrderAction } from '@/network/order.api'

export const UserCart = ({ close }: { close: () => void }) => {
  const { cart, setCart } = useCartContext()

  const handleCreateOrder = () => {
    toast
      .promise(createOrderAction(), {
        error: 'Something went wrong!',
        loading: 'Creating a new order...',
        success: 'Order created successfully',
      })
      .then(() => getCartAction().then(setCart))
  }

  const handleDeleteCartProduct = (cartProductId: number) => {
    toast
      .promise(deleteCartProductAction(cartProductId), {
        error: 'Something went wrong!',
        loading: 'Deleting cart product...',
        success: 'Cart product deleted!',
      })
      .then(() => {
        getCartAction().then(setCart)
      })
  }

  const handleUpdateQuantity = (cartProductId: number, quantity: number) => {
    if (quantity <= 0) {
      handleDeleteCartProduct(cartProductId)
    } else {
      toast
        .promise(updateCartQuantityAction({cartProductId, quantity}), {
          error: 'Something went wrong!',
          loading: 'Updating quantity...',
          success: 'Quantity updated',
        })
        .then(() => {
          getCartAction().then(setCart)
        })
    }
  }

  return (
    <Backdrop onClick={close}>
      <motion.div
        key="userCart"
        initial={{ x: '100%' }}
        animate={{ x: '0%' }}
        // transition={{ type: 'keyframes', ease: 'easeIn', duration: .2 }}
        exit={{
          x: '100%',
          //   transition: {
          //     type: 'keyframes',
          //     ease: 'easeIn',
          //     duration: .2
          //   },
        }}
        className="block bg-white right-0 ml-auto w-1/3 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="header flex">
          <button className="ml-auto">
            <XMarkIcon
              className="h-6 w-6 text-gray-400"
              aria-hidden="true"
              onClick={close}
            />
          </button>
        </div>

        {cart.items.length <= 0 ? (
          <div className="h-full flex justify-center items-center text-slate-600 text-xl">
            <ArchiveBoxXMarkIcon className="h-6 w-6 mr-3" aria-hidden="true" />
            Your cart is empty
          </div>
        ) : (
          <>
            <table className="mt-8 border-collapse table-auto w-full text-sm">
              <tbody className="bg-white">
                {cart.items.map((item, index) => (
                  <tr key={item.id}>
                    <td className="p-4 pl-8 text-slate-500">{item.title}</td>
                    <td className="p-4 pl-8 text-slate-500">
                      <QuantityStepper
                        initial={item.quantity}
                        onChange={(quantity: number) =>
                          handleUpdateQuantity(item.id, quantity)
                        }
                      />
                    </td>
                    <td className="p-4 pl-8 text-slate-500">
                      {item.displayedPrice}
                    </td>
                    <td className="p-4 pl-8 text-slate-500">
                      <button
                        className="text-red-400"
                        onClick={() => handleDeleteCartProduct(item.id)}
                      >
                        <TrashIcon
                          className="h-4 w-4"
                          aria-hidden="true"
                        ></TrashIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="mt-8 border-collapse table-auto w-1/2 text-sm">
              <tbody>
                <tr>
                  <td className="p-4 pl-8 text-slate-500">Products price</td>
                  <td className="p-4 pl-8 text-slate-500">{cart.displayedSubTotal}</td>
                </tr>
                <tr>
                  <td className="p-4 pl-8 text-slate-500">Shipping</td>
                  <td className="p-4 pl-8 text-slate-500">{cart.displayedShipping}</td>
                </tr>
                <tr>
                  <td className="p-4 pl-8 text-slate-500">Total</td>
                  <td className="p-4 pl-8 text-slate-500">{cart.displayedTotal}</td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              className="flex ml-8 mt-4 px-12 rounded py-4 bg-indigo-600 text-white hover:bg-indigo-500"
              onClick={handleCreateOrder}
            >
              Checkout
              <ArrowRightIcon
                className="ml-2 w-6 h-6"
                aria-hidden="true"
              ></ArrowRightIcon>{' '}
            </button>
          </>
        )}
      </motion.div>
    </Backdrop>
  )
}
