import { APPLY_FILTER } from './chat.actionTypes'

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
