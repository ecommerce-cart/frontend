import { apolloClient } from '@/clients/apollo.client'
import { Order } from '@/types/order.types'
import { gql } from '@apollo/client'
import { useEffect, useState } from 'react'

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder {
    createOrder
  }
`
const ORDERS_QUERY = gql`
  query orders {
    orders {
      id
      status
      createdAt
      updatedAt
    }
  }
`

export const createOrderAction = async () => {
  try {
    const { data } = await apolloClient.query({
      query: CREATE_ORDER_MUTATION,
    })

    if (data && data.createOrder) {
      return data.createOrder
    }
  } catch (e) {
    console.log(e)
  }

  return false
}

export const getOrders = async (): Promise<Array<Order>> => {
  try {
    const { data } = await apolloClient.query({
      query: ORDERS_QUERY,
    })

    if (data && data.orders) {
      return data.orders
    }
  } catch (e) {
    console.log(e)
  }

  return []
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Array<Order>>([])

  useEffect(() => {
    getOrders().then(setOrders).catch(console.error)
  }, [setOrders])

  return {
    orders,
  }
}
