import { useEffect, useState } from 'react'

export const useDebounceValue = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounceValue
}
