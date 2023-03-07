import { useMutation, useQueryClient } from '@tanstack/react-query'

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

export type CreateChatRequest = {
  title: string
  description?: string
}

export const useCreateChatMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create-chat'],
    mutationFn: (newChat: CreateChatRequest) =>
      axios.post<Chat>(`chat`, newChat),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-chats'] })
    },
  })
}
