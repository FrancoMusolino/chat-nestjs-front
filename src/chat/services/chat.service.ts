import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'

import { axios } from '@/shared/services/axios'
import type { GetUserChatsResponse } from '@/shared/services/user.service'

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

export type GetChatIntegrantsResponse = {
  createdBy: string
  users: {
    id: string
    username: string
    profilePicture?: string
    status: string
    connected: boolean
    lastConnection?: string
  }[]
}

export const useGetChatIntegrants = (chatId: string) => {
  return useQuery({
    queryKey: ['chat-integrants', chatId],
    queryFn: () =>
      axios.get<GetChatIntegrantsResponse>(`chat/${chatId}/integrantes`),
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
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['add-integrant', chatId],
    mutationFn: (newIntegrant: AddIntegrantRequest) =>
      axios.post<Chat>(`chat/${chatId}/sumar-integrante`, newIntegrant),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-integrants', chatId] })
    },
  })
}

export const useLeaveChatMutation = (chatId: string) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const userChatsQueryKey = ['user-chats']

  return useMutation({
    mutationKey: ['leave-chat', chatId],
    mutationFn: () => axios.post<Chat>(`chat/${chatId}/abandonar-chat`),
    onMutate: async () => {
      type UserChatsResponse = AxiosResponse<GetUserChatsResponse>

      await queryClient.cancelQueries({ queryKey: userChatsQueryKey })

      const previousUserChats =
        queryClient.getQueryData<UserChatsResponse>(userChatsQueryKey)

      const updatedUserChats = previousUserChats?.data.chats.filter(
        (chat) => chat.id !== chatId
      )

      if (updatedUserChats) {
        queryClient.setQueryData<any>(userChatsQueryKey, (old: any) => ({
          ...old,
          data: { chats: updatedUserChats },
        }))
      }

      navigate('/', { replace: true })

      return { previousUserChats }
    },
    onError: (_err, _, context) => {
      queryClient.setQueryData(userChatsQueryKey, context?.previousUserChats)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userChatsQueryKey })
    },
  })
}
