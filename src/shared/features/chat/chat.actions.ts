import { APPLY_FILTER, CHANGE_VISIBILITY } from './chat.actionTypes'

type ApplyFilterPayload = {
  filter: string
}

export const applyFilter = (
  payload: ApplyFilterPayload
): {
  type: typeof APPLY_FILTER
  payload: ApplyFilterPayload
} => ({
  type: 'APPLY_FILTER',
  payload,
})

type ChangeInfoPanelVisibilityPayload = {
  infoPanelIsVisible: boolean
}

export const changeInfoPanelVisibility = (
  payload: ChangeInfoPanelVisibilityPayload
): {
  type: typeof CHANGE_VISIBILITY
  payload: ChangeInfoPanelVisibilityPayload
} => ({
  type: 'CHANGE_VISIBILITY',
  payload,
})
