import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex md:overflow-hidden">
      <div className="hidden md:block w-20 lg:w-64 md:border-r">
        <Sidebar />
      </div>
      <div className="flex-1 w-full md:overflow-y-auto p-4 max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
