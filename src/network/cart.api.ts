import { apolloClient } from '@/clients/apollo.client'
import { Cart } from '@/types/cart.types'
import { gql } from '@apollo/client'

const SHOW_CART_QUERY = gql`
  query cart {
    showCart {
      items {
        id
        price
        displayedPrice
        quantity
        title
      }
      subTotal
      total
      shipping
    }
  }
`
const ADD_TO_CART_MUTATION = gql`
  mutation cart($input: AddToCartInput!) {
    addToCart(input: $input)
  }
`
const UPDATE_CART_QUANTITY_MUTATION = gql`
  mutation updateCartQuantity($input: UpdateCartQuantityInput!) {
    updateCartQuantity(input: $input)
  }
`

const DELETE_CART_PRODUCT_MUTATION = gql`
  mutation deleteCartProduct($input: DeleteCartProductInput!) {
    deleteCartProduct(input: $input)
  }
`

export const getCart = async (): Promise<Cart> => {
  try {
    const { data } = await apolloClient.query({
      query: SHOW_CART_QUERY,
    })

    if (data && data.showCart) {
      return data.showCart
    }
  } catch (e) {
    console.log(e)
  }

  return { items: [], shipping: 'Free', subTotal: '0', total: '0' }
}

export const addToCartAction = async (form: {
  productId: number
  variations: Array<number>
  quantity: number
}) => {
  const { data } = await apolloClient.mutate({
    mutation: ADD_TO_CART_MUTATION,
    variables: {
      input: form,
    },
  })

  if (data && data.addToCart) {
    return true
  }

  return false
}

export const updateCartQuantityAction = async (
  cartProductId: number,
  quantity: number
) => {
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

export const deleteCartProductAction = async (
  cartProductId: number
) => {
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
