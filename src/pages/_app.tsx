import React from 'react'
import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'

import Guard from '@/layouts/auth/Guard'
import '@/styles/globals.css'
import { apolloClient } from '@/clients/apollo.client'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Guard excludedRoutes={['/auth/login', '/auth/register', '/', '/products', '/products/[id]', '/orders', '/checkout']}>
        <Component {...pageProps} />
      </Guard>
    </ApolloProvider>
  )
}
