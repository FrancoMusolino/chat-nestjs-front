import React from 'react'
import { Stack } from '@chakra-ui/react'

import { ChatTag } from './ChatTag'
import { MessageItem } from './MessageItem'
import { DateTime } from '@/shared/helpers'
import { useStoreSelector } from '@/shared/app/store'
import { GetChatMessagesResponse } from '../services/chat.service'

type MessagePageProps = { messages: GetChatMessagesResponse['messages'] }

export const MessagesLog = ({ messages }: MessagePageProps) => {
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

        const sameDateThatLastMessage: boolean = Boolean(
          index &&
            messageDateTime.dayDiff(
              DateTime.createFromDate(messages![index - 1].createdAt)
            ) === 0
        )

        return (
          <Stack
            mt={
              (isConsecutive && sameDateThatLastMessage) || !index
                ? `${1} !important`
                : `${4} !important`
            }
            key={message.id}
          >
            {!sameDateThatLastMessage && (
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
              isConsecutive={!!isConsecutive && sameDateThatLastMessage}
            />
          </Stack>
        )
      })}
    </>
  )
}
