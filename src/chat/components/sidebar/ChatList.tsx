import React from 'react'

import { ChatItem } from './ChatItem'
import { EmptyChatList } from './EmptyChatList'

import { useBrandTheme } from '@/shared/hooks'
import { SectionWithScroll } from '@/shared/components/SectionWithScroll'

export const ChatList = () => {
  const { colors } = useBrandTheme()

  return (
    <SectionWithScroll
      maxH='calc(100vh - 75px - 70px)'
      spacing={0}
      paddingInline={3}
      borderBottom={`1px solid ${colors.brand.secondary}`}
      overflowY='scroll'
    >
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      {/* <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem /> */}
      {/* <EmptyChatList /> */}
    </SectionWithScroll>
  )
}
