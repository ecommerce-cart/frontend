import { CartState } from '@/types/cart.types'
import { Product, Variation } from '@/types/product.types'
import { getStorageItem } from '../json.lib'
import { money } from '../money/Money'

export const emptyCart = (): CartState => ({
  items: [],
  shipping: 0,
  subTotal: 0,
  total: 0,
  displayedShipping: 'Free',
  displayedSubTotal: '0',
  displayedTotal: '0',
  isReady: false
})

export class CartBrowser {
  private cart: CartState

  constructor() {
    this.cart = emptyCart()
  }

  public init(cart: CartState) {
    this.cart = cart
  }

  public addItem(
    product: Product,
    quantity: number,
    variations: Array<Variation>
  ) {
    if (quantity <= 0) {
      throw new Error(`Quantity Can not be ${quantity}`);
    }

    const cart = getStorageItem<CartState>('userCart')

    if (cart) {
      this.init(cart)
    }

    const price = product.price * quantity
    this.cart.items.push({
      id: product.id + Date.now(),
      price,
      quantity,
      displayedPrice: money(price).egp(),
      title: `${product.name} ${variations.map(v => ` / ${v.name}`).join(' ')}`,
    })
    this.reCalculate()
    this.sync()
  }

  public updateCartQuantity(cartProductId: number, quantity: number) {
    this.cart.items.forEach((product) => {
      if (product.id === cartProductId && quantity >= 1) {
        product.price = (product.price / product.quantity) * quantity
        product.quantity = quantity
        product.displayedPrice = money(product.price).egp()
      }
    })

    this.reCalculate()
    this.sync()
  }

  public deleteCartProduct(cartProductId: number) {
    this.cart.items = this.cart.items.filter((p) => p.id !== cartProductId)
    this.reCalculate()
    this.sync()
  }

  public reCalculate() {
    const subTotal = this.cart.items.reduce((acc: number, curr) => {
      return acc + curr.price
    }, 0)
    this.cart.subTotal = this.cart.total = subTotal
    this.cart.displayedSubTotal = this.cart.displayedTotal = money(
      this.cart.subTotal
    ).egp()
  }

  getCart() {
    const cart = getStorageItem<CartState>('userCart')

    if (cart) {
      this.init(cart)
    }

    return this.cart
  }
  sync() {
    localStorage.setItem('userCart', JSON.stringify({...this.cart, isReady: true}))
  }
}

const cartBrowser = new CartBrowser()

export default cartBrowser
