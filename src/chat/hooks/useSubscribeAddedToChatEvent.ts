import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { socket } from '@/shared/app/socket'
import { SOCKET_EVENTS } from '@/shared/enums'

export const useSubscribeAddedToChatEvent = () => {
  const queryClient = useQueryClient()

  const userChatsQueryKey = ['user-chats']

  useEffect(() => {
    const onUserAddedToChatEvent = () => {
      queryClient.refetchQueries({ queryKey: userChatsQueryKey })
    }

    socket.on(SOCKET_EVENTS.EVENT_ADDED_TO_CHAT, onUserAddedToChatEvent)

    return () => {
      socket.off(SOCKET_EVENTS.EVENT_ADDED_TO_CHAT, onUserAddedToChatEvent)
    }
  }, [])
}
