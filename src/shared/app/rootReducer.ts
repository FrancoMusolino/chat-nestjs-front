import { session } from '../features/session/session.reducer'

export const initialState = {
  session: session.initialState,
}

export type InitialStateType = typeof initialState

export const combineReducers = (reducers: any) => {
  return (state: any, action: any) => {
    return Object.keys(reducers).reduce((acc, prop) => {
      return {
        ...acc,
        [prop]: reducers[prop](acc[prop], action),
      }
    }, state)
  }
}
