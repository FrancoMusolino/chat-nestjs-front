import React from 'react'
import { Box } from '@chakra-ui/react'

import { ProfileHeader } from './ProfileHeader'
import { Search } from './Search'
import { ChatList } from './ChatList'

import { useBrandTheme } from '@/shared/hooks'

export const Sidebar = () => {
  const { colors } = useBrandTheme()

  return (
    <Box
      minW='330px'
      maxW='30%'
      h={{ base: '100vh', '2xl': 'calc(100vh - 2rem)' }}
      flex='0 0 30%'
      borderRight={`1px solid ${colors.brand.secondary}`}
    >
      <ProfileHeader />
      <Search />
      <ChatList />
    </Box>
  )
}
