import { apolloClient } from '@/clients/apollo.client'
import { ShippingAddressFormData } from '@/components/app/Checkout/CreateShippingAddress'
import { getStorageItem } from '@/lib/json.lib'
import { Address, City } from '@/types/address.types'
import { gql } from '@apollo/client'
import { useEffect, useState } from 'react'

const CITIES_QUERY = gql`
  query Cities {
    cities {
      id
      name
    }
  }
`
const ADDRESSES_QUERY = gql`
  query Addresses {
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
  return JSON.parse(localStorage.getItem("addresses") || "[]")
}

export const getAddressesApi = async (): Promise<Array<Address>> => {
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
    if(getStorageItem('userData')){
      getAddressesApi().then(setAddresses).catch(console.error)
    }
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

export const createAddress = async (values: ShippingAddressFormData) => {
  const addresses = JSON.parse(localStorage.getItem("addresses") || "[]")
  addresses.push(values)
  localStorage.setItem("addresses", JSON.stringify(addresses))
  return true
};

export const createAddressApi = async (values: ShippingAddressFormData) => {
  const { data } = await apolloClient.mutate({
    mutation: CREATE_ADDRESS_MUTATION,
    variables: {
      input: values,
    },
  })

  if (data && data.createAddress) {
    return true
  }

  throw new Error("Something went wrong")
};

export const createAddressAction = async (values: ShippingAddressFormData) => {
  if (getStorageItem("userData")) {
    return createAddressApi(values)
  }
  return createAddress(values)
};
