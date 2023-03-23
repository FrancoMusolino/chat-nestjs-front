import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Stack } from '@chakra-ui/react'

import { MessageItem } from './MessageItem'
import { ChatTag } from './ChatTag'
import { MessagesLoader } from './loaders/MessagesLoader'
import { useGetChatMessages } from '../services/chat.service'

import { SectionWithScroll } from '@/shared/components/SectionWithScroll'
import { useStoreSelector } from '@/shared/app/store'
import { DateTime } from '@/shared/helpers'

export const Messages = () => {
  const { chatId } = useParams()

  const messagesEndRef = useRef<any>(null)

  const { id, profilePicture } = useStoreSelector('session')

  const { data, isLoading } = useGetChatMessages(chatId!)
  const messages = data?.data.messages

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <SectionWithScroll flexGrow={1} flexShrink={1} py={5} px={10} spacing={0}>
      {isLoading ? (
        <Stack spacing={5}>
          <MessagesLoader />
        </Stack>
      ) : messages?.length ? (
        messages?.map((message, index) => {
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
        })
      ) : (
        <ChatTag alignSelf='center' textTransform='none'>
          Chat sin mensajes 😢. Que esperás para comenzar a enviarlos!!
        </ChatTag>
      )}

      <Box ref={messagesEndRef} mt={`${0} !important`} />
    </SectionWithScroll>
  )
}
