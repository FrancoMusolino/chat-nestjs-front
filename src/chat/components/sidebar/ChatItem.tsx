import React, { useState, useEffect } from 'react'
import { HStack, Skeleton, Stack, Text } from '@chakra-ui/react'

import { useBrandTheme } from '@/shared/hooks'
import { Avatar } from '@/shared/components/Avatar'
import { DateTime } from '@/shared/helpers'

type ChatItemProps = {
  title: string
  avatar?: string
  lastMessage: {
    hasMessage: boolean
    content?: string
    lastMessageDate?: Date
  }
}

export const ChatItem = ({
  title,
  avatar,
  lastMessage: { hasMessage, content, lastMessageDate },
}: ChatItemProps) => {
  const { colors } = useBrandTheme()

  let messageDateTime: DateTime

  if (hasMessage) {
    messageDateTime = DateTime.createFromDate(lastMessageDate!)
  }

  return (
    <HStack align='center' spacing={3} cursor='pointer'>
      <Avatar src={avatar || ''} />
      <HStack
        flexGrow={1}
        paddingBlock={4}
        borderTop={`1px solid ${colors.brand.secondary}`}
        justify='space-between'
      >
        <Stack spacing={1}>
          <Text fontSize='lg' lineHeight={1}>
            {title}
          </Text>
          <Text fontSize='xs' lineHeight={1} color={colors.brand['text-gray']}>
            {content || 'Empieza a enviar mensajes al chat!!'}
          </Text>
        </Stack>
        {hasMessage && (
          <Text fontSize='xs' color={colors.brand['text-gray']}>
            {messageDateTime!.isToday() ? 'Hoy' : messageDateTime!.formatDate()}
          </Text>
        )}
      </HStack>
    </HStack>
  )
}

//TODO

// Ver que pasa si el mensaje / titulo es mas largo
// Loader chat items
