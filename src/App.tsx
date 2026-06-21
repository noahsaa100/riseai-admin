import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/hooks/useAuth'
import { AuthGuard } from '@/components/AuthGuard'
import { LoginPage } from '@/components/LoginPage'
import { AdminLayout } from '@/components/AdminLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { UsersPage } from '@/pages/UsersPage'
import { MissionsPage } from '@/pages/MissionsPage'
import { TasksPage } from '@/pages/TasksPage'
import { SubscriptionsPage } from '@/pages/SubscriptionsPage'
import { ReferralsPage } from '@/pages/ReferralsPage'
import { RewardsPage } from '@/pages/RewardsPage'
import { AiRunsPage } from '@/pages/AiRunsPage'
import { AuditLogPage } from '@/pages/AuditLogPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={
            <AuthGuard>
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/missions" element={<MissionsPage />} />
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/subscriptions" element={<SubscriptionsPage />} />
                  <Route path="/referrals" element={<ReferralsPage />} />
                  <Route path="/rewards" element={<RewardsPage />} />
                  <Route path="/ai-runs" element={<AiRunsPage />} />
                  <Route path="/audit-log" element={<AuditLogPage />} />
                </Routes>
              </AdminLayout>
            </AuthGuard>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
