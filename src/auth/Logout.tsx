import React from 'react'
import { Button } from '@chakra-ui/react'
import { endSession } from '../shared/features/session/session.actions'
import { useGlobalDispatch } from '../shared/app/store'

export const Logout = () => {
  const dispatch = useGlobalDispatch()

  return <Button onClick={() => dispatch(endSession())}>Logout</Button>
}
