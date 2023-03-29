import { useState, useEffect } from 'react'
import { useQueryClient, useIsMutating } from '@tanstack/react-query'

import { GetUserChatsResponse } from '@/shared/services/user.service'

type SelectedChat = GetUserChatsResponse['chats'][number]

export const useSelectedChat = (chatId: string) => {
  const queryClient = useQueryClient()
  const isMutatingUserChats = useIsMutating({ mutationKey: ['update-chat'] })

  const [selectedChat, setSelectedChat] = useState<null | SelectedChat>(null)

  const { chats } = queryClient.getQueryData([
    'user-chats',
  ]) as GetUserChatsResponse

  useEffect(() => {
    setSelectedChat(chats.find((chat) => chat.id === chatId) || null)
  }, [isMutatingUserChats, chatId])

  return { selectedChat }
}
