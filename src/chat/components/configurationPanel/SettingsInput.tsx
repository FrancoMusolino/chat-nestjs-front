import React from 'react'
import { FormControl, FormLabel, Input, InputProps } from '@chakra-ui/react'

import { useBrandTheme } from '@/shared/hooks'

type SettingsInputProps = {
  label: string
} & InputProps

export const SettingsInput = ({ label, ...props }: SettingsInputProps) => {
  const { colors } = useBrandTheme()

  return (
    <FormControl>
      <FormLabel mb={0} fontSize='sm' color={colors.brand.primary}>
        {label}
      </FormLabel>
      <Input
        w='full'
        borderColor={colors.brand.secondary}
        cursor='auto'
        {...props}
        variant='flushed'
      />
    </FormControl>
  )
}
