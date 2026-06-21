import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { DataTable, type Column } from '@/components/DataTable'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface TaskRow {
  id: string
  based_on_goal: string
  title: string
  status: string
  scheduled_for: string
  estimated_minutes: number | null
  user_id: string | null
}

interface UserMap {
  email: string | null
  display_name: string | null
}

const RING_COLORS: Record<string, string> = { money: '#22c55e', body: '#3b82f6', social: '#f97316' }

export function TasksPage() {
  const [tasks, setTasks] = useState<TaskRow[]>([])
  const [users, setUsers] = useState<Record<string, UserMap>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ringFilter, setRingFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true)
      setError(null)
      try {
        let query = supabase
          .from('daily_tasks')
          .select('id, based_on_goal, title, status, scheduled_for, estimated_minutes, user_id')
          .order('scheduled_for', { ascending: false })
          .limit(200)

        if (ringFilter !== 'all') query = query.eq('based_on_goal' as never, ringFilter as never)
        if (statusFilter !== 'all') query = query.eq('status' as never, statusFilter as never)

        const { data, error: err } = await query
        if (err) { setError(err.message); setLoading(false); return }

        const rows = data as unknown as TaskRow[]

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
        setTasks(rows)
      } catch (err) {
        console.error('Tasks fetch exception:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [ringFilter, statusFilter])

  const columns: Column<TaskRow>[] = [
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
    {
      key: 'ring',
      header: 'Ring',
      render: (r) => (
        <Badge style={{ backgroundColor: RING_COLORS[r.based_on_goal] || '#888' }} className="text-white">
          {r.based_on_goal}
        </Badge>
      ),
    },
    { key: 'title', header: 'Title', render: (r) => <span className="max-w-48 truncate block">{r.title}</span> },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <Badge variant={r.status === 'completed' ? 'default' : 'secondary'}>{r.status}</Badge>,
    },
    { key: 'scheduled_for', header: 'Scheduled', render: (r) => new Date(r.scheduled_for).toLocaleDateString() },
    { key: 'est', header: 'Est.', render: (r) => (r.estimated_minutes ? `${r.estimated_minutes}m` : '-') },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
      <div className="flex gap-3">
        <Select value={ringFilter} onValueChange={(v) => setRingFilter(v ?? 'all')}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Ring" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rings</SelectItem>
            <SelectItem value="money">Money</SelectItem>
            <SelectItem value="body">Body</SelectItem>
            <SelectItem value="social">Social</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? 'all')}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="skipped">Skipped</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable columns={columns} data={tasks} isLoading={loading} error={error} />
    </div>
  )
}
