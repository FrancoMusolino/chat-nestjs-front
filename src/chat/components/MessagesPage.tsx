import React from 'react'
import { Stack } from '@chakra-ui/react'

import { ChatTag } from './ChatTag'
import { MessageItem } from './MessageItem'
import { DateTime } from '@/shared/helpers'
import { useStoreSelector } from '@/shared/app/store'

type MessagePageProps = {
  messages: {
    id: string
    content: string
    createdAt: Date
    deleted: boolean
    withDateTag: boolean
    user: {
      id: string
      username: string
      profilePicture?: string
    }
  }[]
}

export const MessagesPage = ({ messages }: MessagePageProps) => {
  const { id, profilePicture } = useStoreSelector('session')

  return (
    <>
      {messages?.map((message, index) => {
        const messageSender = message.user

        const isSender = messageSender.id === id
        const isConsecutive =
          index && messageSender.id === messages![index - 1].user.id

        const messageDateTime = DateTime.createFromDate(message.createdAt)

        const time = messageDateTime.formatDate({
          timeStyle: 'short',
        })

        return (
          <Stack
            mt={
              (isConsecutive && !message.withDateTag) || !index
                ? `${1} !important`
                : `${4} !important`
            }
            key={message.id}
          >
            {message.withDateTag && (
              <ChatTag alignSelf='center' my={4}>
                {messageDateTime.isToday()
                  ? 'Hoy'
                  : messageDateTime.formatDate({ dateStyle: 'medium' })}
              </ChatTag>
            )}
            <MessageItem
              id={message.id}
              content={message.content}
              deleted={message.deleted}
              sender={messageSender.username}
              senderAvatar={
                isSender ? profilePicture : messageSender.profilePicture
              }
              time={time}
              isSender={isSender}
              isConsecutive={!!isConsecutive && !message.withDateTag}
            />
          </Stack>
        )
      })}
    </>
  )
}
