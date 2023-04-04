import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useIsMutating } from '@tanstack/react-query'
import { Box, Stack, Text } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'

import { ChatTag } from './ChatTag'
import { MessagesLog } from './MessagesLog'
import { ScrollToBottomButton } from './ScrollToBottomButton'
import { MessagesLoader } from './loaders/MessagesLoader'
import { MessagesNextPageLoader } from './loaders/MessagesNextPageLoader'
import {
  GetChatMessagesResponse,
  useGetChatMessages,
} from '../services/chat.service'
import { useSubscribeMessageRecievedEvent } from '../hooks/useSubscribeMessageRecievedEvent'
import { SectionWithScroll } from '@/shared/components/SectionWithScroll'
import { useBrandColors } from '@/shared/hooks'
import { throttle } from '@/shared/utils'

export type Messages = GetChatMessagesResponse['messages']

export const Messages = () => {
  const { colors } = useBrandColors()
  const { chatId } = useParams()

  const [totalHeight, setTotalHeight] = useState({
    prev: 0,
    current: 0,
  })
  const [scrollToBottomIsVisible, setScrollToBottomIsVisible] = useState(false)

  useEffect(() => {
    if (!scrollToBottomIsVisible) {
      setMessagesReceived(0)
    }
  }, [scrollToBottomIsVisible])

  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const getMsgContainerScrollHeight = () =>
    messagesContainerRef.current?.scrollHeight as number

  const getMsgContainerOffsetHeight = () =>
    messagesContainerRef.current?.offsetHeight as number

  const getMsgContainerScrollTop = () =>
    messagesContainerRef.current?.scrollTop as number

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = (smooth?: boolean) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
    })
  }

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetChatMessages(chatId!)
  const messagesPages = data?.pages

  useEffect(() => {
    setTotalHeight((prevState) => ({
      prev: prevState.current,
      current: getMsgContainerScrollHeight(),
    }))
  }, [data])

  const orderedMessagesPages = useMemo(() => {
    const reverseMessagePages = [...(messagesPages || [])]
      .reverse()
      .map((page) => ({ ...page, messages: [...page.messages].reverse() }))

    return reverseMessagePages.flatMap((page) => page.messages)
  }, [messagesPages])

  useEffect(() => {
    const msgContainer = messagesContainerRef.current

    msgContainer?.scrollTo(0, msgContainer!.scrollHeight - totalHeight.current)
  }, [messagesPages?.length])

  const { messagesReceived, setMessagesReceived } =
    useSubscribeMessageRecievedEvent(chatId!)

  useEffect(() => {
    if (messagesReceived) {
      const scrollTop = getMsgContainerScrollTop()
      const offsetHeight = getMsgContainerOffsetHeight()

      if (scrollTop + offsetHeight > totalHeight.prev - offsetHeight) {
        scrollToBottom()
        setMessagesReceived(0)

        return
      }

      setScrollToBottomIsVisible(true)
    }
  }, [messagesReceived])

  const handleScroll = () => {
    const offsetHeight = getMsgContainerOffsetHeight()
    const howMuchUserCanScroll = getMsgContainerScrollTop()

    if (howMuchUserCanScroll + offsetHeight == totalHeight.current) {
      setScrollToBottomIsVisible(false)
    }

    if (hasNextPage && howMuchUserCanScroll === 0) {
      fetchNextPage()
    }
  }

  const isMutatingChatMessages = useIsMutating({
    mutationKey: ['submit-message', chatId],
  })

  useEffect(() => {
    scrollToBottom()
  }, [messagesEndRef.current, chatId])

  useEffect(() => {
    if (isMutatingChatMessages > 0) {
      scrollToBottom()
    }
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
      onScroll={throttle(handleScroll, 400)}
    >
      <AnimatePresence>
        {isFetchingNextPage && <MessagesNextPageLoader />}
      </AnimatePresence>
      {isLoading ? (
        <Stack spacing={5}>
          <MessagesLoader />
        </Stack>
      ) : orderedMessagesPages.length ? (
        <MessagesLog messages={orderedMessagesPages} />
      ) : (
        <ChatTag alignSelf='center' textTransform='none'>
          Chat sin mensajes 😢. Que esperás para comenzar a enviarlos!!
        </ChatTag>
      )}

      <AnimatePresence>
        {scrollToBottomIsVisible && (
          <ScrollToBottomButton
            onClick={() => {
              setScrollToBottomIsVisible(false)
              scrollToBottom()
            }}
          >
            <Stack
              position='absolute'
              top={-2.5}
              right={-1.5}
              w='20px'
              h='20px'
              align='center'
              justify='center'
              bgColor={colors.primary}
              borderRadius='full'
            >
              <Text as='span' fontSize='13px'>
                {messagesReceived}
              </Text>
            </Stack>
          </ScrollToBottomButton>
        )}
      </AnimatePresence>

      <Box ref={messagesEndRef} mt={`${0} !important`} />
    </SectionWithScroll>
  )
}
