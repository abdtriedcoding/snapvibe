import { auth } from '@/lib/auth'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Login',
}

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (session?.user) {
    return redirect('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  )
}
