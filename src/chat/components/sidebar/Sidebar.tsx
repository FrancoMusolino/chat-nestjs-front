import React from 'react'
import { Box } from '@chakra-ui/react'

import { Header } from '../Header'
import { Search } from './Search'
import { ChatList } from './ChatList'

import { useBrandTheme } from '@/shared/hooks'

export const Sidebar = () => {
  const { colors } = useBrandTheme()

  return (
    <Box
      minW='330px'
      maxW='30%'
      h='100vh'
      flex='0 0 30%'
      borderRight={`1px solid ${colors.brand.secondary}`}
    >
      <Header />
      <Search />
      <ChatList />
    </Box>
  )
}
