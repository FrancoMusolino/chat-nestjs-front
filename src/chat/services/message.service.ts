import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { axios } from '@/shared/services/axios'
import { GetChatMessagesResponse } from './chat.service'
import { useStoreSelector } from '@/shared/app/store'
import { randomKeyGenerator } from '@/shared/utils'
import { DateTime } from '@/shared/helpers'
import { GetUserChatsResponse } from '@/shared/services/user.service'
import { sortChats } from '../utils'

type Message = {
  id: string
  content: string
  deleted: boolean
  createdAt: Date
  deletedAt?: Date
  userId: string
  chatId: string
}

export type SubmitMessageRequest = {
  content: string
}

export const useSubmitMessageMutation = (chatId: string) => {
  const queryClient = useQueryClient()
  const { id, username, profilePicture } = useStoreSelector('session')

  const chatMessagesQueryKey = ['chat-messages', chatId]
  const userChatsQueryKey = ['user-chats']

  return useMutation({
    mutationKey: ['submit-message', chatId],
    mutationFn: (newMessage: SubmitMessageRequest) =>
      axios.post<unknown, Message>(`chat/${chatId}/enviar-mensaje`, newMessage),
    onMutate: async (newMessageReq) => {
      await queryClient.cancelQueries({ queryKey: chatMessagesQueryKey })
      await queryClient.cancelQueries({ queryKey: userChatsQueryKey })

      const previousMessages =
        queryClient.getQueryData<InfiniteData<GetChatMessagesResponse>>(
          chatMessagesQueryKey
        )

      const { content } = newMessageReq

      const now = DateTime.now().date

      const newMessage = {
        id: randomKeyGenerator(),
        content,
        createdAt: now,
        deleted: false,
        user: {
          id,
          username,
          profilePicture,
        },
      }

      queryClient.setQueryData<InfiniteData<GetChatMessagesResponse>>(
        chatMessagesQueryKey,
        (old: any) => ({
          ...old,
          pages: old.pages.map((page: any, i: number) =>
            i ? page : { ...page, messages: [newMessage, ...page.messages] }
          ),
        })
      )

      const previousUserChats =
        queryClient.getQueryData<GetUserChatsResponse>(userChatsQueryKey)

      const updatedChatsWithLastMessages = previousUserChats?.chats.map(
        (chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [{ content, createdAt: now, user: { username } }],
              }
            : chat
      )

      sortChats({ chats: updatedChatsWithLastMessages ?? [] })

      queryClient.setQueryData<GetUserChatsResponse>(
        userChatsQueryKey,
        (old: any) => ({
          ...old,
          chats: updatedChatsWithLastMessages,
        })
      )

      return { previousMessages, previousUserChats }
    },
    onError: (_err, _, context) => {
      queryClient.setQueryData(chatMessagesQueryKey, context?.previousMessages)
      queryClient.setQueryData(userChatsQueryKey, context?.previousUserChats)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userChatsQueryKey })
      queryClient.invalidateQueries({ queryKey: chatMessagesQueryKey })
    },
  })
}

export const useDeleteMessageMutation = (chatId: string, messageId: string) => {
  const queryClient = useQueryClient()
  const chatMessagesQueryKey = ['chat-messages', chatId]

  return useMutation({
    mutationKey: ['delete-message', messageId],
    mutationFn: () => axios.delete<unknown, Message>(`messages/${messageId}`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: chatMessagesQueryKey })

      const previousMessages =
        queryClient.getQueryData<InfiniteData<GetChatMessagesResponse>>(
          chatMessagesQueryKey
        )

      const updatedMessages = previousMessages?.pages.map((page) => ({
        ...page,
        messages: page.messages.map((message) =>
          message.id === messageId
            ? { ...message, content: 'Mensaje eliminado', deleted: true }
            : message
        ),
      }))

      queryClient.setQueryData<InfiniteData<GetChatMessagesResponse>>(
        chatMessagesQueryKey,
        (old: any) => ({
          ...old,
          pages: updatedMessages,
        })
      )

      return { previousMessages }
    },
    onError: (_err, _, context) => {
      queryClient.setQueryData(chatMessagesQueryKey, context?.previousMessages)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-chats'] })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: chatMessagesQueryKey })
    },
  })
}
