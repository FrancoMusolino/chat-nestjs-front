import React from 'react'
import { useParams } from 'react-router-dom'
import { Stack, Text } from '@chakra-ui/react'

import { ChatIntegrantItem } from './ChatIntegrantItem'
import { ChatIntegrantLoader } from './loaders/ChatIntegrantLoader'
import { useGetChatIntegrants } from '../services/chat.service'
import { useBrandTheme } from '@/shared/hooks'
import { SectionWithScroll } from '@/shared/components/SectionWithScroll'
import { useStoreSelector } from '@/shared/app/store'

export const ChatIntegrants = () => {
  const {
    colors: { brand },
  } = useBrandTheme()

  const { chatId } = useParams()

  const { id, token, session, ...stateUser } = useStoreSelector('session')

  const { data, isLoading } = useGetChatIntegrants(chatId!)

  const users = data?.data.users

  return (
    <Stack py={4} px={16} spacing={4} overflowY='hidden'>
      <Text color={brand['text-gray']} fontSize='sm'>
        {isLoading ? 'Cargando...' : `${users?.length} participantes`}
      </Text>

      <SectionWithScroll pr={3} spacing={5}>
        {isLoading ? (
          <ChatIntegrantLoader />
        ) : (
          users?.map((user) =>
            user.id === id ? (
              <ChatIntegrantItem
                key={id}
                isCreator={stateUser.username === data?.data.createdBy}
                {...user}
                {...stateUser}
              />
            ) : (
              <ChatIntegrantItem
                key={user.id}
                isCreator={user.username === data?.data.createdBy}
                {...user}
              />
            )
          )
        )}
      </SectionWithScroll>
    </Stack>
  )
}
