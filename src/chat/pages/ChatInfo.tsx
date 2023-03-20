import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Heading, HStack } from '@chakra-ui/react'
import { RxCross1 } from 'react-icons/rx'

import { ChatLayout } from '../layout/ChatLayout'
import { Header } from '../components/Header'
import { ChatDetails } from '../components/ChatDetails'
import { ChatIntegrants } from '../components/ChatIntegrants'

export const ChatInfo = () => {
  const navigate = useNavigate()

  return (
    <ChatLayout>
      <Header minH='75px'>
        <HStack paddingLeft={6} spacing={6}>
          <RxCross1
            fontSize='20px'
            cursor='pointer'
            onClick={() => navigate('..')}
          />
          <Heading as='h3' fontSize='xl' fontWeight={500}>
            Info. del grupo
          </Heading>
        </HStack>
      </Header>
      <ChatDetails />
      <ChatIntegrants />
    </ChatLayout>
  )
}
