export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="mx-auto min-h-screen max-w-2xl space-y-8">{children}</main>
  )
}
