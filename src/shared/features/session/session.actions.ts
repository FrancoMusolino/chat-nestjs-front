import { START_SESSION, END_SESSION } from './session.actionTypes'

type StartSessionPayload = {
  id: string
  username: string
  profilePicture?: string
  status: string
  token: string
}

export const startSession = (
  payload: StartSessionPayload
): { type: typeof START_SESSION; payload: StartSessionPayload } => ({
  type: START_SESSION,
  payload,
})

export const endSession = (): {
  type: typeof END_SESSION
} => ({
  type: END_SESSION,
})
