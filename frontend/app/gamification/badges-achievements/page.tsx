'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AppLayout } from '@/components/layout/app-layout'
import { Star, Trophy, Zap, Heart, Leaf, Users, Plus, Edit2, Trash2 } from 'lucide-react'

const iconMap: Record<string, any> = { Leaf, Star, Trophy, Zap, Heart, Users }
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5000'

export default function BadgesAchievementsPage() {
  const [badges, setBadges] = useState<any[]>([])
  const [achievements, setAchievements] = useState<any[]>([])
  const [selectedRarity, setSelectedRarity] = useState('All')
  const [badgeOpen, setBadgeOpen] = useState(false)
  const [achievementOpen, setAchievementOpen] = useState(false)
  const [badgeForm, setBadgeForm] = useState({ name: '', description: '', rarity: 'Common', criteria: '', color: 'bg-gray-100 text-gray-700' })
  const [achievementForm, setAchievementForm] = useState({ badgeName: '', user: '', date: '', description: '' })
  const [editingBadgeId, setEditingBadgeId] = useState<number | null>(null)

  const loadData = () => {
    fetch(`${API_BASE_URL}/api/gamification/badges`)
      .then((res) => res.ok ? res.json() : Promise.reject(new Error('Failed to load badges')))
      .then((data) => setBadges(data))
      .catch((err) => {
        console.error('Error fetching badges:', err)
        setBadges([])
      })

    fetch(`${API_BASE_URL}/api/gamification/achievements`)
      .then((res) => res.ok ? res.json() : Promise.reject(new Error('Failed to load achievements')))
      .then((data) => setAchievements(data))
      .catch((err) => {
        console.error('Error fetching achievements:', err)
        setAchievements([])
      })
  }

  useEffect(() => {
    loadData()
  }, [])

  const resetBadgeForm = () => {
    setBadgeForm({ name: '', description: '', rarity: 'Common', criteria: '', color: 'bg-gray-100 text-gray-700' })
    setEditingBadgeId(null)
  }

  const handleSaveBadge = () => {
    const method = editingBadgeId ? 'PUT' : 'POST'
    fetch(`${API_BASE_URL}/api/gamification/badges${editingBadgeId ? `/${editingBadgeId}` : ''}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(badgeForm),
    })
      .then(() => {
        loadData()
        setBadgeOpen(false)
        resetBadgeForm()
      })
      .catch((err) => console.error('Error saving badge:', err))
  }

  const handleDeleteBadge = (id: number) => {
    fetch(`${API_BASE_URL}/api/gamification/badges/${id}`, { method: 'DELETE' })
      .then(() => setBadges(badges.filter((badge) => badge.id !== id)))
      .catch((err) => console.error('Error deleting badge:', err))
  }

  const handleEditBadge = (badge: any) => {
    setEditingBadgeId(badge.id)
    setBadgeForm({
      name: badge.name,
      description: badge.description,
      rarity: badge.rarity,
      criteria: badge.criteria,
      color: badge.color,
    })
    setBadgeOpen(true)
  }

  const handleSaveAchievement = () => {
    fetch(`${API_BASE_URL}/api/gamification/achievements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(achievementForm),
    })
      .then(() => {
        loadData()
        setAchievementOpen(false)
        setAchievementForm({ badgeName: '', user: '', date: '', description: '' })
      })
      .catch((err) => console.error('Error saving achievement:', err))
  }

  const rarities = ['All', 'Common', 'Uncommon', 'Rare', 'Epic']
  
  const filteredBadges = badges.filter(
    (b) => selectedRarity === 'All' || b.rarity === selectedRarity
  )

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return 'bg-gray-100 text-gray-700'
      case 'Uncommon':
        return 'bg-green-100 text-green-700'
      case 'Rare':
        return 'bg-blue-100 text-blue-700'
      case 'Epic':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Badges & Achievements
            </h1>
            <p className="text-muted-foreground mt-1">
              Track and celebrate employee achievements
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={badgeOpen} onOpenChange={setBadgeOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white" onClick={resetBadgeForm}>
                  <Plus className="w-4 h-4 mr-2" />New Badge
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingBadgeId ? 'Edit Badge' : 'Create Badge'}</DialogTitle>
                  <DialogDescription>Manage gamification badges from the database.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Badge name" value={badgeForm.name} onChange={(e) => setBadgeForm({ ...badgeForm, name: e.target.value })} />
                  <Input placeholder="Description" value={badgeForm.description} onChange={(e) => setBadgeForm({ ...badgeForm, description: e.target.value })} />
                  <div className="grid grid-cols-2 gap-4">
                    <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background" value={badgeForm.rarity} onChange={(e) => setBadgeForm({ ...badgeForm, rarity: e.target.value })}>
                      <option>Common</option>
                      <option>Uncommon</option>
                      <option>Rare</option>
                      <option>Epic</option>
                    </select>
                    <Input placeholder="Color class" value={badgeForm.color} onChange={(e) => setBadgeForm({ ...badgeForm, color: e.target.value })} />
                  </div>
                  <Input placeholder="Criteria" value={badgeForm.criteria} onChange={(e) => setBadgeForm({ ...badgeForm, criteria: e.target.value })} />
                  <Button className="w-full" onClick={handleSaveBadge}>{editingBadgeId ? 'Save Changes' : 'Create Badge'}</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={achievementOpen} onOpenChange={setAchievementOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />New Achievement
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Achievement</DialogTitle>
                  <DialogDescription>Record a new achievement earned by a team member.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Badge name" value={achievementForm.badgeName} onChange={(e) => setAchievementForm({ ...achievementForm, badgeName: e.target.value })} />
                  <Input placeholder="User" value={achievementForm.user} onChange={(e) => setAchievementForm({ ...achievementForm, user: e.target.value })} />
                  <Input type="date" value={achievementForm.date} onChange={(e) => setAchievementForm({ ...achievementForm, date: e.target.value })} />
                  <Input placeholder="Description" value={achievementForm.description} onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })} />
                  <Button className="w-full" onClick={handleSaveAchievement}>Create Achievement</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Total Badges
                </span>
                <p className="text-3xl font-bold text-foreground">
                  {badges.length}
                </p>
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Total Earned
                </span>
                <p className="text-3xl font-bold text-foreground">
                  {badges.reduce((sum, b) => sum + b.earners, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Across team</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Most Popular
                </span>
                <p className="text-3xl font-bold text-foreground">
                  {Math.max(...badges.map((b) => b.earners))}
                </p>
                <p className="text-xs text-muted-foreground">Earners</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Recent Achievements
                </span>
                <p className="text-3xl font-bold text-foreground">
                  {achievements.length}
                </p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          {rarities.map((rarity) => (
            <Button
              key={rarity}
              variant={selectedRarity === rarity ? 'default' : 'outline'}
              onClick={() => setSelectedRarity(rarity)}
              className={
                selectedRarity === rarity
                  ? 'bg-[#16a34a] hover:bg-[#15803d] text-white'
                  : ''
              }
            >
              {rarity}
            </Button>
          ))}
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBadges.map((badge) => {
            const Icon = iconMap[badge.name.split(' ')[0]] || Trophy
            return (
              <Card key={badge.id} className="border-0 shadow-sm hover:shadow-md transition">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-4 rounded-lg ${badge.color}`}>
                      <Icon className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {badge.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {badge.description}
                      </p>
                    </div>
                    <div className="w-full pt-2 border-t">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Earners</p>
                          <p className="font-semibold text-foreground">
                            {badge.earners}
                          </p>
                        </div>
                        <div>
                          <Badge
                            className={getRarityColor(badge.rarity)}
                            variant="outline"
                          >
                            {badge.rarity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full">
                      <Button variant="outline" className="flex-1" onClick={() => handleEditBadge(badge)}>
                        <Edit2 className="w-4 h-4 mr-2" />Edit
                      </Button>
                      <Button variant="ghost" className="text-red-600" onClick={() => handleDeleteBadge(badge.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Achievements */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>
              Latest badges earned by team members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition"
                >
                  <div>
                    <p className="font-semibold text-foreground">
                      {achievement.user}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Earned{' '}
                      <span className="font-medium text-[#16a34a]">
                        {achievement.badge}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {achievement.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {achievement.date}
                    </p>
                    <div className="mt-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
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
