import { GetUserChatsResponse } from '@/shared/services/user.service'

type SortChatArgs = {
  chats: GetUserChatsResponse['chats'][number][]
}

export const sortChats = ({ chats }: SortChatArgs): void => {
  chats?.sort(
    (a, b) =>
      new Date(b.messages[0].createdAt).getTime() -
      new Date(a.messages[0].createdAt).getTime()
  )
}
