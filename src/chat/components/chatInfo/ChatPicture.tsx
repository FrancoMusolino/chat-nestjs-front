import React from 'react'
import { useParams } from 'react-router-dom'

import { EditablePicture } from '../EditablePicture'
import { useSelectedChat } from '@/chat/hooks/useSelectedChat'
import { useCloudinaryWidget, useErrorMessage } from '@/shared/hooks'
import { useUpdateChatMutation } from '@/chat/services/chat.service'

export const ChatPicture = () => {
  const { chatId } = useParams()

  const { selectedChat } = useSelectedChat(chatId!)

  const {
    mutate: updateChat,
    error,
    isLoading,
  } = useUpdateChatMutation(chatId!)
  useErrorMessage(error)

  const { open } = useCloudinaryWidget({
    opts: {
      uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET_CHATS,
    },
    successFn: (secureUrl) => updateChat({ avatar: secureUrl }),
  })

  return (
    <EditablePicture
      boxProps={{ onClick: open, w: '170px', h: '170px' }}
      avatarProps={{
        src: selectedChat?.avatar,
        boxSize: '170px',
        isGroupPicture: true,
      }}
      text='Cambiar imagen del grupo'
      isLoading={isLoading}
    />
  )
}
