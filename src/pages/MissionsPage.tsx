import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { DataTable, type Column } from '@/components/DataTable'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface MissionRow {
  id: string
  ring: string
  goal: string
  status: string
  current_progress: number
  target_value: number
  deadline: string
  user_id: string
}

interface UserMap {
  email: string | null
  display_name: string | null
}

const RING_COLORS: Record<string, string> = { money: '#22c55e', body: '#3b82f6', social: '#f97316' }

export function MissionsPage() {
  const [missions, setMissions] = useState<MissionRow[]>([])
  const [users, setUsers] = useState<Record<string, UserMap>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ringFilter, setRingFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    async function fetchMissions() {
      setLoading(true)
      setError(null)
      try {
        let query = supabase
          .from('missions')
          .select('id, ring, goal, status, current_progress, target_value, deadline, user_id')
          .order('created_at', { ascending: false })
          .limit(200)

        if (ringFilter !== 'all') query = query.eq('ring' as never, ringFilter as never)
        if (statusFilter !== 'all') query = query.eq('status' as never, statusFilter as never)

        const { data, error: err } = await query
        if (err) { setError(err.message); setLoading(false); return }

        const rows = data as unknown as MissionRow[]

        const userIds = [...new Set(rows.map((r) => r.user_id))]
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
        setMissions(rows)
      } catch (err) {
        console.error('Missions fetch exception:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchMissions()
  }, [ringFilter, statusFilter])

  const columns: Column<MissionRow>[] = [
    {
      key: 'user',
      header: 'User',
      render: (r) => {
        const u = users[r.user_id]
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
        <Badge style={{ backgroundColor: RING_COLORS[r.ring] || '#888' }} className="text-white">
          {r.ring}
        </Badge>
      ),
    },
    { key: 'goal', header: 'Goal', render: (r) => <span className="max-w-40 truncate block">{r.goal}</span> },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <Badge variant={r.status === 'active' ? 'default' : 'secondary'}>{r.status}</Badge>,
    },
    { key: 'progress', header: 'Progress', render: (r) => `${r.current_progress} / ${r.target_value}` },
    { key: 'deadline', header: 'Deadline', render: (r) => (r.deadline ? new Date(r.deadline).toLocaleDateString() : '-') },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Missions</h1>
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable columns={columns} data={missions} isLoading={loading} error={error} />
    </div>
  )
}
