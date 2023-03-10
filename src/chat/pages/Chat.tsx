import React from 'react'
import { Box, Stack } from '@chakra-ui/react'

import { ChatHeader } from '../components/ChatHeader'
import { SubmitMessage } from '../components/SubmitMessage'

export const Chat = () => {
  return (
    <Stack h='full'>
      <ChatHeader />
      <Box flexGrow={1} overflow='scrol'>
        Holaaa
      </Box>
      <SubmitMessage />
    </Stack>
  )
}
