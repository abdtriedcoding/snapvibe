import './globals.css'
import { Toaster } from 'sonner'
import { auth } from '@/lib/auth'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { extractRouterConfig } from 'uploadthing/server'
import { ourFileRouter } from '@/app/api/uploadthing/core'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import AdminPanelLayout from '@/components/admin-panel-layout'

// TODO: need to update font
const font = Poppins({ subsets: ['latin'], weight: ['500'] })

// TODO: update metadata, favicons
export const metadata: Metadata = {
  title: 'snapvibe',
  description:
    'A visually stunning platform for sharing moments, connecting with friends, and exploring the world through photos and videos.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  const user = session?.user

  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <Toaster richColors />
          <AdminPanelLayout user={user}>{children}</AdminPanelLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
