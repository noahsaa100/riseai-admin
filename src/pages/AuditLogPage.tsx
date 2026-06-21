import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { DataTable, type Column } from '@/components/DataTable'

interface AuditRow {
  id: string
  actor_user_id: string
  action: string
  entity_type: string
  entity_id: string | null
  created_at: string
}

interface UserMap {
  email: string | null
  display_name: string | null
}

export function AuditLogPage() {
  const [logs, setLogs] = useState<AuditRow[]>([])
  const [users, setUsers] = useState<Record<string, UserMap>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true)
      setError(null)
      try {
        const { data, error: err } = await supabase
          .from('audit_logs')
          .select('id, actor_user_id, action, entity_type, entity_id, created_at')
          .order('created_at', { ascending: false })
          .limit(200)

        if (err) { setError(err.message); setLoading(false); return }

        const rows = data as AuditRow[]

        const userIds = [...new Set(rows.map((r) => r.actor_user_id))]
        let userMap: Record<string, UserMap> = {}
        if (userIds.length > 0) {
          const { data: profiles } = await supabase
            .from('user_profiles')
            .select('user_id, email, display_name')
            .in('user_id', userIds)
            .not('email', 'is', null)

          userMap = (profiles ?? []).reduce((acc, p) => {
            acc[p.user_id] = { email: p.email, display_name: p.display_name }
            return acc
          }, {} as Record<string, UserMap>)
        }

        setUsers(userMap)
        setLogs(rows)
      } catch (err) {
        console.error('Audit log fetch exception:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchLogs()
  }, [])

  const columns: Column<AuditRow>[] = [
    {
      key: 'actor',
      header: 'Actor',
      render: (r) => {
        const u = users[r.actor_user_id]
        return (
          <div className="flex flex-col">
            <span className="font-medium">{u?.display_name ?? 'System'}</span>
            {u?.email && <span className="text-xs text-muted-foreground">{u.email}</span>}
          </div>
        )
      },
    },
    { key: 'action', header: 'Action', render: (r) => <span className="font-medium">{r.action}</span> },
    {
      key: 'entity',
      header: 'Entity',
      render: (r) => `${r.entity_type}${r.entity_id ? ` (${r.entity_id.slice(0, 8)}...)` : ''}`,
    },
    { key: 'at', header: 'Timestamp', render: (r) => new Date(r.created_at).toLocaleString() },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Audit Log</h1>
      <DataTable columns={columns} data={logs} isLoading={loading} error={error} emptyMessage="No audit log entries found." />
    </div>
  )
}
