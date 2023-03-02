import React, { ReactNode } from 'react'
import { FormErrorMessage } from '@chakra-ui/react'
import { useBrandTheme } from '../hooks'

type FormErrorMsgProps = {
  children: ReactNode
}

export const FormErrorMsg = ({ children }: FormErrorMsgProps) => {
  const { colors } = useBrandTheme()

  return (
    <FormErrorMessage fontSize='xs' color={colors.brand.danger}>
      {children}
    </FormErrorMessage>
  )
}
