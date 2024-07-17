'use client'

import Image from 'next/image'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    toast.error(error.message)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <Image
        src="/error.svg"
        priority
        height="300"
        width="300"
        alt="Error"
        className="dark:invert"
      />
      <h2 className="text-xl font-medium">Something went wrong!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}
