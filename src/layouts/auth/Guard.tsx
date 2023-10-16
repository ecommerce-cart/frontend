import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'

import authenticatedVar from '@/apollo/vars/auth.vars'
import { BasicUser } from '@/types/user'
import { apolloClient } from '@/clients/apollo.client'

const getUser = (): BasicUser | null => {
  try {
    return JSON.parse(localStorage.getItem('userData') || '')
  } catch (e) {
    return null
  }
}

interface GuardProps {
  children: JSX.Element
  excludedRoutes?: Array<string>
}

const Guard: FC<GuardProps> = ({ children, excludedRoutes }) => {
  const router = useRouter()

  const authenticated = useReactiveVar(authenticatedVar)

  /**
   * See if we have a user in the localStorage
   * if we do have a user then we are authenticated
   */
  useEffect(() => {
    if (!excludedRoutes?.includes(router.pathname)) {
      let user = getUser()
      authenticatedVar(!!user)
    }
  }, [router.pathname, excludedRoutes])

  /**
   * If the user is not auth then clear the storage
   * and go to the register page
   */
  useEffect(() => {
    if (!authenticated && !excludedRoutes?.includes(router.pathname)) {
      apolloClient.clearStore().catch(console.error)
      localStorage.removeItem('userData')
      router.push('/register')
    }
  }, [authenticated, router, excludedRoutes])

  return <>{children}</>
}

export default Guard
