import { useState, useEffect } from 'react'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'

import { socket } from '@/shared/app/socket'
import { SOCKET_EVENTS } from '@/shared/enums'
import { Messages } from '../components/Messages'
import { GetChatMessagesResponse } from '../services/chat.service'

export const useSubscribeMessageRecievedEvent = (chatId: string) => {
  const [messagesReceived, setMessagesReceived] = useState(0)
  const queryClient = useQueryClient()

  const chatMessagesQueryKey = ['chat-messages', chatId]

  useEffect(() => {
    const onMessageReceiveEvent = async (newMessage: Messages[number]) => {
      setMessagesReceived((prevState) => prevState + 1)

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

      queryClient.invalidateQueries({ queryKey: chatMessagesQueryKey })
    }

    socket.on(SOCKET_EVENTS.EVENT_RECEIVE_MESSAGE, onMessageReceiveEvent)

    return () => {
      socket.off(SOCKET_EVENTS.EVENT_RECEIVE_MESSAGE, onMessageReceiveEvent)
    }
  }, [chatId])

  return { messagesReceived, setMessagesReceived }
}
