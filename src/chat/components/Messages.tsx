import React, { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'

import { MessageItem } from './MessageItem'
import { SectionWithScroll } from '@/shared/components/SectionWithScroll'

export const Messages = () => {
  const messagesEndRef = useRef<any>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  return (
    <SectionWithScroll flexGrow={1} flexShrink={1} py={5} px={10} spacing={4}>
      <MessageItem isSender isConsecutive={false} />
      <MessageItem isSender isConsecutive />
      <MessageItem isSender={false} isConsecutive={false} />
      <MessageItem isSender={false} isConsecutive={false} />
      <MessageItem isSender={false} isConsecutive />
      <MessageItem isSender={false} isConsecutive />
      <MessageItem isSender={false} isConsecutive />
      <MessageItem isSender={false} isConsecutive />
      <MessageItem isSender={false} isConsecutive />
      <MessageItem isSender={false} isConsecutive />
      <MessageItem isSender={false} isConsecutive />
      <MessageItem isSender={false} isConsecutive />
      <Box ref={messagesEndRef} mt={`${0} !important`} />
    </SectionWithScroll>
  )
}
