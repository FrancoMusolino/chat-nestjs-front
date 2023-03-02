import { useMutation } from '@tanstack/react-query'

import { axios } from '@/shared/services/axios'

type AuthResponse = {
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
  token: string
}

export type AuthRequest = {
  username: string
  password: string
}

export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (newUser: AuthRequest) =>
      axios.post<AuthResponse>('auth/register', newUser),
  })
}

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (user: AuthRequest) =>
      axios.post<AuthResponse>('auth/login', user),
  })
}
