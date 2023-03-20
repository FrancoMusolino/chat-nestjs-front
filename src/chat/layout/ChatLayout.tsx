import React, { ReactNode } from 'react'
import { Stack } from '@chakra-ui/react'

type ChatLayoutProps = {
  children: ReactNode
}

export const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <Stack h={{ base: '100vh', '2xl': 'calc(100vh - 2rem)' }} spacing={0}>
      {children}
    </Stack>
  )
}
