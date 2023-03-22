import React from 'react'
import { Heading, Stack, Text } from '@chakra-ui/react'

import { useBrandColors } from '@/shared/hooks'

type PresentationProps = {
  title: string
  description: string
}

export const Presentation = ({ title, description }: PresentationProps) => {
  const { colors } = useBrandColors()

  return (
    <Stack spacing={0} textAlign='center'>
      <Heading fontSize='5xl' fontWeight={500} lineHeight={1.25}>
        {title}
      </Heading>
      <Text color={colors['text-gray']}>{description}</Text>
    </Stack>
  )
}
