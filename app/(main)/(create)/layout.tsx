import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Post',
}

export default async function CreatePostLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
