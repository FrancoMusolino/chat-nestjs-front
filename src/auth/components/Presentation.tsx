import React from 'react'
import { Heading, Stack, Text, useTheme } from '@chakra-ui/react'

import { BrandTheme } from '@/theme'

type PresentationProps = {
  title: string
  description: string
}

export const Presentation = ({ title, description }: PresentationProps) => {
  const { colors } = useTheme<BrandTheme>()

  return (
    <Stack spacing={0} textAlign='center'>
      <Heading fontSize='5xl' fontWeight={500} lineHeight={1.25}>
        {title}
      </Heading>
      <Text color={colors.brand['text-gray']}>{description}</Text>
    </Stack>
  )
}
