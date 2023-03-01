import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Container } from '@chakra-ui/react'

import { Sidebar } from '@/chat/components/sidebar/Sidebar'

export const RootLayout = () => {
  return (
    <Container maxW='1440px' display='flex'>
      <Sidebar />
      <Box flexGrow={1}>
        <Outlet />
      </Box>
    </Container>
  )
}
