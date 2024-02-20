import { auth } from '@/lib/auth'
import AdminPanelLayout from '@/components/admin-panel-layout'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return <AdminPanelLayout session={session}>{children}</AdminPanelLayout>
}
