import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
import React from 'react'

const SomeComponent = () => {
  const { user } = useUser()
  if (!user) return <div>We have no user</div>
  return (
    <div>
      <Link href='/api/auth/logout'>some Component {user?.email}</Link>
    </div>
  )
}

export default SomeComponent