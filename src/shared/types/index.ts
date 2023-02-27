export type ReducerType<T, E> = {
  reducerPath: string
  initialState: T
  reducer: (state: T, action: E) => T
}

export type MyError = {
  message: string
  statusCode: number
  error: string
}

export type UserWithToken = {
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

export type RegisterResponse = UserWithToken

export type LoginResponse = UserWithToken
