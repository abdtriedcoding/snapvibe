import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-96 w-full items-center justify-center">
      <Loader2 className="h-8 min-h-96 w-8 animate-spin" />
    </div>
  )
}
