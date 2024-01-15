import { Cart } from '@/types/cart.types'
import { Product, Variation } from '@/types/product.types'
import { getStorageItem } from '../json.lib'

export const emptyCart = (): Cart => ({
  items: [],
  shipping: 0,
  subTotal: 0,
  total: 0,
  displayedShipping: 'Free',
  displayedSubtotal: '0',
  displayedTotal: '0',
})

export class CartBrowser {
  private cart: Cart

  constructor() {
    this.cart = emptyCart()
  }

  public init(cart: Cart) {
    this.cart = cart
  }

  public addItem(
    product: Product,
    quantity: number,
    variations: Array<Variation>
  ) {
    const cart = getStorageItem<Cart>('userCart')

    if (cart) {
      this.init(cart)
    }

    this.cart.items.push({
      id: product.id,
      price: product.price,
      quantity,
      displayedPrice: `${product.price}`,
      title: `${product.name}`,
    })
    this.reCalculate()
    this.sync()
  }

  public reCalculate() {
    const subTotal = this.cart.items.reduce((acc: number, curr) => {
      console.log(acc + curr.price * curr.quantity)
      return acc + curr.price * curr.quantity
    }, 0)
    this.cart.subTotal = this.cart.total = subTotal
    this.cart.displayedSubtotal =
      this.cart.displayedTotal = `${this.cart.subTotal}`
  }

  getCart() {
    const cart = getStorageItem<Cart>('userCart')

    if (cart) {
      this.init(cart)
    }

    return this.cart
  }
  sync() {
    localStorage.setItem('userCart', JSON.stringify(this.cart))
  }
}

const cartBrowser = new CartBrowser()

export default cartBrowser
