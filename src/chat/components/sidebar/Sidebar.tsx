import React from 'react'
import { Box } from '@chakra-ui/react'

import { ProfileHeader } from './ProfileHeader'
import { Search } from './Search'
import { ChatList } from './ChatList'
import { ConfigurationPanel } from '../configurationPanel/ConfigurationPanel'

import { useBrandTheme } from '@/shared/hooks'
import { AnimatePresence } from 'framer-motion'

export const Sidebar = () => {
  const { colors } = useBrandTheme()

  return (
    <Box
      pos='relative'
      minW='330px'
      maxW='30%'
      h={{ base: '100vh', '2xl': 'calc(100vh - 2rem)' }}
      flex='0 0 30%'
      borderRight={`1px solid ${colors.brand.secondary}`}
    >
      <AnimatePresence>
        <ConfigurationPanel />
      </AnimatePresence>
      <ProfileHeader />
      <Search />
      <ChatList />
    </Box>
  )
}
