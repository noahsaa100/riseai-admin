import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { DataTable, type Column } from '@/components/DataTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface RefRow {
  id: string
  code: string
  redeemed_count: number
  status: string
  created_at: string
  owner_user_id: string
}

interface UserMap {
  email: string | null
  display_name: string | null
}

export function ReferralsPage() {
  const [refs, setRefs] = useState<RefRow[]>([])
  const [users, setUsers] = useState<Record<string, UserMap>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalRedeemed, setTotalRedeemed] = useState(0)

  useEffect(() => {
    async function fetchRefs() {
      setLoading(true)
      setError(null)
      try {
        const [{ data, error: err }, { count }] = await Promise.all([
          supabase
            .from('referral_codes')
            .select('id, code, redeemed_count, status, created_at, owner_user_id')
            .order('created_at', { ascending: false })
            .limit(200),
          supabase.from('referral_redemptions').select('*', { count: 'exact', head: true }),
        ])

        if (err) { setError(err.message); setLoading(false); return }

        const rows = data as unknown as RefRow[]

        const userIds = [...new Set(rows.map((r) => r.owner_user_id))]
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
        setRefs(rows)
        setTotalRedeemed(count ?? 0)
      } catch (err) {
        console.error('Referrals fetch exception:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchRefs()
  }, [])

  const columns: Column<RefRow>[] = [
    {
      key: 'owner',
      header: 'Owner',
      render: (r) => {
        const u = users[r.owner_user_id]
        return (
          <div className="flex flex-col">
            <span className="font-medium">{u?.display_name ?? 'Anonymous'}</span>
            {u?.email && <span className="text-xs text-muted-foreground">{u.email}</span>}
          </div>
        )
      },
    },
    { key: 'code', header: 'Code', render: (r) => <code className="text-xs">{r.code}</code> },
    { key: 'redemptions', header: 'Uses', render: (r) => r.redeemed_count },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <Badge variant={r.status === 'active' ? 'default' : 'secondary'}>{r.status}</Badge>,
    },
    { key: 'created', header: 'Created', render: (r) => new Date(r.created_at).toLocaleDateString() },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Referrals</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{refs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Redemptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRedeemed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Points Awarded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRedeemed * 30}</div>
          </CardContent>
        </Card>
      </div>
      <DataTable columns={columns} data={refs} isLoading={loading} error={error} />
    </div>
  )
}
