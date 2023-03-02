import { MyError } from '../types'

export const isMyKnownError = (error: unknown): error is MyError => {
  if (typeof error !== 'object' || !error) return false

  if ('message' in error && 'statusCode' in error) {
    return true
  }

  return false
}
