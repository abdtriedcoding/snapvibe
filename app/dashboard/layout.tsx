import { auth } from '@/lib/auth'
import AdminPanelLayout from '@/components/admin-panel-layout'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const user = session?.user

  return <AdminPanelLayout user={user}>{children}</AdminPanelLayout>
}
