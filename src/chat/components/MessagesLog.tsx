import React from 'react'
import { Stack } from '@chakra-ui/react'

import { MessageItem } from './MessageItem'
import { DateTime } from '@/shared/helpers'
import { useStoreSelector } from '@/shared/app/store'
import { GetChatMessagesResponse } from '../services/chat.service'

type MessagePageProps = {
  messages: GetChatMessagesResponse['messages']
}

export const MessagesLog = ({ messages }: MessagePageProps) => {
  const { id, profilePicture } = useStoreSelector('session')

  return (
    <Stack spacing={4}>
      {messages?.map((message, index) => {
        const messageSender = message.user

        const isSender = messageSender.id === id
        const isConsecutive =
          index && messageSender.id === messages![index - 1].user.id

        const messageDateTime = DateTime.createFromDate(message.createdAt)

        const sameDateThatLastMessage: boolean = Boolean(
          index &&
            messageDateTime.dayDiff(
              DateTime.createFromDate(messages![index - 1].createdAt)
            ) === 0
        )

        return (
          <MessageItem
            key={message.id}
            id={message.id}
            content={message.content}
            deleted={message.deleted}
            sender={messageSender.username}
            senderAvatar={
              isSender ? profilePicture : messageSender.profilePicture
            }
            dateTime={messageDateTime}
            isSender={isSender}
            isConsecutive={!!isConsecutive && sameDateThatLastMessage}
            sameDateThatLastMessage={sameDateThatLastMessage}
          />
        )
      })}
    </Stack>
  )
}
