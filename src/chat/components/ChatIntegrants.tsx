import React from 'react'
import { Stack, Text } from '@chakra-ui/react'

import { useBrandTheme } from '@/shared/hooks'
import { SectionWithScroll } from '@/shared/components/SectionWithScroll'
import { ChatIntegrantItem } from './ChatIntegrantItem'

export const ChatIntegrants = () => {
  const {
    colors: { brand },
  } = useBrandTheme()

  return (
    <Stack py={4} px={16} spacing={4} overflowY='hidden'>
      <Text color={brand['text-gray']} fontSize='sm'>
        15 participantes
      </Text>

      <SectionWithScroll pr={3} spacing={5}>
        <ChatIntegrantItem />
        <ChatIntegrantItem />
        <ChatIntegrantItem />
        <ChatIntegrantItem />
        <ChatIntegrantItem />
        <ChatIntegrantItem />
        <ChatIntegrantItem />
        <ChatIntegrantItem />
        <ChatIntegrantItem />
        <ChatIntegrantItem />
        <ChatIntegrantItem />
        <ChatIntegrantItem />
        <ChatIntegrantItem />
        <ChatIntegrantItem />
        <ChatIntegrantItem />
        <ChatIntegrantItem />
        <ChatIntegrantItem />
      </SectionWithScroll>
    </Stack>
  )
}
