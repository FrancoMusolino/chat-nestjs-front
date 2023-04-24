import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { socket } from '@/shared/app/socket'
import { SOCKET_EVENTS } from '@/shared/enums'
import { optimisticallyUpdateChatLastMessage } from '../services/optimistic'

type LastMessage = {
  chatId: string
  content: string
  createdAt: Date
  user: { username: string }
}

export const useSubscribeNewLastMessageRecievedEvent = () => {
  const queryClient = useQueryClient()

  const userChatsQueryKey = ['user-chats']

  useEffect(() => {
    const onLastMessageReceivedEvent = async (lastMessage: LastMessage) => {
      const { chatId, content, createdAt, user } = lastMessage

      await optimisticallyUpdateChatLastMessage(queryClient, {
        chatId,
        content,
        createdAt,
        username: user.username,
      })

      queryClient.invalidateQueries({ queryKey: userChatsQueryKey })
      queryClient.refetchQueries({ queryKey: ['chat-messages', chatId] })
    }

    socket.on(SOCKET_EVENTS.EVENT_NEW_LAST_MESSAGE, onLastMessageReceivedEvent)

    return () => {
      socket.off(
        SOCKET_EVENTS.EVENT_NEW_LAST_MESSAGE,
        onLastMessageReceivedEvent
      )
    }
  }, [])
}
