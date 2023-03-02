import { decrypt, encrypt } from '@/shared/helpers'
import { ReducerType } from '../../types'

import { END_SESSION, REHYDRATE, START_SESSION } from './session.actionTypes'

type SessionState = {
  id: string
  username: string
  profilePicture?: string
  token: string
  session: boolean
}

const sessionInitialState: SessionState = {
  id: '',
  username: '',
  profilePicture: '',
  token: '',
  session: false,
}

type UpdateAction = {
  type: typeof START_SESSION
  payload: Omit<SessionState, 'session'>
}

type ResetAction = {
  type: typeof END_SESSION | typeof REHYDRATE
}

export type SessionAction = UpdateAction | ResetAction

const sessionReducer = (state: SessionState, action: SessionAction) => {
  const { type } = action

  switch (type) {
    case REHYDRATE: {
      const storage = window.localStorage.getItem(session.reducerPath)

      if (storage) {
        const decryptedStorage = decrypt(storage)

        return { ...state, ...decryptedStorage }
      }

      return state
    }

    case START_SESSION: {
      const newSession = { ...action.payload, session: true }

      const encryptedStorage = encrypt(newSession)
      window.localStorage.setItem(session.reducerPath, encryptedStorage)

      return { ...state, ...newSession }
    }

    case END_SESSION: {
      window.localStorage.removeItem(session.reducerPath)

      return sessionInitialState
    }

    default:
      return state
  }
}

export const session: ReducerType<SessionState, SessionAction> = {
  reducerPath: 'session',
  reducer: sessionReducer,
  initialState: sessionInitialState,
}
