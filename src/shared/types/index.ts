export type ReducerType<T, E> = {
  reducerPath: string
  initialState: T
  reducer: (state: T, action: E) => T
}

export type MyError = {
  message: string
  statusCode: number
  error?: string
}
