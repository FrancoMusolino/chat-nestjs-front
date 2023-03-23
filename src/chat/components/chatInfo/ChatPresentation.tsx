import React from 'react'
import { Heading, Stack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { useSelectedChat } from '../../hooks/useSelectedChat'
import { Avatar } from '@/shared/components/Avatar'

export const ChatPresentation = () => {
  const { chatId } = useParams()

  const { selectedChat } = useSelectedChat(chatId!)

  return (
    <Stack align='center' spacing={4} px={6}>
      <Avatar src={selectedChat?.avatar} boxSize='170px' isGroupPicture />
      <Stack spacing={0} align='center' textAlign='center'>
        <Heading fontSize='xl' fontWeight={500} wordBreak='break-all'>
          {selectedChat?.title}
        </Heading>
      </Stack>
    </Stack>
  )
}
