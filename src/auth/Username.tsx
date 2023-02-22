import React from 'react'
import { useStoreSelector } from '../shared/app/store'

export const Username = () => {
  const { username } = useStoreSelector('session')

  return <div>{username}</div>
}
