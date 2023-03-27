import React from 'react'
import { useParams } from 'react-router-dom'
import { Stack, Text } from '@chakra-ui/react'

import { ChatDescription } from './ChatDescription'
import { useBrandColors } from '@/shared/hooks'
import { DateTime } from '@/shared/helpers'
import { useSelectedChat } from '@/chat/hooks/useSelectedChat'

export const ChatDetails = () => {
  const { colors } = useBrandColors()

  const { chatId } = useParams()

  const { selectedChat } = useSelectedChat(chatId!)

  return (
    <Stack px={6}>
      <ChatDescription description={selectedChat?.description || ''} />
      <Text fontSize='sm' color={colors['text-gray']}>
        Grupo creado por {selectedChat?.createdBy} el{' '}
        {selectedChat &&
          DateTime.createFromDate(selectedChat!.createdAt).formatDate({
            dateStyle: 'short',
            timeStyle: 'short',
          })}
      </Text>
    </Stack>
  )
}
