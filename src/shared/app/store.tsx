import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useCallback,
  Dispatch,
} from 'react'

import { InitialStateType } from './rootReducer'
import { SessionAction } from '../features/session/session.reducer'
import { ChatAction } from '../features/chat/chat.reducer'

type GlobalStoreType = {
  state: InitialStateType
  dispatch: Dispatch<SessionAction | ChatAction>
}

export const GlobalStore = createContext({} as GlobalStoreType)
GlobalStore.displayName = 'GlobalStore'

type GlobalStoreProviderProps = {
  children: ReactNode
  initialState: InitialStateType
  reducer: (state: any, action: any) => any
}

export const GlobalStoreProvider = ({
  children,
  initialState,
  reducer,
}: GlobalStoreProviderProps) => {
  const [state, reducerDispatch] = useReducer(reducer, initialState)

  const dispatch = useCallback((action: any) => {
    reducerDispatch(action)
  }, [])

  return (
    <GlobalStore.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStore.Provider>
  )
}

export const useGlobalStore = () => ({ state: useContext(GlobalStore).state })

export const useGlobalDispatch = () => useContext(GlobalStore).dispatch

export const useStoreSelector = <T extends keyof InitialStateType>(
  select: T
): InitialStateType[T] => useContext(GlobalStore).state[select]
