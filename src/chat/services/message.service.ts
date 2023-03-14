import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { axios } from '@/shared/services/axios'
import { GetChatMessagesResponse } from './chat.service'

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

  return useMutation({
    mutationKey: ['submit-message', chatId],
    mutationFn: (newMessage: SubmitMessageRequest) =>
      axios.post<Message>(`chat/${chatId}/enviar-mensaje`, newMessage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-messages', chatId] })
      queryClient.invalidateQueries({ queryKey: ['user-chats'] })
    },
  })
}

export const useDeleteMessageMutation = (chatId: string, messageId: string) => {
  const queryClient = useQueryClient()
  const chatMessagesQueryKey = ['chat-messages', chatId]

  return useMutation({
    mutationKey: ['delete-message', messageId],
    mutationFn: () => axios.delete<Message>(`messages/${messageId}`),
    onMutate: async () => {
      type ChatMessagesResponse = AxiosResponse<GetChatMessagesResponse>

      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: chatMessagesQueryKey })

      // Snapshot the previous value
      const previousMessages =
        queryClient.getQueryData<ChatMessagesResponse>(chatMessagesQueryKey)

      const updatedMessages = previousMessages?.data.messages.map((message) =>
        message.id === messageId
          ? { ...message, content: 'Mensaje eliminado', deleted: true }
          : message
      )

      if (updatedMessages) {
        // Optimistically update to the new value
        queryClient.setQueryData<any>(chatMessagesQueryKey, (old: any) => ({
          ...old,
          data: { messages: updatedMessages },
        }))
      }

      // Return a context object with the snapshotted value
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
