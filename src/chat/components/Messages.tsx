import React, { useState, useEffect, useRef, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useIsMutating } from '@tanstack/react-query'
import { Box, Stack } from '@chakra-ui/react'

import { ChatTag } from './ChatTag'
import { MessagesLoader } from './loaders/MessagesLoader'
import {
  GetChatMessagesResponse,
  useGetChatMessages,
} from '../services/chat.service'
import { SectionWithScroll } from '@/shared/components/SectionWithScroll'
import { MessagesPage } from './MessagesPage'
import { DateTime } from '@/shared/helpers'
import { MessagesNextPageLoader } from './loaders/MessagesNextPageLoader'

type Messages = GetChatMessagesResponse['messages']

export const Messages = () => {
  const { chatId } = useParams()

  const [prevTotalHeight, setPrevTotalHeight] = useState(0)

  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetChatMessages(chatId!)
  const messagesPages = data?.pages

  const orderedMessagesPages = useMemo(() => {
    const reverseMessagePages = [...(messagesPages || [])]
      .reverse()
      .map((page) => ({ ...page, messages: [...page.messages].reverse() }))

    return reverseMessagePages.map((page, pageIndex) =>
      page.messages.map((message, messageIndex) => {
        const messageDateTime = DateTime.createFromDate(message.createdAt)

        const isTheFirstMessage: boolean = !pageIndex && !messageIndex

        const sameDateThatLastMessage: boolean = Boolean(
          !isTheFirstMessage &&
            messageDateTime.dayDiff(
              DateTime.createFromDate(
                messageIndex
                  ? page.messages![messageIndex - 1].createdAt
                  : reverseMessagePages[pageIndex - 1].messages.at(-1)!
                      .createdAt
              )
            ) === 0
        )

        return sameDateThatLastMessage
          ? { ...message, withDateTag: false }
          : { ...message, withDateTag: true }
      })
    )
  }, [messagesPages])

  useEffect(() => {
    const msgContainer = messagesContainerRef.current

    const handleScroll = async () => {
      const howMuchUserCanScroll = msgContainer!.scrollTop

      if (hasNextPage && howMuchUserCanScroll === 0) {
        fetchNextPage()
      }
    }

    msgContainer?.addEventListener('scroll', handleScroll)

    if (!hasNextPage) {
      msgContainer?.removeEventListener('scroll', handleScroll)
    }

    return () => {
      msgContainer?.removeEventListener('scroll', handleScroll)
    }
  }, [messagesContainerRef.current, hasNextPage])

  useEffect(() => {
    const msgContainer = messagesContainerRef.current

    msgContainer?.scrollTo(0, msgContainer!.scrollHeight - prevTotalHeight)

    setPrevTotalHeight(msgContainer?.scrollHeight || 0)
  }, [messagesPages])

  const isMutatingChatMessages = useIsMutating({
    mutationKey: ['submit-message', chatId],
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
    scrollToBottom()
  }, [messagesEndRef.current, chatId])

  useEffect(() => {
    isMutatingChatMessages > 0 && scrollToBottom()
  }, [messagesEndRef.current, isMutatingChatMessages])

  return (
    <SectionWithScroll
      ref={messagesContainerRef}
      position='relative'
      flexGrow={1}
      flexShrink={1}
      py={5}
      px={10}
      spacing={0}
    >
      <AnimatePresence>
        {isFetchingNextPage && <MessagesNextPageLoader />}
      </AnimatePresence>
      {isLoading ? (
        <Stack spacing={5}>
          <MessagesLoader />
        </Stack>
      ) : orderedMessagesPages![0]?.length ? (
        orderedMessagesPages.map((messages, i) => (
          <MessagesPage key={i} messages={messages} />
        ))
      ) : (
        <ChatTag alignSelf='center' textTransform='none'>
          Chat sin mensajes 😢. Que esperás para comenzar a enviarlos!!
        </ChatTag>
      )}

      <Box ref={messagesEndRef} mt={`${0} !important`} />
    </SectionWithScroll>
  )
}
