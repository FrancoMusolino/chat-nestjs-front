import baseAxios from 'axios'

export const axios = baseAxios.create({
  baseURL: 'http://localhost:3000/',
})

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response.data)
)
