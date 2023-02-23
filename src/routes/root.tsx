import React from 'react'
import { Navigate } from 'react-router-dom'

import { useStoreSelector } from '@/shared/app/store'

export const Root = () => {
  const { session } = useStoreSelector('session')

  if (!session) {
    return <Navigate to='auth/registro' replace />
  }

  return <div>Root</div>
}
