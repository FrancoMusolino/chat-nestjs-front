export type ReducerType<T, E> = {
  reducerPath: string
  initialState: T
  reducer: (state: T, action: E) => T
}
