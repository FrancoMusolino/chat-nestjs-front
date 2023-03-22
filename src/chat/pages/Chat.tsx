import React from 'react'
import { HStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { ChatLayout } from '../layout/ChatLayout'
import { ChatHeader } from '../components/ChatHeader'
import { SubmitMessage } from '../components/SubmitMessage'
import { Messages } from '../components/Messages'

import { useStoreSelector } from '@/shared/app/store'
import { ChatInfo } from '../components/chatInfo/ChatInfo'

export const Chat = () => {
  const { infoPanelIsVisible } = useStoreSelector('chat')

  return (
    <HStack spacing={0}>
      <ChatLayout flexGrow={1}>
        <ChatHeader />
        <Messages />
        <SubmitMessage />
      </ChatLayout>
      <AnimatePresence>
        {infoPanelIsVisible && (
          <motion.div
            // layout
            initial={{ width: 0 }}
            animate={{ width: '400px' }}
            exit={{ width: 0 }}
          >
            <ChatInfo />
          </motion.div>
        )}
      </AnimatePresence>
    </HStack>
  )
}
