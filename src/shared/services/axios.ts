import baseAxios from 'axios'

export const axios = baseAxios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response.data)
)
