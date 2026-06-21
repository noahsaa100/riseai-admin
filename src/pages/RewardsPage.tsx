import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

interface RewardRow {
  id: string
  reward_key: string
  name: string
  description: string | null
  item_type: string
  cost_points: number
  is_active: boolean
  created_at?: string
}

import { useEffect } from 'react'
import { DataTable, type Column } from '@/components/DataTable'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Plus, Pencil, Trash2 } from 'lucide-react'

const ITEM_TYPES = ['feature_unlock', 'community_access', 'physical_reward', 'virtual_reward']

export function RewardsPage() {
  const [rewards, setRewards] = useState<RewardRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<RewardRow | null>(null)

  async function fetchRewards() {
    setLoading(true)
    setError(null)
    const { data, error: err } = await supabase.from('reward_catalog').select('*').order('created_at', { ascending: false })
    if (err) { setError(err.message); setLoading(false); return }
    setRewards(data as RewardRow[])
    setLoading(false)
  }

  useEffect(() => { fetchRewards() }, [])

  const columns: Column<RewardRow>[] = [
    { key: 'name', header: 'Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'key', header: 'Key', render: (r) => <code className="text-xs text-muted-foreground">{r.reward_key}</code> },
    { key: 'type', header: 'Type', render: (r) => <Badge variant="outline">{r.item_type}</Badge> },
    { key: 'cost', header: 'Cost', render: (r) => `${r.cost_points.toLocaleString()} pts` },
    {
      key: 'active', header: 'Active', render: (r) => (
        <Badge variant={r.is_active ? 'default' : 'secondary'}>{r.is_active ? 'Yes' : 'No'}</Badge>
      ),
    },
    {
      key: 'actions', header: 'Actions', render: (r) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => { setEditing(r); setFormOpen(true) }}><Pencil className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" onClick={() => handleDeactivate(r)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
        </div>
      ),
    },
  ]

  async function handleDeactivate(reward: RewardRow) {
    setError(null)
    const { data: deletedRow, error: deleteErr } = await supabase
      .from('reward_catalog')
      .delete()
      .eq('id', reward.id)
      .select('id')
      .maybeSingle()

    if (!deleteErr && deletedRow) {
      fetchRewards()
      return
    }

    const shouldFallbackToDeactivate =
      deleteErr?.code === '23503' ||
      /foreign key|constraint/i.test(deleteErr?.message || '')

    if (!shouldFallbackToDeactivate && deleteErr) {
      setError(`Failed to delete reward: ${deleteErr.message}`)
      return
    }

    const { data: updatedRow, error: updateErr } = await supabase
      .from('reward_catalog')
      .update({ is_active: false })
      .eq('id', reward.id)
      .select('id')
      .maybeSingle()

    if (updateErr) {
      setError(`Failed to deactivate reward: ${updateErr.message}`)
      return
    }

    if (!updatedRow) {
      setError('No reward was changed. You may not have permission to modify this row.')
      return
    }

    fetchRewards()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Reward Catalog</h1>
        <Button onClick={() => { setEditing(null); setFormOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" /> Create Reward
        </Button>
      </div>
      <RewardStats rewards={rewards} />
      <DataTable columns={columns} data={rewards} isLoading={loading} error={error} />
      <RewardFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        reward={editing}
        onSaved={fetchRewards}
      />
    </div>
  )
}

function RewardStats({ rewards }: { rewards: RewardRow[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Items</CardTitle></CardHeader>
        <CardContent><div className="text-2xl font-bold">{rewards.length}</div></CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Active</CardTitle></CardHeader>
        <CardContent><div className="text-2xl font-bold">{rewards.filter((r) => r.is_active).length}</div></CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Avg Cost</CardTitle></CardHeader>
        <CardContent><div className="text-2xl font-bold">{rewards.length ? Math.round(rewards.reduce((s, r) => s + r.cost_points, 0) / rewards.length).toLocaleString() : 0} pts</div></CardContent>
      </Card>
    </div>
  )
}

function RewardFormDialog({ open, onClose, reward, onSaved }: {
  open: boolean; onClose: () => void; reward: RewardRow | null; onSaved: () => void;
}) {
  const isEdit = !!reward
  const [name, setName] = useState(reward?.name ?? '')
  const [description, setDescription] = useState(reward?.description ?? '')
  const [itemType, setItemType] = useState(reward?.item_type ?? 'feature_unlock')
  const [costPoints, setCostPoints] = useState(reward?.cost_points?.toString() ?? '0')
  const [isActive, setIsActive] = useState(reward?.is_active ?? true)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSave() {
    setFormError(null)
    setSaving(true)
    if (isEdit) {
      const { error: err } = await supabase.from('reward_catalog').update({
        name, description: description || null, item_type: itemType as never,
        cost_points: parseInt(costPoints) || 0, is_active: isActive,
      }).eq('id', reward!.id)
      if (err) { setFormError(err.message); setSaving(false); return }
    } else {
      const { error: err } = await supabase.from('reward_catalog').insert({
        name, description: description || null,
        item_type: itemType as never, cost_points: parseInt(costPoints) || 0, is_active: isActive,
      } as never)
      if (err) { setFormError(err.message); setSaving(false); return }
    }

    setSaving(false)
    onSaved()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Reward' : 'Create Reward'}</DialogTitle>
          <DialogDescription>{isEdit ? 'Update the reward catalog item.' : 'Add a new item to the reward catalog.'}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Advanced Coach" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What does this reward unlock?" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Item Type</Label>
              <Select value={itemType} onValueChange={(v) => setItemType(v ?? 'advanced-coach')}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ITEM_TYPES.map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Cost (points)</Label>
              <Input type="number" min="0" value={costPoints} onChange={(e) => setCostPoints(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={isActive} onCheckedChange={setIsActive} />
            <Label>Active</Label>
          </div>
          {formError && <p className="text-sm text-destructive">{formError}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving || !name.trim()}>{saving ? 'Saving...' : 'Save'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
