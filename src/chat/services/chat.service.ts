import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { axios } from '@/shared/services/axios'

type Chat = {
  id: string
  title: string
  description?: string
  avatar?: string
  createdBy: string
  createdAt: Date
  lastMessageSendingAt: Date
  userIDs: string[]
}

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
    queryKey: ['user-chats'],
    queryFn: () => axios.get<GetUserChatsResponse>(`users/${userId}/chats`),
  })
}

export type CreateChatRequest = {
  title: string
  description?: string
}

export const useCreateChatMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['new-chat'],
    mutationFn: (newChat: CreateChatRequest) =>
      axios.post<Chat>(`chat`, newChat),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-chats'] })
    },
  })
}
