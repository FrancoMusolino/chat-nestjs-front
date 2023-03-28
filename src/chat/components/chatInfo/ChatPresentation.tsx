import React from 'react'
import { Stack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { EditableField } from './EditableField'
import { ChatPicture } from './ChatPicture'
import { useSelectedChat } from '../../hooks/useSelectedChat'

export const ChatPresentation = () => {
  const { chatId } = useParams()

  const { selectedChat } = useSelectedChat(chatId!)

  return (
    <Stack align='center' spacing={4} px={6}>
      <ChatPicture />
      <Stack spacing={0} align='center' textAlign='center'>
        <EditableField
          value={selectedChat?.title}
          fieldToUpdate='title'
          inputMaxLength={35}
        />
      </Stack>
    </Stack>
  )
}
