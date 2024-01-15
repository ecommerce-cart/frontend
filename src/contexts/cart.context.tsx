import { emptyCart } from '@/lib/cart/CartBrowser'
import { getCartAction } from '@/network/cart.api'
import { Cart } from '@/types/cart.types'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

type CartContextType = {
  cart: Cart
  setCart: Dispatch<SetStateAction<Cart>>
}

export const CartContext = createContext<CartContextType | null>(null)

export default function CartContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [cart, setCart] = useState<Cart>(emptyCart())

  useEffect(() => {
    getCartAction().then(setCart)
  }, [setCart])
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCartContext must be used within a CartContextProvider')
  }

  return context
}
