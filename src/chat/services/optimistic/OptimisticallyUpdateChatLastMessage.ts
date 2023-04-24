import { sortChats } from '@/chat/utils'
import { GetUserChatsResponse } from '@/shared/services/user.service'
import { QueryClient } from '@tanstack/react-query'

type LastMessageArgs = {
  chatId: string
  content: string
  createdAt: Date
  username: string
}

export const optimisticallyUpdateChatLastMessage = async (
  queryClient: QueryClient,
  { content, createdAt, username, chatId }: LastMessageArgs
) => {
  const userChatsQueryKey = ['user-chats']

  await queryClient.cancelQueries({ queryKey: userChatsQueryKey })

  const previousUserChats =
    queryClient.getQueryData<GetUserChatsResponse>(userChatsQueryKey)

  const updatedChatsWithLastMessages = previousUserChats?.chats.map((chat) =>
    chat.id === chatId
      ? {
          ...chat,
          messages: [{ content, createdAt, user: { username } }],
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
}
