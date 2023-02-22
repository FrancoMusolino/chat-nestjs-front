import React from 'react'
import { Button } from '@chakra-ui/react'
import { useGlobalDispatch } from '../shared/app/store'
import { startSession } from '../shared/features/session/session.actions'

export const Login = () => {
  const dispatch = useGlobalDispatch()

  return (
    <Button
      onClick={() =>
        dispatch(
          startSession({
            id: 'hola',
            session: true,
            token: 'fdl',
            username: 'Juan',
          })
        )
      }
    >
      Login
    </Button>
  )
}
