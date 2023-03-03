import React from 'react'
import { HStack, Stack, Text } from '@chakra-ui/react'

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
    <HStack
      align='center'
      paddingInline={3}
      spacing={3}
      cursor='pointer'
      _hover={{ bgColor: colors.brand.secondary }}
    >
      <Avatar src={avatar || ''} isGroupPicture />
      <HStack
        flexGrow={1}
        justify='space-between'
        paddingBlock={4}
        overflow='hidden'
        borderTop={`1px solid ${colors.brand.secondary}`}
      >
        <Stack flexGrow={1} spacing={1} overflow='hidden'>
          <Text
            fontSize='lg'
            lineHeight={1}
            width='95%'
            whiteSpace='nowrap'
            overflow='hidden'
            textOverflow='ellipsis'
          >
            {title}
          </Text>
          <Text
            width='95%'
            whiteSpace='nowrap'
            overflow='hidden'
            textOverflow='ellipsis'
            fontSize='xs'
            lineHeight={1}
            color={colors.brand['text-gray']}
          >
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
