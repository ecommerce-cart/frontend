import { FC, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'

import authenticatedVar from '@/apollo/vars/auth.vars'
import { apolloClient } from '@/clients/apollo.client'
import globalAuth from '@/globals/auth.global'

interface GuardProps {
  children: JSX.Element
  excludedRoutes?: Array<string>
}

const Guard: FC<GuardProps> = ({ children, excludedRoutes }) => {
  console.log('Guard rendered')
  const router = useRouter()
  const authenticated = useReactiveVar(authenticatedVar)

  const logOut = useCallback(() => {
    apolloClient.clearStore().catch(console.error)
    localStorage?.removeItem('userData')
    router.push('/auth/login')
  }, [router])

  /**
   * We have to use useEffect to inform that this a client component
   * and the logout functionality should be executed in the client side
   */
  useEffect(() => {
    if (
      !authenticated || // by default this is false until we change it's value in the next server side
      (!excludedRoutes?.includes(router.pathname) && !globalAuth.accessToken) // this is to protect the routes in the client side
    ) {
      logOut()
    }
  }, [router.pathname, authenticated, excludedRoutes, logOut])

  return children
}

export default Guard
