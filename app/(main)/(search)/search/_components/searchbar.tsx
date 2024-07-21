'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import useDebounce from '@/hook/use-debounce'

export default function SearchBar() {
  const router = useRouter()
  const [input, setInput] = useState('')
  const { debouncedValue } = useDebounce(input)

  useEffect(() => {
    const query = debouncedValue ? `?search_query=${debouncedValue}` : ''
    router.push(`/search${query}`)
  }, [router, debouncedValue])

  return (
    <Input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      type="search"
      placeholder="Search user..."
    />
  )
}
