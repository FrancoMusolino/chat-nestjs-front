import { ReducerType } from '../../types'
import { APPLY_FILTER } from './chat.actionTypes'

export type ChatState = {
  filter: string
}

const chatInitialState: ChatState = {
  filter: '',
}

type UpdateAction = {
  type: typeof APPLY_FILTER
  payload: Pick<ChatState, 'filter'>
}

export type ChatAction = UpdateAction

const chatReducer = (state: ChatState, action: ChatAction) => {
  const { type } = action

  switch (type) {
    case APPLY_FILTER: {
      const { filter } = action.payload

      return { ...state, filter }
    }

    default:
      return state
  }
}

export const chat: ReducerType<ChatState, ChatAction> = {
  reducerPath: 'chat',
  reducer: chatReducer,
  initialState: chatInitialState,
}
