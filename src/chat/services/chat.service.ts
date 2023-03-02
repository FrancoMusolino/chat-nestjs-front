import { useQuery } from '@tanstack/react-query'

import { axios } from '@/shared/services/axios'

type GetUserChatsResponse = {
  chats: {
    id: string
    title: string
    avatar?: string
    messages: {
      content: string
      createdAt: Date
      user: {
        username: string
      }
    }[]
  }[]
}

export const useGetUserChats = (userId: string) => {
  return useQuery({
    queryKey: ['user-chat', userId],
    queryFn: () => axios.get<GetUserChatsResponse>(`users/${userId}/chats`),
  })
}
