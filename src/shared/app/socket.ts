import { io } from 'socket.io-client'

const URL = import.meta.env.VITE_SOCKET_SERVER

export const socket = io(URL, {
  autoConnect: false,
})
