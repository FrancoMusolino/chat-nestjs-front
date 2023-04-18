import React, { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ChakraProvider, createLocalStorageManager } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'
import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'

import customTheme from '@/theme'
import { router } from '@/routes/router'
import { socket } from '@/shared/app/socket'
import { useGlobalDispatch, useStoreSelector } from '@/shared/app/store'
import { CACHE_TIME } from '@/shared/constants'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { cacheTime: CACHE_TIME },
  },
})

const colorModeManager = createLocalStorageManager('color-mode')
const setToDarkMode = colorModeManager.set('dark')

function App() {
  const { token } = useStoreSelector('session')
  const dispatch = useGlobalDispatch()

  useEffect(() => {
    dispatch({ type: 'REHYDRATE' })
  }, [])

  useEffect(() => {
    if (token) {
      socket.auth = {
        token,
      }

      socket.connect()
    }

    if (!token && socket.connected) {
      socket.disconnect()
    }

    return () => {
      socket.disconnect()
    }
  }, [token])

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider
        resetCSS={true}
        colorModeManager={{
          ...colorModeManager,
          set: () => setToDarkMode,
        }}
        theme={customTheme}
        toastOptions={{
          defaultOptions: {
            position: 'top-right',
            isClosable: true,
            duration: 2000,
            variant: 'solid',
          },
        }}
      >
        <RouterProvider router={router} />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
