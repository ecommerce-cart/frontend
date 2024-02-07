import { apolloClient } from '@/clients/apollo.client'
import { CheckoutFormData } from '@/components/app/Checkout/CreateShippingAddress'
import { Address, City } from '@/types/address.types'
import { gql } from '@apollo/client'
import { useEffect, useState } from 'react'

const CITIES_QUERY = gql`
  query cities {
    cities {
      id
      name
    }
  }
`
const ADDRESSES_QUERY = gql`
  query addresses {
    addresses {
      id
      state
      street
      zipcode
      default
      city {
        name
        country {
          name
        }
      }
    }
  }
`

const CREATE_ADDRESS_MUTATION = gql`
  mutation CreateAddress($input: CreateAddressInput!) {
    createAddress(input: $input)
  }
`

export const getCities = async (): Promise<Array<City>> => {
  try {
    const { data } = await apolloClient.query({
      query: CITIES_QUERY,
    })

    if (data && data.cities) {
      return data.cities
    }
  } catch (e) {
    console.log(e)
  }

  return []
}

export const getAddresses = async (): Promise<Array<Address>> => {
  try {
    const { data } = await apolloClient.query({
      query: ADDRESSES_QUERY,
    })

    if (data && data.addresses) {
      return data.addresses
    }
  } catch (e) {
    console.log(e)
  }

  return []
}

export const useCities = () => {
  const [cities, setCities] = useState<Array<City>>([])

  useEffect(() => {
    getCities().then(setCities).catch(console.error)
  }, [setCities])

  return {
    cities,
  }
}

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Array<Address>>([])

  const reload = () => {
    getAddresses().then(setAddresses).catch(console.error)
  }

  useEffect(() => {
    reload()
  }, [])
  

  return {
    addresses,
    reload
  }
}

export const createAddressAction = async (values: CheckoutFormData) => {
  const { data } = await apolloClient.mutate({
    mutation: CREATE_ADDRESS_MUTATION,
    variables: {
      input: values,
    },
  })

  if (data && data.createAddress) {
    return true
  }

  throw new Error('Something went wrong')
}
