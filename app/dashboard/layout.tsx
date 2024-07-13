import getCurrentUser from '@/app/actions/get-current-user'
import AdminPanelLayout from '@/components/admin-panel-layout'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  return <AdminPanelLayout user={user}>{children}</AdminPanelLayout>
}
