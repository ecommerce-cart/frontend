import { Cart } from '@/types/cart.types'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
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
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: '0',
    subTotal: '0',
    shipping: 'Free',
  })

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
