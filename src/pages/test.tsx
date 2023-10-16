import { me } from '@/network/auth'
import { BasicUser } from '@/types/user'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Test = () => {
  const [user, setUser] = useState<Partial<BasicUser>>({})

  const router = useRouter()

  useEffect(() => {
    me()
      .then((user) => setUser(user))
      .catch(console.error)
  })
  return (
    <div>
      <h1>
        name:{user.name}, email: {user.email}
      </h1>
      <button onClick={() => router.push('/')}>Go Home</button>
    </div>
  )
}

export default Test
