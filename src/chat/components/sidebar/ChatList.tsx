import React from 'react'

import { ChatItem } from './ChatItem'
import { EmptyChatList } from './EmptyChatList'

import { useBrandTheme, useErrorMessage } from '@/shared/hooks'
import { SectionWithScroll } from '@/shared/components/SectionWithScroll'
import { useGetUserChats } from '@/chat/services/chat.service'
import { useStoreSelector } from '@/shared/app/store'
import { ChatItemLoader } from '../loaders/ChatItemLoader'

export const ChatList = () => {
  const { colors } = useBrandTheme()

  const { id } = useStoreSelector('session')

  const { data, error, isLoading } = useGetUserChats(id)

  useErrorMessage(error)

  return (
    <SectionWithScroll
      maxH='calc(100vh - 75px - 70px)'
      spacing={0}
      paddingInline={3}
      borderBottom={`1px solid ${colors.brand.secondary}`}
      overflowY='scroll'
    >
      {isLoading ? (
        <ChatItemLoader />
      ) : data?.data.chats.length ? (
        data.data.chats.map(({ id, title, messages, avatar }) => (
          <ChatItem
            key={id}
            title={title}
            avatar={avatar}
            lastMessage={
              messages.length
                ? {
                    hasMessage: true,
                    content: `${messages[0].user.username}: ${messages[0].content}`,
                    lastMessageDate: messages[0].createdAt,
                  }
                : { hasMessage: false }
            }
          />
        ))
      ) : (
        <EmptyChatList />
      )}
    </SectionWithScroll>
  )
}
