import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  Users, Target, CheckSquare, TrendingUp, Activity,
  Zap, ArrowUpRight, ArrowDownRight, Clock,
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar,
} from 'recharts'

interface DashboardStats {
  totalUsers: number
  activeMissions: number
  tasksToday: number
  tasksCompleted: number
  userGrowth: { date: string; count: number }[]
  ringDistribution: { name: string; value: number; color: string }[]
  taskStatusBreakdown: { status: string; count: number; color: string }[]
  recentMissions: RecentMission[]
  recentTasks: RecentTask[]
}

interface RecentMission {
  id: string
  goal: string
  ring: string
  status: string
  current_progress: number
  target_value: number
  created_at: string
}

interface RecentTask {
  id: string
  title: string
  status: string
  scheduled_for: string
  based_on_goal: string
}

const RING_COLORS: Record<string, string> = {
  money: '#d4a017',
  body: '#22c55e',
  social: '#3b82f6',
}

const STATUS_COLORS: Record<string, string> = {
  completed: '#22c55e',
  pending: '#f59e0b',
  in_progress: '#3b82f6',
  skipped: '#ef4444',
}

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const today = new Date().toISOString().split('T')[0]
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

        const [
          usersRes,
          missionsRes,
          tasksRes,
          tasksCompletedRes,
          recentUsersRes,
          allMissionsRes,
          allTasksRes,
          recentMissionsRes,
          recentTasksRes,
        ] = await Promise.all([
          supabase.from('user_profiles').select('*', { count: 'exact', head: true }).is('deleted_at', null).not('email', 'is', null),
          supabase.from('missions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
          supabase.from('daily_tasks').select('*', { count: 'exact', head: true }).eq('scheduled_for', today),
          supabase.from('daily_tasks').select('*', { count: 'exact', head: true }).eq('scheduled_for', today).eq('completed', true),
          supabase.from('user_profiles').select('created_at').gte('created_at', sevenDaysAgo).not('email', 'is', null),
          supabase.from('missions').select('ring').eq('status', 'active'),
          supabase.from('daily_tasks').select('status').eq('scheduled_for', today),
          supabase.from('missions').select('id, goal, ring, status, current_progress, target_value, created_at').eq('status', 'active').order('created_at', { ascending: false }).limit(5),
          supabase.from('daily_tasks').select('id, title, status, scheduled_for, based_on_goal').eq('scheduled_for', today).order('created_at', { ascending: false }).limit(5),
        ])

        // Build user growth (last 7 days)
        const userGrowthMap = new Map<string, number>()
        for (let i = 6; i >= 0; i--) {
          const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
          userGrowthMap.set(d.toISOString().split('T')[0], 0)
        }
        ;(recentUsersRes.data ?? []).forEach((u: { created_at: string }) => {
          const date = u.created_at.split('T')[0]
          if (userGrowthMap.has(date)) {
            userGrowthMap.set(date, (userGrowthMap.get(date) ?? 0) + 1)
          }
        })
        const userGrowth = Array.from(userGrowthMap.entries()).map(([date, count]) => ({
          date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
          count,
        }))

        // Ring distribution
        const ringCounts: Record<string, number> = { money: 0, body: 0, social: 0 }
        ;(allMissionsRes.data ?? []).forEach((m: { ring: string }) => {
          ringCounts[m.ring] = (ringCounts[m.ring] ?? 0) + 1
        })
        const ringDistribution = Object.entries(ringCounts)
          .filter(([, v]) => v > 0)
          .map(([name, value]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            value,
            color: RING_COLORS[name] ?? '#888',
          }))

        // Task status breakdown
        const statusCounts: Record<string, number> = {}
        ;(allTasksRes.data ?? []).forEach((t: { status: string }) => {
          statusCounts[t.status] = (statusCounts[t.status] ?? 0) + 1
        })
        const taskStatusBreakdown = Object.entries(statusCounts).map(([status, count]) => ({
          status: status.replace('_', ' '),
          count,
          color: STATUS_COLORS[status] ?? '#888',
        }))

        setStats({
          totalUsers: usersRes.count ?? 0,
          activeMissions: missionsRes.count ?? 0,
          tasksToday: tasksRes.count ?? 0,
          tasksCompleted: tasksCompletedRes.count ?? 0,
          userGrowth,
          ringDistribution,
          taskStatusBreakdown,
          recentMissions: (recentMissionsRes.data ?? []) as RecentMission[],
          recentTasks: (recentTasksRes.data ?? []) as RecentTask[],
        })
      } catch (err) {
        console.error('Dashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const completionRate = stats && stats.tasksToday > 0
    ? Math.round((stats.tasksCompleted / stats.tasksToday) * 100)
    : 0

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers ?? 0,
      icon: Users,
      trend: '+12%',
      trendUp: true,
      gradient: 'from-amber-50 to-amber-100/50',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Active Missions',
      value: stats?.activeMissions ?? 0,
      icon: Target,
      trend: '+5%',
      trendUp: true,
      gradient: 'from-emerald-50 to-emerald-100/50',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Tasks Today',
      value: stats?.tasksToday ?? 0,
      icon: CheckSquare,
      trend: `${completionRate}% done`,
      trendUp: completionRate >= 50,
      gradient: 'from-sky-50 to-sky-100/50',
      iconBg: 'bg-sky-100',
      iconColor: 'text-sky-600',
    },
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      icon: TrendingUp,
      trend: stats ? `${stats.tasksCompleted} done` : '0 done',
      trendUp: true,
      gradient: 'from-violet-50 to-violet-100/50',
      iconBg: 'bg-violet-100',
      iconColor: 'text-violet-600',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">Overview of your Rise AI platform</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Activity className="w-4 h-4" />
          <span>Live</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card
            key={card.title}
            className={`relative overflow-hidden border-0 shadow-sm bg-gradient-to-br ${card.gradient}`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
              <div className={`${card.iconBg} p-2 rounded-lg`}>
                <card.icon className={`h-4 w-4 ${card.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-9 w-20" />
              ) : (
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold text-gray-900">{card.value}</div>
                  <div className={`flex items-center gap-0.5 text-xs font-medium ${card.trendUp ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {card.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {card.trend}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth Line Chart */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">User Growth</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">New signups over the last 7 days</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-[#d4a017]" />
                New Users
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[260px] w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={stats?.userGrowth ?? []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#888' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#888' }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      fontSize: '13px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#d4a017"
                    strokeWidth={2.5}
                    dot={{ fill: '#d4a017', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Ring Distribution Pie Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Mission Rings</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Distribution by goal category</p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[260px] w-full" />
            ) : (
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={stats?.ringDistribution ?? []}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {(stats?.ringDistribution ?? []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: '12px',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        fontSize: '13px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                  {(stats?.ringDistribution ?? []).map((entry) => (
                    <div key={entry.name} className="flex items-center gap-1.5 text-xs">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-muted-foreground">{entry.name}</span>
                      <span className="font-semibold text-gray-700">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Status Bar Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Today's Task Status</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Breakdown by completion state</p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[200px] w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={stats?.taskStatusBreakdown ?? []} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis
                    dataKey="status"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#888' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#888' }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      fontSize: '13px',
                    }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {(stats?.taskStatusBreakdown ?? []).map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity Feed */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Latest missions and tasks</p>
              </div>
              <Zap className="w-4 h-4 text-[#d4a017]" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <>
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </>
            ) : (
              <>
                {/* Recent Missions */}
                {(stats?.recentMissions ?? []).map((mission) => (
                  <div key={mission.id} className="flex items-start gap-3 group">
                    <div
                      className="mt-0.5 w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: RING_COLORS[mission.ring] ?? '#888' }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900 truncate">{mission.goal}</span>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 shrink-0">
                          {mission.ring}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${Math.min(100, (mission.target_value > 0 ? (mission.current_progress / mission.target_value) * 100 : 0))}%`,
                              backgroundColor: RING_COLORS[mission.ring] ?? '#888',
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground shrink-0">
                          {mission.current_progress}/{mission.target_value}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(mission.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}

                {/* Divider if both exist */}
                {((stats?.recentMissions ?? []).length > 0 && (stats?.recentTasks ?? []).length > 0) && (
                  <div className="h-px bg-gray-100 my-3" />
                )}

                {/* Recent Tasks */}
                {(stats?.recentTasks ?? []).map((task) => (
                  <div key={task.id} className="flex items-center gap-3 group">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: STATUS_COLORS[task.status] ?? '#888' }}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-gray-700 truncate block">{task.title}</span>
                    </div>
                    <Badge
                      variant={task.status === 'completed' ? 'default' : 'secondary'}
                      className="text-[10px] px-1.5 py-0 h-5 shrink-0"
                    >
                      {task.status}
                    </Badge>
                  </div>
                ))}

                {(stats?.recentMissions ?? []).length === 0 && (stats?.recentTasks ?? []).length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">No recent activity</p>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
