import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { axios } from '@/shared/services/axios'
import { GetChatMessagesResponse } from './chat.service'
import { useStoreSelector } from '@/shared/app/store'
import { randomKeyGenerator } from '@/shared/utils'
import { DateTime } from '@/shared/helpers'

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

  return useMutation({
    mutationKey: ['submit-message', chatId],
    mutationFn: (newMessage: SubmitMessageRequest) =>
      axios.post<unknown, Message>(`chat/${chatId}/enviar-mensaje`, newMessage),
    onMutate: async (newMessageReq) => {
      await queryClient.cancelQueries({ queryKey: chatMessagesQueryKey })

      const previousMessages =
        queryClient.getQueryData<InfiniteData<GetChatMessagesResponse>>(
          chatMessagesQueryKey
        )

      const newMessage = {
        id: randomKeyGenerator(),
        content: newMessageReq.content,
        createdAt: DateTime.now().date,
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

export const useDeleteMessageMutation = (chatId: string, messageId: string) => {
  const queryClient = useQueryClient()
  const chatMessagesQueryKey = ['chat-messages', chatId]

  return useMutation({
    mutationKey: ['delete-message', messageId],
    mutationFn: () => axios.delete<unknown, Message>(`messages/${messageId}`),
    onMutate: async () => {
      type ChatMessagesResponse = AxiosResponse<GetChatMessagesResponse>

      await queryClient.cancelQueries({ queryKey: chatMessagesQueryKey })

      const previousMessages =
        queryClient.getQueryData<ChatMessagesResponse>(chatMessagesQueryKey)

      const updatedMessages = previousMessages?.data.messages.map((message) =>
        message.id === messageId
          ? { ...message, content: 'Mensaje eliminado', deleted: true }
          : message
      )

      if (updatedMessages) {
        queryClient.setQueryData<any>(chatMessagesQueryKey, (old: any) => ({
          ...old,
          data: { messages: updatedMessages },
        }))
      }

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
