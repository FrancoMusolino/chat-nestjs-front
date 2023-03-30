import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
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
  hasNextPage: boolean
}

export const useGetChatMessages = (chatId: string) => {
  const TAKE = 50

  return useInfiniteQuery({
    queryKey: ['chat-messages', chatId],
    queryFn: ({ pageParam = 1 }) =>
      axios.get<unknown, GetChatMessagesResponse>(
        `chat/${chatId}/mensajes?take=${TAKE}&skip=${-TAKE + pageParam * TAKE}`
      ),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasNextPage) {
        return undefined
      }

      return allPages.length + 1
    },
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
      axios.get<unknown, GetChatIntegrantsResponse>(
        `chat/${chatId}/integrantes`
      ),
  })
}

export type CreateChatRequest = {
  title: string
  description?: string
}

export const useCreateChatMutation = () => {
  const queryClient = useQueryClient()

  const userChatsQueryKey = ['user-chats']

  return useMutation({
    mutationKey: ['create-chat'],
    mutationFn: (newChat: CreateChatRequest) =>
      axios.post<unknown, Chat>(`chat`, newChat),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userChatsQueryKey })
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
      axios.post<unknown, Chat>(
        `chat/${chatId}/sumar-integrante`,
        newIntegrant
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-integrants', chatId] })
    },
  })
}

export const useLeaveChatMutation = (chatId: string) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const userChatsQueryKey = ['user-chats']

  return useMutation({
    mutationKey: ['leave-chat', chatId],
    mutationFn: () =>
      axios.post<unknown, Chat>(`chat/${chatId}/abandonar-chat`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: userChatsQueryKey })

      const previousUserChats =
        queryClient.getQueryData<GetUserChatsResponse>(userChatsQueryKey)

      const updatedUserChats = previousUserChats?.chats.filter(
        (chat) => chat.id !== chatId
      )

      if (updatedUserChats) {
        queryClient.setQueryData<GetUserChatsResponse>(
          userChatsQueryKey,
          (old: any) => ({
            ...old,
            chats: updatedUserChats,
          })
        )
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

export type PushOutIntegrantRequest = {
  username: string
}

export const usePushOutIntegrantMutation = (chatId: string) => {
  const queryClient = useQueryClient()

  const chatIntegrantsQueryKey = ['chat-integrants', chatId]

  return useMutation({
    mutationKey: ['push-out-integrant', chatId],
    mutationFn: (data: PushOutIntegrantRequest) =>
      axios.post<unknown, Chat>(`chat/${chatId}/expulsar-chat`, data),
    onMutate: async ({ username }) => {
      await queryClient.cancelQueries({ queryKey: chatIntegrantsQueryKey })

      const previousChatIntegrants =
        queryClient.getQueryData<GetChatIntegrantsResponse>(
          chatIntegrantsQueryKey
        )

      const updatedChatIntegrants = previousChatIntegrants?.users.filter(
        (user) => user.username !== username
      )

      if (updatedChatIntegrants) {
        queryClient.setQueryData<GetChatIntegrantsResponse>(
          chatIntegrantsQueryKey,
          (old: any) => ({
            ...old,
            users: updatedChatIntegrants,
          })
        )
      }

      return { previousChatIntegrants }
    },
    onError: (_err, _, context) => {
      queryClient.setQueryData(
        chatIntegrantsQueryKey,
        context?.previousChatIntegrants
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: chatIntegrantsQueryKey })
    },
  })
}

export const useDeleteChatMutation = (chatId: string) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const userChatsQueryKey = ['user-chats']

  return useMutation({
    mutationKey: ['delete-chat', chatId],
    mutationFn: () => axios.delete<unknown, Chat>(`chat/${chatId}`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: userChatsQueryKey })

      const previousUserChats =
        queryClient.getQueryData<GetUserChatsResponse>(userChatsQueryKey)

      const updatedUserChats = previousUserChats?.chats.filter(
        (chat) => chat.id !== chatId
      )

      if (updatedUserChats) {
        queryClient.setQueryData<GetUserChatsResponse>(
          userChatsQueryKey,
          (old: any) => ({
            ...old,
            chats: updatedUserChats,
          })
        )
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

export type UpdateChatRequest = {
  title?: string
  description?: string
  avatar?: string
}

export const useUpdateChatMutation = (chatId: string) => {
  const queryClient = useQueryClient()

  const userChatsQueryKey = ['user-chats']

  return useMutation({
    mutationKey: ['update-chat', chatId],
    mutationFn: (updatedChat: UpdateChatRequest) =>
      axios.patch<unknown, Chat>(`chat/${chatId}`, updatedChat),
    onMutate: async (updatedChat) => {
      await queryClient.cancelQueries({ queryKey: userChatsQueryKey })

      const previousUserChats =
        queryClient.getQueryData<GetUserChatsResponse>(userChatsQueryKey)

      const updatedUserChats = previousUserChats?.chats.map((chat) =>
        chat.id === chatId ? { ...chat, ...updatedChat } : chat
      )

      queryClient.setQueryData<GetUserChatsResponse>(
        userChatsQueryKey,
        (old: any) => ({
          ...old,
          chats: updatedUserChats,
        })
      )

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
