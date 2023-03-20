import React from 'react'
import { Badge, HStack, Stack, Text } from '@chakra-ui/react'

import { useBrandTheme } from '@/shared/hooks'
import { Avatar } from '@/shared/components/Avatar'

type ChatIntegrantItemProps = {
  username: string
  profilePicture?: string
  status: string
  connected: boolean
  lastConnection?: string
  isCreator: boolean
}

export const ChatIntegrantItem = ({
  username,
  profilePicture,
  status,
  connected,
  lastConnection,
  isCreator,
}: ChatIntegrantItemProps) => {
  const {
    colors: { brand },
  } = useBrandTheme()

  return (
    <HStack justify='space-between'>
      <HStack spacing={3}>
        <Avatar src={profilePicture} />
        <Stack spacing={1}>
          <Text fontSize='lg' lineHeight={1}>
            {username}
          </Text>
          <Text fontSize='xs' lineHeight={1} color={brand['text-gray']}>
            {status}
          </Text>
        </Stack>
      </HStack>
      <HStack spacing={3}>
        {isCreator && (
          <Badge
            bgColor={brand.secondary}
            fontSize='xs'
            fontWeight={500}
            textTransform='none'
          >
            Creador del grupo
          </Badge>
        )}
        <Text
          fontSize='xs'
          textTransform='uppercase'
          color={brand['text-gray']}
        >
          {connected
            ? 'En línea'
            : lastConnection
            ? 'hola'
            : 'Nunca se conectó'}
        </Text>
      </HStack>
    </HStack>
  )
}
