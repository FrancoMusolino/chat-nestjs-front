import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { GlobalStoreProvider } from '@/shared/app/store'
import { combineReducers, initialState } from '@/shared/app/rootReducer'
import { session } from '@/shared/features/session/session.reducer'
import { chat } from '@/shared/features/chat/chat.reducer'

const reducer = combineReducers({
  [session.reducerPath]: session.reducer,
  [chat.reducerPath]: chat.reducer,
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStoreProvider initialState={initialState} reducer={reducer}>
      <App />
    </GlobalStoreProvider>
  </React.StrictMode>
)
