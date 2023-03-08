import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { axios } from './axios'

type User = {
  id: string
  username: string
  status: string
  profilePicture?: string
  deleted: boolean
  connected: boolean
  lastConnection?: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  chatIDs: string[]
}

type GetUserChatsResponse = {
  chats: {
    id: string
    title: string
    avatar?: string
    messages: {
      content: string
      createdAt: Date
      user: {
        username: string
      }
    }[]
  }[]
}

export const useGetUserChats = (userId: string) => {
  return useQuery({
    queryKey: ['user-chats'],
    queryFn: () => axios.get<GetUserChatsResponse>(`users/${userId}/chats`),
  })
}

export type UpdateUserRequest = {
  profilePicture?: string
  status?: string
}

export const useUpdateUserMutation = (userId: string) => {
  return useMutation({
    mutationKey: ['update-user'],
    mutationFn: (updatedUser: UpdateUserRequest) =>
      axios.patch<User>(`users/${userId}`, updatedUser),
  })
}

export type DeleteAccountRequest = {
  password: string
}

export const useDeleteAccountMutation = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['delete-account'],
    mutationFn: (data: DeleteAccountRequest) =>
      axios.delete(`users/${userId}`, { data }),
    onSuccess: () => {
      queryClient.clear()
    },
  })
}
