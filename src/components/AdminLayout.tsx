import { Sidebar } from './Sidebar'

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
