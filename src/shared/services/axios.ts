import baseAxios from 'axios'

import { decrypt } from '../helpers'
import { session, SessionState } from '../features/session/session.reducer'

export const axios = baseAxios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axios.interceptors.request.use((config) => {
  const storage = window.localStorage.getItem(session.reducerPath)

  if (!storage) {
    return config
  }

  const { token }: SessionState = decrypt(storage)

  const headers = config.headers.set('Authorization', `Bearer ${token}`)

  return { ...config, headers }
})

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response.data)
)
