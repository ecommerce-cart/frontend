import { Cart } from '@/types/cart.types'
import { Product, Variation } from '@/types/product.types'
import { getStorageItem } from '../json.lib'
import { money } from '../money/Money'

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
      displayedPrice: money(product.price).egp(),
      title: `${product.name}`,
    });
    this.reCalculate();
    this.sync();
  }

  public updateCartQuantity(
    cartProductId: number, 
    quantity: number
  ) {
    this.cart.items.map((product) => {
      if(product.id === cartProductId && quantity >= 1){
        product.quantity = quantity
      }
      return product
    })

    this.reCalculate();
    this.sync();
  }

  public deleteCartProduct(
    cartProductId: number
  ){
    this.cart.items.forEach((product, index) => {
      if(product.id === cartProductId){
        this.cart.items.splice(index, 1);
      }
      return;
    })

    this.reCalculate();
    this.sync();
  }

  public reCalculate() {
    const subTotal = this.cart.items.reduce((acc: number, curr) => {
      console.log(acc + curr.price * curr.quantity)
      return acc + curr.price * curr.quantity
    }, 0)
    this.cart.subTotal = this.cart.total = subTotal
    this.cart.displayedSubtotal = this.cart.displayedTotal = money(this.cart.subTotal).egp();
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
