import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { socket } from '@/shared/app/socket'
import { SOCKET_EVENTS } from '@/shared/enums'
import { GetUserChatsResponse } from '@/shared/services/user.service'

type EventPayload = {
  chatId: string
}

export const useSubscribePushedOutChatEvent = () => {
  const queryClient = useQueryClient()

  const userChatsQueryKey = ['user-chats']

  useEffect(() => {
    const onUserPushedOutChatEvent = async ({ chatId }: EventPayload) => {
      await queryClient.cancelQueries({ queryKey: userChatsQueryKey })

      const previousUserChats =
        queryClient.getQueryData<GetUserChatsResponse>(userChatsQueryKey)

      const updatedUserChats = previousUserChats?.chats.filter(
        (chat) => chat.id !== chatId
      )

      queryClient.setQueryData<GetUserChatsResponse>(
        userChatsQueryKey,
        (old: any) => ({
          ...old,
          chats: updatedUserChats,
        })
      )

      queryClient.invalidateQueries({ queryKey: userChatsQueryKey })
    }

    socket.on(SOCKET_EVENTS.EVENT_PUSHED_OUT_CHAT, onUserPushedOutChatEvent)

    return () => {
      socket.off(SOCKET_EVENTS.EVENT_PUSHED_OUT_CHAT, onUserPushedOutChatEvent)
    }
  }, [])
}
