import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'

import { ProfileHeader } from './ProfileHeader'
import { Search } from './Search'
import { ChatList } from './ChatList'
import { ConfigurationPanel } from '../configurationPanel/ConfigurationPanel'

import { useBrandColors } from '@/shared/hooks'
import { AnimatePresence } from 'framer-motion'

export const Sidebar = () => {
  const { colors } = useBrandColors()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box
      pos='relative'
      minW='330px'
      maxW='30%'
      h={{ base: '100vh', '2xl': 'calc(100vh - 2rem)' }}
      flex='0 0 30%'
      borderRight={`1px solid ${colors.secondary}`}
    >
      <AnimatePresence presenceAffectsLayout={false}>
        {isOpen && <ConfigurationPanel setIsOpen={setIsOpen} />}
      </AnimatePresence>
      <ProfileHeader setIsOpen={setIsOpen} />
      <Search />
      <ChatList />
    </Box>
  )
}
