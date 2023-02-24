import React, { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'

import { isMyKnownError } from '../guards'

export const useErrorMessage = (error: unknown) => {
  const toast = useToast({
    status: 'error',
  })

  useEffect(() => {
    if (error) {
      toast.closeAll()

      if (isMyKnownError(error)) {
        toast({
          description: error.message,
        })
      } else {
        toast({
          description: 'Algo salió mal',
        })
      }
    }
  }, [error])
}
