export type CartItem = {
  id: number
  title: string
  quantity: number
  price: string
  displayedPrice: string
  total: string
}

export type Cart = {
  items: Array<CartItem>
  subTotal: string
  shipping: string
  total: string
}
