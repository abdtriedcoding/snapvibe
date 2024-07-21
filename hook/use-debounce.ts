import { useEffect, useState } from 'react'

export default function useDebounce(value: string) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setDebouncedValue(value)
    }, 500)

    return () => clearTimeout(intervalId)
  }, [value])

  return { debouncedValue }
}
