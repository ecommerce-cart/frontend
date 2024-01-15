import { BasicUser } from '@/types/user'
import { useEffect, useState } from 'react'

export const useUser = () => {
  const [user, setUser] = useState<BasicUser | null>()

  useEffect(() => {
    const userStorage = localStorage.getItem('userData')
    if (userStorage && userStorage !== undefined) {
      setUser({
        ...JSON.parse(userStorage),
        image:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      })
    }
  }, [setUser])

  return {
    user,
  }
}
