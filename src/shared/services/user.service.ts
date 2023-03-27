import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { axios } from './axios'
import { REFETCH_INTERVAL } from '../constants'

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

export type GetUserChatsResponse = {
  chats: {
    id: string
    title: string
    createdAt: Date
    createdBy: string
    description?: string
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
    refetchInterval: REFETCH_INTERVAL,
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
