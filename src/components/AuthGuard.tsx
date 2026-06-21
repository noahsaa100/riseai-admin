import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Skeleton } from '@/components/ui/skeleton'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Skeleton className="h-8 w-48" />
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-lg font-semibold">Access Denied</p>
        <p className="text-muted-foreground">Your account does not have admin privileges.</p>
      </div>
    )
  }

  return <>{children}</>
}
