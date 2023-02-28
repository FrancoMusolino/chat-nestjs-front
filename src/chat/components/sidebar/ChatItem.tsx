import React from 'react'
import { HStack, Stack, Text } from '@chakra-ui/react'

import { useBrandTheme } from '@/shared/hooks'
import { Avatar } from '@/shared/components/Avatar'

export const ChatItem = () => {
  const { colors } = useBrandTheme()

  return (
    <HStack align='center' spacing={3} cursor='pointer'>
      <Avatar w='40px' h='40px' />
      <HStack
        flexGrow={1}
        paddingBlock={4}
        borderTop={`1px solid ${colors.brand.secondary}`}
        justify='space-between'
      >
        <Stack spacing={1}>
          <Text fontSize='lg' lineHeight={1}>
            Hola
          </Text>
          <Text fontSize='xs' lineHeight={1} color={colors.brand['text-gray']}>
            Hola
          </Text>
        </Stack>
        <Text fontSize='xs' color={colors.brand['text-gray']}>
          12/05/03
        </Text>
      </HStack>
    </HStack>
  )
}
