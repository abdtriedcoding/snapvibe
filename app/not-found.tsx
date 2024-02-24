import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <Image
        src="/not-found.png"
        alt="404"
        loading="lazy"
        width={300}
        height={300}
        className="dark:invert"
      />

      <Button size={'lg'} asChild>
        <Link href="/"> Go Back</Link>
      </Button>
    </main>
  )
}
