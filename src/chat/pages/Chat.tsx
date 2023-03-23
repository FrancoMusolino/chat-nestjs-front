import React from 'react'
import { HStack } from '@chakra-ui/react'
import { motion, Variants } from 'framer-motion'

import { ChatLayout } from '../layout/ChatLayout'
import { ChatHeader } from '../components/ChatHeader'
import { SubmitMessage } from '../components/SubmitMessage'
import { Messages } from '../components/Messages'
import { ChatInfo } from '../components/chatInfo/ChatInfo'

import { useStoreSelector } from '@/shared/app/store'

export const containerVariants: Variants = {
  open: {
    minWidth: '400px',
    transition: { type: 'spring', stiffness: 175, damping: 24 },
  },
  closed: { minWidth: 0, width: 0, transition: { duration: 0.3 } },
}

export const Chat = () => {
  const { infoPanelIsVisible } = useStoreSelector('chat')

  return (
    <HStack spacing={0}>
      <ChatLayout flexGrow={1}>
        <ChatHeader />
        <Messages />
        <SubmitMessage />
      </ChatLayout>
      <motion.nav
        initial={false}
        animate={infoPanelIsVisible ? 'open' : 'closed'}
        variants={containerVariants}
      >
        <ChatInfo />
      </motion.nav>
    </HStack>
  )
}
