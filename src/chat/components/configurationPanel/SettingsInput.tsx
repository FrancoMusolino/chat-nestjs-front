import React from 'react'
import { FormControl, FormLabel, Input, InputProps } from '@chakra-ui/react'

import { useBrandColors } from '@/shared/hooks'

type SettingsInputProps = {
  label: string
} & InputProps

export const SettingsInput = ({ label, ...props }: SettingsInputProps) => {
  const { colors } = useBrandColors()

  return (
    <FormControl>
      <FormLabel mb={0} fontSize='sm' color={colors.primary}>
        {label}
      </FormLabel>
      <Input
        w='full'
        borderColor={colors.secondary}
        cursor='auto'
        {...props}
        variant='flushed'
      />
    </FormControl>
  )
}
