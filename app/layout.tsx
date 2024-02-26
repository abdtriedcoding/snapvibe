import './globals.css'
import { Toaster } from 'sonner'
import { calSans } from '@/app/fonts'
import { constructMetadata } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/components/theme-provider'
import { extractRouterConfig } from 'uploadthing/server'
import { ourFileRouter } from '@/app/api/uploadthing/core'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'

export const metadata = constructMetadata()

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={calSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <Toaster richColors />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
