import { AxiosResponse } from 'axios'
import { useQueryClient } from '@tanstack/react-query'

import { GetUserChatsResponse } from '@/shared/services/user.service'

export const useSelectedChat = (chatId: string) => {
  const queryClient = useQueryClient()

  const { data } = queryClient.getQueryData([
    'user-chats',
  ]) as AxiosResponse<GetUserChatsResponse>

  const selectedChat = data.chats.find((chat) => chat.id === chatId)

  return { selectedChat }
}
