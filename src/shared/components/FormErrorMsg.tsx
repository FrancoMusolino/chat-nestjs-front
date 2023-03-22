import React, { ReactNode } from 'react'
import { FormErrorMessage } from '@chakra-ui/react'
import { useBrandColors } from '../hooks'

type FormErrorMsgProps = {
  children: ReactNode
}

export const FormErrorMsg = ({ children }: FormErrorMsgProps) => {
  const { colors } = useBrandColors()

  return (
    <FormErrorMessage fontSize='xs' color={colors.danger}>
      {children}
    </FormErrorMessage>
  )
}
