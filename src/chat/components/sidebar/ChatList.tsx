import React from 'react'

import { ChatItem } from './ChatItem'
import { EmptyChatList } from './EmptyChatList'
import { ChatItemLoader } from '../loaders/ChatItemLoader'

import { useBrandColors, useErrorMessage } from '@/shared/hooks'
import { SectionWithScroll } from '@/shared/components/SectionWithScroll'
import { useGetUserChats } from '@/shared/services/user.service'
import { useStoreSelector } from '@/shared/app/store'

export const ChatList = () => {
  const { colors } = useBrandColors()

  const { id } = useStoreSelector('session')
  const { filter } = useStoreSelector('chat')

  const { data, error, isLoading } = useGetUserChats(id)

  useErrorMessage(error)

  let chats = data?.chats

  if (filter) {
    chats = chats?.filter((chat) =>
      chat.title.toLowerCase().includes(filter.toLowerCase())
    )
  }

  return (
    <SectionWithScroll
      maxH='calc(100% - 75px - 70px)'
      spacing={0}
      borderBottom={`1px solid ${colors.secondary}`}
    >
      {isLoading ? (
        <ChatItemLoader />
      ) : chats!.length ? (
        chats!.map(({ id, title, messages, avatar }) => (
          <ChatItem
            key={id}
            id={id}
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
        <EmptyChatList dueToFilter={!!filter} />
      )}
    </SectionWithScroll>
  )
}
