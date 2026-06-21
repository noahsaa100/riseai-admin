import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { DataTable, type Column } from '@/components/DataTable'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface AiRunRow {
  id: string
  run_type: string
  status: string
  model: string | null
  latency_ms: number | null
  requested_at: string
  user_id: string | null
}

interface UserMap {
  email: string | null
  display_name: string | null
}

export function AiRunsPage() {
  const [runs, setRuns] = useState<AiRunRow[]>([])
  const [users, setUsers] = useState<Record<string, UserMap>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState('all')

  useEffect(() => {
    async function fetchRuns() {
      setLoading(true)
      setError(null)
      try {
        let query = supabase
          .from('ai_runs')
          .select('id, run_type, status, model, latency_ms, requested_at, user_id')
          .order('requested_at', { ascending: false })
          .limit(200)

        if (typeFilter !== 'all') query = query.eq('run_type' as never, typeFilter as never)

        const { data, error: err } = await query
        if (err) { setError(err.message); setLoading(false); return }

        const rows = data as unknown as AiRunRow[]

        const userIds = [...new Set(rows.map((r) => r.user_id).filter(Boolean))] as string[]
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
        setRuns(rows)
      } catch (err) {
        console.error('AI runs fetch exception:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchRuns()
  }, [typeFilter])

  const columns: Column<AiRunRow>[] = [
    {
      key: 'user',
      header: 'User',
      render: (r) => {
        const u = r.user_id ? users[r.user_id] : null
        return (
          <div className="flex flex-col">
            <span className="font-medium">{u?.display_name ?? 'Anonymous'}</span>
            {u?.email && <span className="text-xs text-muted-foreground">{u.email}</span>}
          </div>
        )
      },
    },
    { key: 'type', header: 'Type', render: (r) => <Badge variant="outline">{r.run_type}</Badge> },
    {
      key: 'status',
      header: 'Status',
      render: (r) => (
        <Badge variant={r.status === 'completed' ? 'default' : r.status === 'failed' ? 'destructive' : 'secondary'}>
          {r.status}
        </Badge>
      ),
    },
    { key: 'model', header: 'Model', render: (r) => r.model ?? '-' },
    { key: 'latency', header: 'Latency', render: (r) => (r.latency_ms ? `${r.latency_ms}ms` : '-') },
    { key: 'at', header: 'Requested', render: (r) => new Date(r.requested_at).toLocaleString() },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">AI Runs</h1>
      <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v ?? 'all')}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="task_generation">Task Generation</SelectItem>
          <SelectItem value="mission_setup_questions">Mission Setup Questions</SelectItem>
          <SelectItem value="mission_setup_plan">Mission Setup Plan</SelectItem>
          <SelectItem value="mission_generation">Mission Generation</SelectItem>
          <SelectItem value="coach_nudge">Coach Nudge</SelectItem>
          <SelectItem value="behavioral_analysis">Behavioral Analysis</SelectItem>
          <SelectItem value="scan_analysis">Scan Analysis</SelectItem>
        </SelectContent>
      </Select>
      <DataTable columns={columns} data={runs} isLoading={loading} error={error} />
    </div>
  )
}
