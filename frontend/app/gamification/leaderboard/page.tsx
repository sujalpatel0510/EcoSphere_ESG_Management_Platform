'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AppLayout } from '@/components/layout/app-layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Medal, TrendingUp, Award } from 'lucide-react'

const globalLeaderboard = [
  { rank: 1, name: 'Sarah Chen', points: 3850, badges: 8, challenges: 12, department: 'Engineering' },
  { rank: 2, name: 'James Mitchell', points: 3620, badges: 6, challenges: 10, department: 'Operations' },
  { rank: 3, name: 'Priya Sharma', points: 3410, badges: 7, challenges: 11, department: 'Marketing' },
  { rank: 4, name: 'Michael Rodriguez', points: 3150, badges: 5, challenges: 9, department: 'Sales' },
  { rank: 5, name: 'Emma Thompson', points: 2980, badges: 6, challenges: 8, department: 'HR' },
  { rank: 6, name: 'David Lee', points: 2850, badges: 5, challenges: 7, department: 'Finance' },
  { rank: 7, name: 'Lisa Park', points: 2720, badges: 4, challenges: 6, department: 'Engineering' },
  { rank: 8, name: 'Robert Wilson', points: 2610, badges: 5, challenges: 7, department: 'Operations' },
  { rank: 9, name: 'Amanda Jones', points: 2490, badges: 4, challenges: 6, department: 'Marketing' },
  { rank: 10, name: 'Chris Brown', points: 2380, badges: 3, challenges: 5, department: 'Sales' },
]

const departmentLeaderboard = [
  { department: 'Engineering', avgPoints: 2840, members: 45, badges: 187 },
  { department: 'Marketing', avgPoints: 2650, members: 18, badges: 98 },
  { department: 'Operations', avgPoints: 2520, members: 32, badges: 142 },
  { department: 'Sales', avgPoints: 2380, members: 28, badges: 124 },
  { department: 'HR', avgPoints: 2210, members: 12, badges: 65 },
  { department: 'Finance', avgPoints: 2150, members: 15, badges: 72 },
]

const trendData = [
  { week: 'Week 1', avg: 1200, top: 1850 },
  { week: 'Week 2', avg: 1450, top: 2100 },
  { week: 'Week 3', avg: 1680, top: 2450 },
  { week: 'Week 4', avg: 1920, top: 2750 },
  { week: 'Week 5', avg: 2180, top: 3150 },
  { week: 'Week 6', avg: 2420, top: 3620 },
]

export default function LeaderboardPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('All')

  const departments = ['All', ...new Set(globalLeaderboard.map((m) => m.department))]

  const filteredLeaderboard =
    selectedDepartment === 'All'
      ? globalLeaderboard
      : globalLeaderboard.filter((m) => m.department === selectedDepartment)

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Medal className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Medal className="w-5 h-5 text-orange-600" />
      default:
        return null
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-muted-foreground mt-1">
            Track team performance and competition
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Top Performer
                </span>
                <p className="text-lg font-bold text-foreground">
                  {globalLeaderboard[0].name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {globalLeaderboard[0].points} points
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Avg Team Points
                </span>
                <p className="text-3xl font-bold text-foreground">
                  {Math.round(
                    globalLeaderboard.reduce((sum, m) => sum + m.points, 0) /
                      globalLeaderboard.length
                  )}
                </p>
                <p className="text-xs text-green-600">+15% month-over-month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Total Badges
                </span>
                <p className="text-3xl font-bold text-foreground">
                  {globalLeaderboard.reduce((sum, m) => sum + m.badges, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Earned</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Participation
                </span>
                <p className="text-3xl font-bold text-foreground">92%</p>
                <p className="text-xs text-green-600">Excellent engagement</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="individual" className="space-y-4">
          <TabsList className="bg-muted">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="department">Department</TabsTrigger>
            <TabsTrigger value="trend">Trend</TabsTrigger>
          </TabsList>

          {/* Individual Leaderboard */}
          <TabsContent value="individual" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Individual Rankings</CardTitle>
                    <CardDescription>
                      Top performers across the organization
                    </CardDescription>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {departments.map((dept) => (
                      <Button
                        key={dept}
                        variant={
                          selectedDepartment === dept ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => setSelectedDepartment(dept)}
                        className={
                          selectedDepartment === dept
                            ? 'bg-[#16a34a] hover:bg-[#15803d] text-white'
                            : ''
                        }
                      >
                        {dept}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredLeaderboard.map((member) => (
                    <div
                      key={member.rank}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10">
                          {getMedalIcon(member.rank) || (
                            <span className="font-bold text-muted-foreground">
                              #{member.rank}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {member.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {member.department}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#16a34a]">
                            {member.points}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            points
                          </p>
                        </div>
                        <div className="flex gap-3 text-sm">
                          <div className="text-center">
                            <p className="font-semibold">{member.badges}</p>
                            <p className="text-xs text-muted-foreground">
                              badges
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold">
                              {member.challenges}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              challenges
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Department Leaderboard */}
          <TabsContent value="department" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Department Leaderboard</CardTitle>
                <CardDescription>
                  Average points and badges by department
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentLeaderboard}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="department" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="avgPoints" fill="#16a34a" />
                    <Bar dataKey="badges" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="space-y-3">
                  {departmentLeaderboard.map((dept) => (
                    <div
                      key={dept.department}
                      className="p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-foreground">
                          {dept.department}
                        </p>
                        <Badge variant="outline">{dept.members} members</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">
                            Avg Points
                          </p>
                          <p className="font-bold text-[#16a34a]">
                            {dept.avgPoints}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Total Badges
                          </p>
                          <p className="font-bold text-[#2563eb]">
                            {dept.badges}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trend */}
          <TabsContent value="trend" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Points Trend</CardTitle>
                <CardDescription>
                  Average vs top performer over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="week" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="avg"
                      stroke="#16a34a"
                      strokeWidth={2}
                      dot={{ fill: '#16a34a' }}
                      name="Average"
                    />
                    <Line
                      type="monotone"
                      dataKey="top"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={{ fill: '#2563eb' }}
                      name="Top Performer"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
