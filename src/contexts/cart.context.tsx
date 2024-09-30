import { emptyCart } from '@/lib/cart/CartBrowser'
import { getCartAction } from '@/network/cart.api'
import { CartState } from '@/types/cart.types'
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
  cart: CartState
  setCart: Dispatch<SetStateAction<CartState>>
}

export const CartContext = createContext<CartContextType | null>(null)

export default function CartContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [cart, setCart] = useState<CartState>({ ...emptyCart(), isReady: false })

  useEffect(() => {
    getCartAction().then(cart => ({ ...cart, isReady: true })).then(setCart)
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
