'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AppLayout } from '@/components/layout/app-layout'
import { Plus, Zap, Users, TrendingUp, Target } from 'lucide-react'

const challenges = [
  {
    id: 1,
    name: 'Carbon Neutral Week',
    description: 'Achieve net-zero emissions for one week',
    startDate: '2024-06-01',
    endDate: '2024-06-07',
    participants: 285,
    completed: 187,
    reward: '500 points',
    difficulty: 'Medium',
    status: 'Active',
    progress: 66,
  },
  {
    id: 2,
    name: 'Paperless Office Challenge',
    description: 'Reduce paper usage by 50%',
    startDate: '2024-06-15',
    endDate: '2024-07-15',
    participants: 156,
    completed: 89,
    reward: '300 points',
    difficulty: 'Easy',
    status: 'Active',
    progress: 57,
  },
  {
    id: 3,
    name: 'Sustainability Sprint',
    description: 'Complete 5 ESG-related tasks',
    startDate: '2024-07-01',
    endDate: '2024-07-31',
    participants: 402,
    completed: 298,
    reward: '750 points',
    difficulty: 'Hard',
    status: 'Active',
    progress: 74,
  },
  {
    id: 4,
    name: 'Community Impact Month',
    description: 'Volunteer 10+ hours for community',
    startDate: '2024-05-01',
    endDate: '2024-05-31',
    participants: 220,
    completed: 220,
    reward: '600 points',
    difficulty: 'Medium',
    status: 'Completed',
    progress: 100,
  },
]

const leaderboard = [
  { rank: 1, name: 'Sarah Chen', points: 2850, level: 'Champion' },
  { rank: 2, name: 'James Mitchell', points: 2620, level: 'Master' },
  { rank: 3, name: 'Priya Sharma', points: 2410, level: 'Master' },
  { rank: 4, name: 'Michael Rodriguez', points: 2150, level: 'Pro' },
  { rank: 5, name: 'Emma Thompson', points: 1980, level: 'Pro' },
]

export default function ChallengesPage() {
  const [filterStatus, setFilterStatus] = useState('All')

  const filteredChallenges = challenges.filter(
    (c) => filterStatus === 'All' || c.status === filterStatus
  )

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-700'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700'
      case 'Hard':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Challenges</h1>
            <p className="text-muted-foreground mt-1">
              Engage employees with ESG challenges and competitions
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white gap-2">
                <Plus className="w-4 h-4" />
                Create Challenge
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Challenge</DialogTitle>
                <DialogDescription>
                  Launch a new ESG challenge for your team
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Challenge Name</label>
                  <input
                    placeholder="e.g., Energy Saving Challenge"
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    placeholder="Describe the challenge"
                    className="w-full px-3 py-2 rounded-md border border-input bg-background"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty</label>
                  <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
                <Button className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white">
                  Create Challenge
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Active Challenges
                </span>
                <p className="text-3xl font-bold text-foreground">
                  {challenges.filter((c) => c.status === 'Active').length}
                </p>
                <p className="text-xs text-muted-foreground">Running now</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Total Participants
                </span>
                <p className="text-3xl font-bold text-foreground">
                  {challenges.reduce((sum, c) => sum + c.participants, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Across all</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Avg Completion
                </span>
                <p className="text-3xl font-bold text-foreground">
                  {Math.round(
                    challenges.reduce((sum, c) => sum + c.progress, 0) /
                      challenges.length
                  )}
                  %
                </p>
                <p className="text-xs text-green-600">Above target</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Total Points
                </span>
                <p className="text-3xl font-bold text-foreground">
                  {leaderboard.reduce((sum, l) => sum + l.points, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Awarded</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 flex-wrap">
          {['All', 'Active', 'Completed'].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? 'default' : 'outline'}
              onClick={() => setFilterStatus(status)}
              className={
                filterStatus === status
                  ? 'bg-[#16a34a] hover:bg-[#15803d] text-white'
                  : ''
              }
            >
              {status}
            </Button>
          ))}
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredChallenges.map((challenge) => (
            <Card key={challenge.id} className="border-0 shadow-sm hover:shadow-md transition">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {challenge.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {challenge.description}
                    </CardDescription>
                  </div>
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">{challenge.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-[#16a34a] h-2 rounded-full transition-all"
                      style={{ width: `${challenge.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t">
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">
                      {challenge.startDate} to {challenge.endDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Reward</p>
                    <p className="font-medium text-[#16a34a]">
                      {challenge.reward}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground text-xs">
                        Participants
                      </p>
                      <p className="font-medium">
                        {challenge.completed}/{challenge.participants}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground text-xs">
                        Completion
                      </p>
                      <p className="font-medium">
                        {Math.round(
                          (challenge.completed / challenge.participants) *
                            100
                        )}
                        %
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white">
                  {challenge.status === 'Active' ? 'Join Challenge' : 'View Details'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leaderboard */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#16a34a] text-white flex items-center justify-center font-bold text-sm">
                      {entry.rank}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {entry.name}
                      </p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {entry.level}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-[#16a34a]">
                    {entry.points} pts
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
