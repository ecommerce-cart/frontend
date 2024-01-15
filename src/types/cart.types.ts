export type CartItem = {
  id: number
  title: string
  quantity: number
  price: number
  displayedPrice: string
}

export type Cart = {
  items: Array<CartItem>
  displayedSubtotal: string
  subTotal: number
  shipping: number
  displayedShipping: string
  total: number
  displayedTotal: string
}
