import { useMutation, useQueryClient } from '@tanstack/react-query'

import { axios } from '@/shared/services/axios'

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
