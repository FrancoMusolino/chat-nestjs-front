import {
  START_SESSION,
  END_SESSION,
  UPDATE_SESSION,
} from './session.actionTypes'

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

type UpdateSessionPayload = {
  profilePicture?: string
  status?: string
}

export const updateSession = (
  payload: UpdateSessionPayload
): { type: typeof UPDATE_SESSION; payload: UpdateSessionPayload } => ({
  type: UPDATE_SESSION,
  payload,
})

export const endSession = (): {
  type: typeof END_SESSION
} => ({
  type: END_SESSION,
})
