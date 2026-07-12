'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AppLayout } from '@/components/layout/app-layout'
import { Coins, Plus, ShoppingCart, Check } from 'lucide-react'

const STORAGE_KEY = 'ecosphere-rewards-data'

const initialRewards = [
  { id: 1, name: 'Coffee Shop Voucher', description: '$10 voucher for company cafeteria', points: 100, icon: '☕', available: 45, redeemed: 156, status: 'Available' },
  { id: 2, name: 'Extra Day Off', description: 'One paid day off to use anytime', points: 500, icon: '🏖️', available: 12, redeemed: 23, status: 'Available' },
  { id: 3, name: 'Fitness Membership', description: '3-month gym membership', points: 750, icon: '💪', available: 8, redeemed: 5, status: 'Available' },
]

const initialHistory = [
  { id: 1, user: 'Sarah Chen', reward: 'Extra Day Off', points: 500, date: '2024-06-10', status: 'Redeemed' },
  { id: 2, user: 'James Mitchell', reward: 'Coffee Shop Voucher', points: 100, date: '2024-06-09', status: 'Redeemed' },
]

export default function RewardsPage() {
  const [rewards, setRewards] = useState(initialRewards)
  const [history, setHistory] = useState(initialHistory)
  const [userPoints, setUserPoints] = useState(2850)
  const [selectedReward, setSelectedReward] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', description: '', points: '500', icon: '🎁' })
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return
    try {
      const parsed = JSON.parse(saved)
      if (parsed?.rewards) setRewards(parsed.rewards)
      if (parsed?.history) setHistory(parsed.history)
      if (typeof parsed?.userPoints === 'number') setUserPoints(parsed.userPoints)
    } catch {
      // ignore malformed storage
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ rewards, history, userPoints }))
    }
  }, [rewards, history, userPoints])

  const handleAddReward = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.name) return

    const payload = {
      id: Date.now(),
      name: form.name,
      description: form.description || 'New team reward',
      points: Number(form.points),
      icon: form.icon,
      available: 20,
      redeemed: 0,
      status: 'Available',
    }

    setRewards((current) => [payload, ...current])
    setForm({ name: '', description: '', points: '500', icon: '🎁' })
    setOpen(false)
    setMessage('Reward added successfully')
  }

  const handleRedeem = (rewardId: number) => {
    const reward = rewards.find((item) => item.id === rewardId)
    if (!reward || userPoints < reward.points) return

    setUserPoints((current) => current - reward.points)
    setRewards((current) =>
      current.map((item) => {
        if (item.id !== rewardId) return item
        return {
          ...item,
          available: Math.max(0, item.available - 1),
          redeemed: item.redeemed + 1,
        }
      }),
    )
    setHistory((current) => [{ id: Date.now(), user: 'You', reward: reward.name, points: reward.points, date: new Date().toISOString().slice(0, 10), status: 'Redeemed' }, ...current])
    setMessage(`${reward.name} redeemed successfully`)
  }

  const totalRedeemed = history.filter((item) => item.status === 'Redeemed').length
  const popularReward = rewards.reduce((best, reward) => reward.redeemed > best.redeemed ? reward : best, rewards[0])

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Rewards</h1>
            <p className="text-muted-foreground mt-1">Redeem your points for rewards</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white gap-2"><Plus className="w-4 h-4" />Add Reward</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Reward</DialogTitle>
                <DialogDescription>Create a new reward for team members</DialogDescription>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleAddReward}>
                <div className="space-y-2"><label className="text-sm font-medium">Reward Name</label><input placeholder="e.g., Wireless Earbuds" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background" /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Description</label><textarea placeholder="Describe the reward" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-md border border-input bg-background" rows={3} /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Points Required</label><input type="number" placeholder="e.g., 500" value={form.points} onChange={(e) => setForm({ ...form, points: e.target.value })} className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background" /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Icon</label><input placeholder="🎁" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background" /></div>
                <Button className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white" type="submit">Add Reward</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {message && <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{message}</div>}

        <Card className="border-0 shadow-sm bg-gradient-to-r from-[#16a34a]/10 to-[#2563eb]/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Your Points</p>
                <p className="text-4xl font-bold text-[#16a34a] mt-2">{userPoints}</p>
                <p className="text-sm text-muted-foreground mt-2">Enough for <span className="font-semibold text-foreground">1 Extra Day Off + Coffee Voucher</span></p>
              </div>
              <Coins className="w-16 h-16 text-[#16a34a] opacity-20" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm"><CardContent className="pt-6"><div className="space-y-2"><span className="text-sm text-muted-foreground">Total Rewards</span><p className="text-3xl font-bold text-foreground">{rewards.length}</p><p className="text-xs text-muted-foreground">Available</p></div></CardContent></Card>
          <Card className="border-0 shadow-sm"><CardContent className="pt-6"><div className="space-y-2"><span className="text-sm text-muted-foreground">Total Redeemed</span><p className="text-3xl font-bold text-foreground">{rewards.reduce((sum, reward) => sum + reward.redeemed, 0)}</p><p className="text-xs text-muted-foreground">{totalRedeemed} this month</p></div></CardContent></Card>
          <Card className="border-0 shadow-sm"><CardContent className="pt-6"><div className="space-y-2"><span className="text-sm text-muted-foreground">Most Popular</span><p className="text-lg font-bold text-foreground">{popularReward?.name || 'N/A'}</p><p className="text-xs text-muted-foreground">{popularReward?.redeemed || 0} redeemed</p></div></CardContent></Card>
          <Card className="border-0 shadow-sm"><CardContent className="pt-6"><div className="space-y-2"><span className="text-sm text-muted-foreground">Participation</span><p className="text-3xl font-bold text-foreground">87%</p><p className="text-xs text-green-600">Of team</p></div></CardContent></Card>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Available Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <Card key={reward.id} className={`border-0 shadow-sm hover:shadow-md transition cursor-pointer ${selectedReward === reward.id ? 'ring-2 ring-[#16a34a]' : ''}`} onClick={() => setSelectedReward(reward.id)}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="text-4xl">{reward.icon}</div>
                    <div>
                      <h3 className="font-semibold text-foreground">{reward.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{reward.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-1"><Coins className="w-4 h-4 text-[#16a34a]" /><span className="font-semibold text-foreground">{reward.points}</span></div>
                      <Badge variant="outline" className={reward.status === 'Available' ? 'bg-green-100 text-green-700' : reward.status === 'Limited Stock' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}>{reward.status}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{reward.available} available • {reward.redeemed} redeemed</div>
                    <Button className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white gap-2" disabled={userPoints < reward.points} onClick={() => handleRedeem(reward.id)}>
                      <ShoppingCart className="w-4 h-4" />{userPoints >= reward.points ? 'Redeem' : 'Not Enough Points'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Redemption History</CardTitle>
            <CardDescription>Recent reward redemptions by team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {history.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition">
                  <div>
                    <p className="font-semibold text-foreground">{item.user}</p>
                    <p className="text-sm text-muted-foreground mt-1">Redeemed {item.reward}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1"><Coins className="w-4 h-4 text-[#16a34a]" /><span className="font-semibold">{item.points}</span></div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                      <Badge variant="outline" className={item.status === 'Redeemed' ? 'bg-green-100 text-green-700 mt-1' : 'bg-yellow-100 text-yellow-700 mt-1'}>{item.status}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
