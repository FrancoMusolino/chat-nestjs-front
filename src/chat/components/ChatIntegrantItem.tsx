import React from 'react'
import { Badge, HStack, Stack, Text } from '@chakra-ui/react'

import { useBrandTheme } from '@/shared/hooks'
import { Avatar } from '@/shared/components/Avatar'

export const ChatIntegrantItem = () => {
  const {
    colors: { brand },
  } = useBrandTheme()

  return (
    <HStack justify='space-between'>
      <HStack>
        <Avatar />
        <Stack spacing={1}>
          <Text fontSize='lg' lineHeight={1}>
            Juancito
          </Text>
          <Text fontSize='xs' lineHeight={1} color={brand['text-gray']}>
            Disponible
          </Text>
        </Stack>
      </HStack>
      <HStack spacing={3}>
        <Badge
          bgColor={brand.secondary}
          fontSize='xs'
          fontWeight={500}
          textTransform='none'
        >
          Creador del grupo
        </Badge>
        <Text
          fontSize='xs'
          textTransform='uppercase'
          color={brand['text-gray']}
        >
          En línea
        </Text>
      </HStack>
    </HStack>
  )
}
