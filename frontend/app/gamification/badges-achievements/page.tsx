'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AppLayout } from '@/components/layout/app-layout'
import { Star, Trophy, Zap, Heart, Leaf, Users } from 'lucide-react'

const badges = [
  {
    id: 1,
    name: 'Carbon Champion',
    description: 'Reduced carbon emissions by 30%',
    icon: Leaf,
    color: 'bg-green-100 text-green-600',
    earners: 45,
    rarity: 'Rare',
    criteria: 'Achieve 30% carbon reduction',
  },
  {
    id: 2,
    name: 'Sustainability Star',
    description: 'Completed 5 sustainability initiatives',
    icon: Star,
    color: 'bg-yellow-100 text-yellow-600',
    earners: 128,
    rarity: 'Common',
    criteria: 'Complete 5 ESG initiatives',
  },
  {
    id: 3,
    name: 'Community Champion',
    description: 'Volunteered 20+ hours for community',
    icon: Heart,
    color: 'bg-red-100 text-red-600',
    earners: 67,
    rarity: 'Uncommon',
    criteria: 'Volunteer 20+ community hours',
  },
  {
    id: 4,
    name: 'ESG Excellence',
    description: 'Achieved excellence in all ESG metrics',
    icon: Trophy,
    color: 'bg-purple-100 text-purple-600',
    earners: 12,
    rarity: 'Epic',
    criteria: 'Top 5% in all ESG categories',
  },
  {
    id: 5,
    name: 'Team Player',
    description: 'Helped 10+ colleagues meet ESG goals',
    icon: Users,
    color: 'bg-blue-100 text-blue-600',
    earners: 34,
    rarity: 'Rare',
    criteria: 'Help 10+ teammates',
  },
  {
    id: 6,
    name: 'Energizer',
    description: 'Completed 3 challenges in one month',
    icon: Zap,
    color: 'bg-orange-100 text-orange-600',
    earners: 89,
    rarity: 'Common',
    criteria: 'Complete 3 challenges/month',
  },
]

const achievements = [
  {
    id: 1,
    badge: 'Sustainability Star',
    user: 'Sarah Chen',
    date: '2024-06-10',
    description: 'Completed 5 sustainability initiatives',
  },
  {
    id: 2,
    badge: 'Carbon Champion',
    user: 'Michael Johnson',
    date: '2024-06-08',
    description: 'Reduced carbon emissions by 35%',
  },
  {
    id: 3,
    badge: 'Community Champion',
    user: 'Priya Sharma',
    date: '2024-06-05',
    description: 'Volunteered 25 hours for community',
  },
  {
    id: 4,
    badge: 'Team Player',
    user: 'James Wilson',
    date: '2024-06-01',
    description: 'Helped 12 colleagues meet ESG goals',
  },
  {
    id: 5,
    badge: 'Energizer',
    user: 'Emma Rodriguez',
    date: '2024-05-28',
    description: 'Completed 4 challenges in May',
  },
]

export default function BadgesAchievementsPage() {
  const [selectedRarity, setSelectedRarity] = useState('All')

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
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Badges & Achievements
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and celebrate employee achievements
          </p>
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
            const Icon = badge.icon
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
                    <Button variant="outline" className="w-full">
                      View Criteria
                    </Button>
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
