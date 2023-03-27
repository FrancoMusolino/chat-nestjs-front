import { useState, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import { useQueryClient, useIsMutating } from '@tanstack/react-query'

import { GetUserChatsResponse } from '@/shared/services/user.service'

type SelectedChat = GetUserChatsResponse['chats'][number]

export const useSelectedChat = (chatId: string) => {
  const queryClient = useQueryClient()
  const isMutatingUserChats = useIsMutating({ mutationKey: ['update-chat'] })

  const [selectedChat, setSelectedChat] = useState<null | SelectedChat>(null)

  const { data } = queryClient.getQueryData([
    'user-chats',
  ]) as AxiosResponse<GetUserChatsResponse>

  useEffect(() => {
    setSelectedChat(data.chats.find((chat) => chat.id === chatId) || null)
  }, [isMutatingUserChats, chatId])

  return { selectedChat }
}
