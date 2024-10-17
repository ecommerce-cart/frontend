import { gql } from '@apollo/client'

import globalAuth from '@/globals/auth.global'
import { RegisterFormData } from '@/types/registration'
import { BasicUser } from '@/types/user'
import { apolloClient } from '@/clients/apollo.client'
import { LoginFormData } from '@/types/login'

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

const LOGIN_MUTATION = gql`
  mutation LoginCustomer($input: LoginCustomerInput!) {
    loginCustomer(input: $input) {
      id
      email
      name
      accessToken
    }
  }
`
const LOGOUT_MUTATION = gql`
  mutation LogoutCustomer {
    logoutCustomer
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
      }),
    )
  }
}

export const loginAction = async (inputs: LoginFormData) => {
  const { data } = await apolloClient.mutate({
    mutation: LOGIN_MUTATION,
    variables: {
      input: inputs,
    },
  })

  if (data && data.loginCustomer) {
    globalAuth.setAccessToken(data.loginCustomer.accessToken)
    localStorage.setItem(
      'userData',
      JSON.stringify({
        email: data.loginCustomer.email,
        name: data.loginCustomer.name,
      }),
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

export const logoutAction = async () => {
  await apolloClient.mutate({
    mutation: LOGOUT_MUTATION,
  })

  localStorage.removeItem('userData')
  globalAuth.setAccessToken('')
}
