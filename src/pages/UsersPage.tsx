import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { DataTable, type Column } from '@/components/DataTable'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface UserRow {
  user_id: string
  email: string | null
  display_name: string | null
  status: string
  subscription_status: string
  created_at: string
  last_seen_at: string | null
  country_code: string | null
  onboarding_completed_at: string | null
}

export function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true)
      setError(null)
      try {
        let query = supabase
          .from('user_profiles')
          .select('user_id, email, display_name, status, subscription_status, created_at, last_seen_at, country_code, onboarding_completed_at')
          .is('deleted_at', null)
          .not('email', 'is', null)
          .order('created_at', { ascending: false })
          .limit(200)

        if (statusFilter !== 'all') query = query.eq('subscription_status', statusFilter)
        if (search) {
          query = query.or(`email.ilike.%${search}%,display_name.ilike.%${search}%`)
        }

        const { data, error: err } = await query
        if (err) {
          console.error('Users fetch error:', err)
          setError(err.message)
        } else {
          setUsers(data as UserRow[])
        }
      } catch (err) {
        console.error('Users fetch exception:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [search, statusFilter])

  const columns: Column<UserRow>[] = [
    { key: 'user', header: 'User', render: (r) => (
      <div className="flex flex-col">
        <span className="font-medium">{r.display_name ?? 'Unnamed'}</span>
        <span className="text-xs text-muted-foreground">{r.email}</span>
      </div>
    )},
    { key: 'status', header: 'Status', render: (r) => <Badge variant={r.status === 'active' ? 'default' : 'secondary'}>{r.status}</Badge> },
    { key: 'subscription', header: 'Subscription', render: (r) => <Badge variant={r.subscription_status === 'active' ? 'default' : 'outline'}>{r.subscription_status}</Badge> },
    { key: 'created_at', header: 'Joined', render: (r) => new Date(r.created_at).toLocaleDateString() },
    { key: 'last_seen_at', header: 'Last Seen', render: (r) => r.last_seen_at ? new Date(r.last_seen_at).toLocaleDateString() : '-' },
    { key: 'country', header: 'Country', render: (r) => r.country_code?.toUpperCase() ?? '-' },
    { key: 'onboarding', header: 'Onboarding', render: (r) => (
      <Badge variant={r.onboarding_completed_at ? 'default' : 'secondary'}>
        {r.onboarding_completed_at ? 'Complete' : 'Incomplete'}
      </Badge>
    )},
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Users</h1>
      <div className="flex gap-3">
        <Input placeholder="Search by email..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? 'all')}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Subscription" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="trialing">Trialing</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable columns={columns} data={users} isLoading={loading} error={error} />
    </div>
  )
}
