import React, { ReactNode } from 'react'
import { Stack, StackProps } from '@chakra-ui/react'

type ChatLayoutProps = {
  children: ReactNode
} & StackProps

export const ChatLayout = ({ children, ...props }: ChatLayoutProps) => {
  return (
    <Stack
      h={{ base: '100vh', '2xl': 'calc(100vh - 2rem)' }}
      spacing={0}
      {...props}
    >
      {children}
    </Stack>
  )
}
