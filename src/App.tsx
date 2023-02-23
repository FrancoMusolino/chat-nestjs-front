import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'
import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'

import customTheme from './theme'
import { router } from './routes/router'
import { GlobalStoreProvider } from './shared/app/store'
import { combineReducers, initialState } from './shared/app/rootReducer'
import { session } from './shared/features/session/session.reducer'

const queryClient = new QueryClient()

const reducer = combineReducers({
  [session.reducerPath]: session.reducer,
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS={true} theme={customTheme}>
        <GlobalStoreProvider initialState={initialState} reducer={reducer}>
          <RouterProvider router={router} />
        </GlobalStoreProvider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
