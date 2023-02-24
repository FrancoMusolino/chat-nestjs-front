import { ReducerType } from '../../types'

import { END_SESSION, START_SESSION } from './session.actionTypes'

type SessionState = {
  id: string
  username: string
  token: string
  session: boolean
}

const sessionInitialState: SessionState = {
  id: '',
  username: '',
  token: '',
  session: false,
}

type UpdateAction = {
  type: typeof START_SESSION
  payload: Omit<SessionState, 'session'>
}

type ResetAction = {
  type: typeof END_SESSION
}

export type SessionAction = UpdateAction | ResetAction

const sessionReducer = (state: SessionState, action: SessionAction) => {
  const { type } = action

  switch (type) {
    case START_SESSION:
      return { ...state, ...action.payload, session: true }

    case END_SESSION:
      return sessionInitialState

    default:
      return state
  }
}

export const session: ReducerType<SessionState, SessionAction> = {
  reducerPath: 'session',
  reducer: sessionReducer,
  initialState: sessionInitialState,
}
