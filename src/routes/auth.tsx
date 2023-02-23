import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useStoreSelector } from '@/shared/app/store'

export const Auth = () => {
  const { session } = useStoreSelector('session')

  if (session) {
    return <Navigate to='/' replace />
  }

  return <Outlet />
}
