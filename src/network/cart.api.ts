import { apolloClient } from '@/clients/apollo.client'
import cartBrowser from '@/lib/cart/CartBrowser'
import { getAndParseStorageItem } from '@/lib/json.lib'
import { Cart } from '@/types/cart.types'
import { Product, Variation } from '@/types/product.types'
import { gql } from '@apollo/client'

const SHOW_CART_QUERY = gql`
  query ShowCart {
    showCart {
      items {
        id
        title
        price
        quantity
        displayedPrice
      }
      subTotal
      total
      shipping
      displayedSubTotal
      displayedTotal
      displayedShipping
    }
  }
`
const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input)
  }
`
const UPDATE_CART_QUANTITY_MUTATION = gql`
  mutation UpdateCartQuantity($input: UpdateCartQuantityInput!) {
    updateCartQuantity(input: $input)
  }
`

const DELETE_CART_PRODUCT_MUTATION = gql`
  mutation DeleteCartProduct($input: DeleteCartProductInput!) {
    deleteCartProduct(input: $input)
  }
`

export const getCartApi = async () => {
  try {
    const { data } = await apolloClient.query({
      query: SHOW_CART_QUERY,
    })

    if (data && data.showCart) {
      return data.showCart
    }
  } catch (e) {
    console.error(e)
    // throw new Error('Something went wrong!')
  }
}

export const getCartBrowser = () => {
  let cart = getAndParseStorageItem<Cart>('userCart')

  if (cart) {
    cartBrowser.init(cart)
  }

  return cartBrowser.getCart()
}

export const getCartAction = async (): Promise<Cart> => {
  //Fixme: This is not secure if the user added data to the local storage
  if (getAndParseStorageItem('userData')) {
    return getCartApi()
  }

  return getCartBrowser()
}

export type AddToCartInput = {
  product: Product
  variations: Array<Variation>
  quantity: number
}
export const addToCartApi = async ({ product, variations, quantity }: AddToCartInput) => {
  const { data } = await apolloClient.mutate({
    mutation: ADD_TO_CART_MUTATION,
    variables: {
      input: {
        productId: product.id,
        quantity,
        variations: variations.map((v) => v.id),
      },
    },
  })

  if (data && data.addToCart) {
    return true
  }

  return false
}

export const addToCartBrowser = (form: AddToCartInput) => {
  cartBrowser.addItem(form.product, form.quantity, form.variations)
}

export const addToCartAction = async (form: AddToCartInput) => {
  const userData = localStorage.getItem('userData')

  if (userData) {
    return addToCartApi(form)
  }

  return addToCartBrowser(form)
}

export type UpdateCartQuantityInput = {
  cartProductId: number
  quantity: number
}
export const updateCartQuantityApi = async ({ cartProductId, quantity }: UpdateCartQuantityInput) => {
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_CART_QUANTITY_MUTATION,
    variables: {
      input: { cartProductId, quantity },
    },
  })

  if (data && data.updateCartQuantity) {
    return true
  }

  return false
}

export const updateCartQuantityBrowser = (form: UpdateCartQuantityInput) => {
  cartBrowser.updateCartQuantity(form.cartProductId, form.quantity)
}

export const updateCartQuantityAction = async (form: UpdateCartQuantityInput) => {
  const userData = localStorage.getItem('userData')

  if (userData) {
    return updateCartQuantityApi(form)
  }

  return updateCartQuantityBrowser(form)
}

export const deleteCartProductApi = async (cartProductId: number) => {
  const { data } = await apolloClient.mutate({
    mutation: DELETE_CART_PRODUCT_MUTATION,
    variables: {
      input: { cartProductId },
    },
  })

  if (data && data.deleteCartProduct) {
    return true
  }

  return false
}

export const deleteCartProductBrowser = async (cartProductId: number) => {
  cartBrowser.deleteCartProduct(cartProductId)
}

export const deleteCartProductAction = async (cartProductId: number) => {
  const userData = localStorage.getItem('userData')

  if (userData) {
    return deleteCartProductApi(cartProductId)
  }

  return deleteCartProductBrowser(cartProductId)
}
