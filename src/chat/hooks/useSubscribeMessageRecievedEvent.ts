import { useState, useEffect } from 'react'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'

import { socket } from '@/shared/app/socket'
import { SOCKET_EVENTS } from '@/shared/enums'
import { Messages } from '../components/Messages'
import { GetChatMessagesResponse } from '../services/chat.service'
import { optimisticallyUpdateChatLastMessage } from '../services/optimistic'

export const useSubscribeMessageRecievedEvent = (chatId: string) => {
  const [messagesReceived, setMessagesReceived] = useState(0)
  const queryClient = useQueryClient()

  const chatMessagesQueryKey = ['chat-messages', chatId]
  const userChatsQueryKey = ['user-chats']

  useEffect(() => {
    const onMessageReceivedEvent = async (newMessage: Messages[number]) => {
      setMessagesReceived((prevState) => prevState + 1)

      const { content, createdAt, user } = newMessage

      await queryClient.cancelQueries({ queryKey: chatMessagesQueryKey })

      queryClient.setQueryData<InfiniteData<GetChatMessagesResponse>>(
        chatMessagesQueryKey,
        (old: any) => ({
          ...old,
          pages: old.pages.map((page: any, i: number) =>
            i ? page : { ...page, messages: [newMessage, ...page.messages] }
          ),
        })
      )

      await optimisticallyUpdateChatLastMessage(queryClient, {
        chatId,
        content,
        createdAt,
        username: user.username,
      })

      queryClient.invalidateQueries({ queryKey: chatMessagesQueryKey })
      queryClient.invalidateQueries({ queryKey: userChatsQueryKey })
    }

    socket.on(SOCKET_EVENTS.EVENT_RECEIVE_MESSAGE, onMessageReceivedEvent)

    return () => {
      socket.off(SOCKET_EVENTS.EVENT_RECEIVE_MESSAGE, onMessageReceivedEvent)
    }
  }, [chatId])

  return { messagesReceived, setMessagesReceived }
}
