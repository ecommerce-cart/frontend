import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  fromPromise,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'

import globalAuth from '@/globals/auth.global'
import { refreshAccessToken } from '@/network/auth'
import authenticatedVar from '@/apollo/vars/auth.vars'

const httpLink = new HttpLink({
  uri: 'http://localhost:6002/graphql/',
  credentials: 'include',
})

/**
 * Handle unauthenticated server errors
 * if there is UNAUTHENTICATED code returned
 * from the server then try to refresh the token
 */
const logoutLink = onError(({ graphQLErrors, forward, operation }) => {
  if (
    graphQLErrors?.length &&
    graphQLErrors[0].extensions?.code === 'UNAUTHENTICATED'
  ) {
    console.log('graphQLErrors', graphQLErrors)
    return fromPromise(
      refreshAccessToken().catch((error) => {
        authenticatedVar(false)
        return
      })
    )
      .filter((value) => Boolean(value))
      .flatMap((accessToken) => {
        globalAuth.setAccessToken(`${accessToken}`)
        const oldHeaders = operation.getContext().headers
        operation.setContext({
          headers: {
            ...oldHeaders,
            authorization: `Bearer ${accessToken}`,
          },
        })
        return forward(operation)
      })
  }
})

const authLink = setContext((_, { headers }) => {
  const accessToken = globalAuth.getAccessToken()
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  }
})

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(logoutLink.concat(httpLink)),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})
