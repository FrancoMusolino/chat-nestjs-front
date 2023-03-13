import React from 'react'
import { Stack } from '@chakra-ui/react'

import { ChatHeader } from '../components/ChatHeader'
import { SubmitMessage } from '../components/SubmitMessage'
import { Messages } from '../components/Messages'

export const Chat = () => {
  return (
    <Stack h={{ base: '100vh', '2xl': 'calc(100vh - 2rem)' }} spacing={0}>
      <ChatHeader />
      <Messages />
      <SubmitMessage />
    </Stack>
  )
}
