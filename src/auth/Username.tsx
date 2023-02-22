import React from 'react'
import { useGlobalStore } from '../shared/app/store'

export const Username = () => {
  const { state } = useGlobalStore()

  return <div>{state.session.username}</div>
}
