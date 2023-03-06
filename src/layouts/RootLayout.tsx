import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Container } from '@chakra-ui/react'

import { Sidebar } from '@/chat/components/sidebar/Sidebar'

export const RootLayout = () => {
  return (
    <Container
      display='flex'
      maxW='1440px'
      my={{ base: 0, '2xl': 4 }}
      p={0}
      boxShadow='dark-lg'
      overflow='hidden'
    >
      <Sidebar />
      <Box flexGrow={1}>
        <Outlet />
      </Box>
    </Container>
  )
}
