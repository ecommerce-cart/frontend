import { apolloClient } from '@/clients/apollo.client'
import { Product } from '@/types/product.types'
import { gql } from '@apollo/client'
import { useEffect, useState } from 'react'

const PRODUCTS_QUERY = gql`
  query Products {
    products {
      id
      name
      images
    }
  }
`

const PRODUCT_QUERY = gql`
  query Product($productId: ID!) {
    product(id: $productId) {
      id
      name
      price
      displayedPrice
      description
      details
      images
      variationTypes {
        id
        name
        component
        variations {
          id
          name
          value
          typeId
          typeName
          parentId
        }
      }
    }
  }
`

export const getProducts = async (): Promise<Array<Product>> => {
  try {
    const { data } = await apolloClient.query({
      query: PRODUCTS_QUERY,
    })

    if (data && data.products) {
      return data.products
    }
  } catch (e) {
    console.log(e)
  }

  return []
}

export const useProducts = () => {
  const [products, setProducts] = useState<Array<Product>>([])

  useEffect(() => {
    getProducts().then(setProducts)
  }, [setProducts])

  return {
    products,
  }
}

export const getProduct = async (
  id: string | number
): Promise<Product | null> => {
  const { data } = await apolloClient.query({
    query: PRODUCT_QUERY,
    variables: {
      productId: id,
    },
  })

  if (data && data.product) {
    return data.product
  }

  return null
}
