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

export type GetChatMessagesResponse = {
  messages: {
    id: string
    content: string
    createdAt: Date
    deleted: boolean
    user: {
      id: string
      username: string
      profilePicture?: string
    }
  }[]
}

export const useGetChatMessages = (chatId: string) => {
  return useQuery({
    queryKey: ['chat-messages', chatId],
    queryFn: () =>
      axios.get<GetChatMessagesResponse>(`chat/${chatId}/mensajes`),
  })
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

export type AddIntegrantRequest = {
  username: string
}

export const useAddIntegrantMutation = (chatId: string) => {
  return useMutation({
    mutationKey: ['add-integrant', chatId],
    mutationFn: (newIntegrant: AddIntegrantRequest) =>
      axios.post<Chat>(`chat/${chatId}/sumar-integrante`, newIntegrant),
  })
}
