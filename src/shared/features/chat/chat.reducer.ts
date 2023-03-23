import { ReducerType } from '../../types'
import { APPLY_FILTER, CHANGE_VISIBILITY } from './chat.actionTypes'

export type ChatState = {
  filter: string
  infoPanelIsVisible: boolean
}

const chatInitialState: ChatState = {
  filter: '',
  infoPanelIsVisible: false,
}

type UpdateFilterAction = {
  type: typeof APPLY_FILTER
  payload: Pick<ChatState, 'filter'>
}

type UpdateVisibilityAction = {
  type: typeof CHANGE_VISIBILITY
  payload: Pick<ChatState, 'infoPanelIsVisible'>
}

export type ChatAction = UpdateFilterAction | UpdateVisibilityAction

const chatReducer = (state: ChatState, action: ChatAction) => {
  const { type } = action

  switch (type) {
    case APPLY_FILTER: {
      const { filter } = action.payload

      return { ...state, filter }
    }

    case CHANGE_VISIBILITY: {
      const { infoPanelIsVisible } = action.payload

      return { ...state, infoPanelIsVisible }
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
