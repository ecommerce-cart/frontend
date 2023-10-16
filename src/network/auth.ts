import { gql } from '@apollo/client'

import globalAuth from '@/globals/auth.global'
import { RegisterFormData } from '@/types/registration'
import { BasicUser } from '@/types/user'
import { apolloClient } from '@/clients/apollo.client'

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken {
    refreshToken {
      accessToken
    }
  }
`

const REGISTER_MUTATION = gql`
  mutation RegisterCustomer($input: RegisterCustomerInput!) {
    registerCustomer(input: $input) {
      id
      email
      name
      accessToken
    }
  }
`

export const ME_QUERY = gql`
  query MeCustomer {
    meCustomer {
      id
      name
      email
      phone
    }
  }
`

export const register = async (inputs: RegisterFormData) => {
  const { data } = await apolloClient.mutate({
    mutation: REGISTER_MUTATION,
    variables: {
      input: inputs,
    },
  })

  if (data && data.registerCustomer) {
    globalAuth.setAccessToken(data.registerCustomer.accessToken)
    localStorage.setItem(
      'userData',
      JSON.stringify({
        email: data.registerCustomer.email,
        name: data.registerCustomer.name,
      })
    )
  }
}

export const me = async (): Promise<BasicUser | Partial<BasicUser>> => {
  const { data } = await apolloClient.query({
    query: ME_QUERY,
  })

  if (data && data.meCustomer) {
    return data.meCustomer
  }

  return {}
}

export const refreshAccessToken = async (): Promise<string> => {
  console.log('accessToken expired calling refreshToken')

  const { data } = await apolloClient.mutate({
    mutation: REFRESH_TOKEN_MUTATION,
  })

  if (data && data.refreshToken) {
    return data.refreshToken.accessToken
  }

  throw new Error('Token refresh failed')
}
