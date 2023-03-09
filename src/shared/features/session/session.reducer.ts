import { decrypt, encrypt } from '@/shared/helpers'
import { ReducerType } from '../../types'

import {
  END_SESSION,
  REHYDRATE,
  START_SESSION,
  UPDATE_SESSION,
} from './session.actionTypes'

export type SessionState = {
  id: string
  username: string
  profilePicture?: string
  status: string
  token: string
  session: boolean
}

const sessionInitialState: SessionState = {
  id: '',
  username: '',
  profilePicture: '',
  status: '',
  token: '',
  session: false,
}

type StartAction = {
  type: typeof START_SESSION
  payload: Omit<SessionState, 'session'>
}

type UpdateAction = {
  type: typeof UPDATE_SESSION
  payload: Partial<Omit<SessionState, 'session'>>
}

type ResetAction = {
  type: typeof END_SESSION | typeof REHYDRATE
}

export type SessionAction = StartAction | UpdateAction | ResetAction

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

      storageSessionState(newSession)

      return { ...state, ...newSession }
    }

    case UPDATE_SESSION: {
      const updatedSession = { ...state, ...action.payload }

      storageSessionState(updatedSession)

      return { ...state, ...updatedSession }
    }

    case END_SESSION: {
      window.localStorage.removeItem(session.reducerPath)

      return sessionInitialState
    }

    default:
      return state
  }
}

const storageSessionState = (sessionState: SessionState) => {
  const encryptedStorage = encrypt(sessionState)
  window.localStorage.setItem(session.reducerPath, encryptedStorage)
}

export const session: ReducerType<SessionState, SessionAction> = {
  reducerPath: 'session',
  reducer: sessionReducer,
  initialState: sessionInitialState,
}
