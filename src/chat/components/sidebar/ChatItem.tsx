import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HStack, Stack, Text } from '@chakra-ui/react'

import { useBrandColors } from '@/shared/hooks'
import { Avatar } from '@/shared/components/Avatar'
import { DateTime } from '@/shared/helpers'

type ChatItemProps = {
  id: string
  title: string
  avatar?: string
  lastMessage: {
    hasMessage: boolean
    content?: string
    lastMessageDate?: Date
  }
}

export const ChatItem = ({
  id,
  title,
  avatar,
  lastMessage: { hasMessage, content, lastMessageDate },
}: ChatItemProps) => {
  const { colors } = useBrandColors()

  const navigate = useNavigate()
  const { chatId } = useParams()

  let messageDateTime: DateTime

  if (hasMessage) {
    messageDateTime = DateTime.createFromDate(lastMessageDate!)
  }

  return (
    <HStack
      align='center'
      px={3}
      spacing={3}
      cursor='pointer'
      bgColor={chatId === id ? colors.secondary : 'transparent'}
      _hover={{ bgColor: colors.secondary }}
      onClick={() => navigate(`chat/${id}`)}
    >
      <Avatar src={avatar || ''} isGroupPicture />
      <HStack
        flexGrow={1}
        justify='space-between'
        paddingBlock={4}
        overflow='hidden'
        borderTop={`1px solid ${colors.secondary}`}
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
            color={colors['text-gray']}
          >
            {content || 'Empieza a enviar mensajes al chat!!'}
          </Text>
        </Stack>
        {hasMessage && (
          <Text fontSize='xs' color={colors['text-gray']}>
            {messageDateTime!.isToday() ? 'Hoy' : messageDateTime!.formatDate()}
          </Text>
        )}
      </HStack>
    </HStack>
  )
}
