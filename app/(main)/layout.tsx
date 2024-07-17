import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminPanelLayout from '@/components/admin-panel-layout'

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return redirect('/login')
  }

  return <AdminPanelLayout user={user}>{children}</AdminPanelLayout>
}
