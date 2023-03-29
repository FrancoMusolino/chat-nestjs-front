import React from 'react'
import { useParams } from 'react-router-dom'
import { Stack, Text } from '@chakra-ui/react'

import { ChatIntegrantItem } from './ChatIntegrantItem'
import { ChatIntegrantLoader } from '../loaders/ChatIntegrantLoader'
import { useGetChatIntegrants } from '../../services/chat.service'
import { useBrandColors } from '@/shared/hooks'
import { useStoreSelector } from '@/shared/app/store'

export const ChatIntegrants = () => {
  const { colors } = useBrandColors()

  const { chatId } = useParams()

  const { id, token, session, ...stateUser } = useStoreSelector('session')

  const { data, isLoading } = useGetChatIntegrants(chatId!)

  const users = data?.users
  const chatCreator = data?.createdBy

  return (
    <Stack px={6} spacing={4}>
      <Text color={colors['text-gray']} fontSize='sm'>
        {isLoading
          ? 'Cargando...'
          : users!.length > 1
          ? `${users?.length} participantes`
          : '1 participante'}
      </Text>

      <Stack spacing={isLoading ? 3 : 5}>
        {isLoading ? (
          <ChatIntegrantLoader />
        ) : (
          users?.map((user) =>
            user.id === id ? (
              <ChatIntegrantItem
                key={id}
                isCreator={stateUser.username === chatCreator}
                {...user}
                {...stateUser}
                username='Tú'
              />
            ) : (
              <ChatIntegrantItem
                key={user.id}
                isCreator={user.username === chatCreator}
                showMenu={stateUser.username === chatCreator}
                {...user}
              />
            )
          )
        )}
      </Stack>
    </Stack>
  )
}
