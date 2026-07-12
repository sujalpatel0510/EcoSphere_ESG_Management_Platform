'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AppLayout } from '@/components/layout/app-layout'
import { Plus, Users, Award, Target, TrendingUp, MessageSquare } from 'lucide-react'

const boardMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Board Chair',
    position: 'Chairperson',
    joinDate: '2018',
    expertise: ['ESG', 'Strategy', 'Risk Management'],
    independent: true,
    committees: ['Audit', 'ESG', 'Compensation'],
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Board Member',
    position: 'CEO',
    joinDate: '2019',
    expertise: ['Operations', 'Finance', 'Technology'],
    independent: false,
    committees: ['Executive', 'Strategy'],
  },
  {
    id: 3,
    name: 'Priya Patel',
    role: 'Board Member',
    position: 'Independent Director',
    joinDate: '2020',
    expertise: ['Environmental', 'Sustainability', 'Policy'],
    independent: true,
    committees: ['ESG', 'Environmental'],
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'Board Member',
    position: 'Former CFO',
    joinDate: '2017',
    expertise: ['Finance', 'Audit', 'Compliance'],
    independent: true,
    committees: ['Audit', 'Finance'],
  },
  {
    id: 5,
    name: 'Amelia Rodriguez',
    role: 'Board Member',
    position: 'Social Impact Officer',
    joinDate: '2021',
    expertise: ['Social', 'Community', 'HR'],
    independent: true,
    committees: ['ESG', 'Social'],
  },
]

const committees = [
  {
    name: 'Audit Committee',
    chair: 'James Wilson',
    members: 3,
    meetings: '4 per year',
    focus: 'Internal controls, Risk management',
  },
  {
    name: 'ESG Committee',
    chair: 'Sarah Johnson',
    members: 4,
    meetings: '6 per year',
    focus: 'ESG strategy, Sustainability',
  },
  {
    name: 'Compensation Committee',
    chair: 'Sarah Johnson',
    members: 3,
    meetings: '4 per year',
    focus: 'Executive compensation, Benefits',
  },
  {
    name: 'Risk Committee',
    chair: 'Priya Patel',
    members: 3,
    meetings: '6 per year',
    focus: 'Enterprise risk, Compliance',
  },
]

export default function BoardMembersPage() {
  const independentMembers = boardMembers.filter((m) => m.independent).length
  const diversityScore = 60

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Board Members</h1>
            <p className="text-muted-foreground mt-1">
              Manage board composition and governance structure
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white gap-2">
                <Plus className="w-4 h-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Board Member</DialogTitle>
                <DialogDescription>
                  Add a new member to the board of directors
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    placeholder="Enter full name"
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Position</label>
                  <input
                    placeholder="e.g., Independent Director"
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expertise (comma-separated)</label>
                  <input
                    placeholder="e.g., Finance, Technology, Risk"
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                  />
                </div>
                <Button className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white">
                  Add Member
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
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Members</span>
                  <Users className="w-4 h-4 text-[#16a34a]" />
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {boardMembers.length}
                </p>
                <p className="text-xs text-muted-foreground">Board of directors</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Independent Members
                </span>
                <p className="text-3xl font-bold text-foreground">
                  {independentMembers}/{boardMembers.length}
                </p>
                <p className="text-xs text-green-600">80% target met</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Board Diversity Score
                </span>
                <p className="text-3xl font-bold text-foreground">
                  {diversityScore}%
                </p>
                <p className="text-xs text-muted-foreground">+10% year-over-year</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Avg Tenure
                </span>
                <p className="text-3xl font-bold text-foreground">4.2</p>
                <p className="text-xs text-muted-foreground">years</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Board Members */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Board Composition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {boardMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-4 border border-border rounded-lg hover:bg-muted/50 transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {member.position}
                      </p>
                    </div>
                    {member.independent && (
                      <Badge className="bg-blue-100 text-blue-700">
                        Independent
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2 text-sm mb-3">
                    <p>
                      <span className="text-muted-foreground">Joined:</span>{' '}
                      <span className="font-medium">{member.joinDate}</span>
                    </p>
                    <div>
                      <p className="text-muted-foreground mb-1">Expertise:</p>
                      <div className="flex gap-1 flex-wrap">
                        {member.expertise.map((exp) => (
                          <Badge key={exp} variant="outline" className="text-xs">
                            {exp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Committees:</p>
                      <p className="font-medium">
                        {member.committees.join(', ')}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Committees */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Board Committees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {committees.map((committee) => (
                <div
                  key={committee.name}
                  className="p-4 border border-border rounded-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground">
                      {committee.name}
                    </h3>
                    <Badge variant="outline">{committee.members} members</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Chair</p>
                      <p className="font-medium">{committee.chair}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Meetings</p>
                      <p className="font-medium">{committee.meetings}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Focus</p>
                      <p className="font-medium text-xs">{committee.focus}</p>
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
