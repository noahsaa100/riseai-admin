import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { DataTable, type Column } from '@/components/DataTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface SubRow {
  user_id: string
  email: string | null
  display_name: string | null
  subscription_tier: string | null
  subscription_status: string
  subscription_plan: string | null
  trial_ends_at: string | null
  subscription_ends_at: string | null
}

export function SubscriptionsPage() {
  const [subs, setSubs] = useState<SubRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [summary, setSummary] = useState({ active: 0, trialing: 0, expired: 0 })

  useEffect(() => {
    async function fetchSubs() {
      setLoading(true)
      setError(null)
      let query = supabase
        .from('user_profiles')
        .select('user_id, email, display_name, subscription_tier, subscription_status, subscription_plan, trial_ends_at, subscription_ends_at')
        .not('subscription_status', 'is', null)
        .not('email', 'is', null)
        .order('created_at', { ascending: false })
        .limit(200)

      if (statusFilter !== 'all') query = query.eq('subscription_status', statusFilter)

      const { data, error: err } = await query
      if (err) { setError(err.message); setLoading(false); return }
      const rows = data as SubRow[]
      setSubs(rows)
      setSummary({
        active: rows.filter((r) => r.subscription_status === 'active').length,
        trialing: rows.filter((r) => r.subscription_status === 'trialing').length,
        expired: rows.filter((r) => r.subscription_status === 'expired').length,
      })
      setLoading(false)
    }
    fetchSubs()
  }, [statusFilter])

  const columns: Column<SubRow>[] = [
    { key: 'user', header: 'User', render: (r) => (
      <div className="flex flex-col">
        <span className="font-medium">{r.display_name ?? 'Unnamed'}</span>
        <span className="text-xs text-muted-foreground">{r.email}</span>
      </div>
    )},
    { key: 'tier', header: 'Tier', render: (r) => r.subscription_tier ?? '-' },
    { key: 'plan', header: 'Plan', render: (r) => r.subscription_plan ?? '-' },
    { key: 'status', header: 'Status', render: (r) => (
      <Badge variant={r.subscription_status === 'active' ? 'default' : r.subscription_status === 'trialing' ? 'secondary' : 'outline'}>
        {r.subscription_status}
      </Badge>
    )},
    { key: 'trial', header: 'Trial Ends', render: (r) => r.trial_ends_at ? new Date(r.trial_ends_at).toLocaleDateString() : '-' },
    { key: 'sub_ends', header: 'Sub Ends', render: (r) => r.subscription_ends_at ? new Date(r.subscription_ends_at).toLocaleDateString() : '-' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Subscriptions</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Active</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{summary.active}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Trialing</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{summary.trialing}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Expired</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{summary.expired}</div></CardContent>
        </Card>
      </div>
      <div className="flex gap-3">
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? 'all')}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="trialing">Trialing</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable columns={columns} data={subs} isLoading={loading} error={error} />
    </div>
  )
}
