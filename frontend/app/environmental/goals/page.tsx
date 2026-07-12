'use client'

import React from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Target } from 'lucide-react'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'

const goalsData = [
  {
    id: 1,
    name: 'Reduce Carbon Emissions',
    target: '40% reduction by 2030',
    current: 32,
    baseline: 5000,
    currentValue: 3400,
    unit: 'tons CO2e',
    status: 'On Track',
    department: 'All',
    startDate: '2024-01-01',
    deadline: '2030-12-31',
  },
  {
    id: 2,
    name: 'Renewable Energy Adoption',
    target: '60% by 2030',
    current: 45,
    baseline: 0,
    currentValue: 45,
    unit: '%',
    status: 'On Track',
    department: 'Operations',
    startDate: '2023-06-01',
    deadline: '2030-12-31',
  },
  {
    id: 3,
    name: 'Water Consumption Reduction',
    target: '30% reduction by 2026',
    current: 18,
    baseline: 50,
    currentValue: 41,
    unit: 'million gallons',
    status: 'On Track',
    department: 'Manufacturing',
    startDate: '2024-01-01',
    deadline: '2026-12-31',
  },
  {
    id: 4,
    name: 'Waste Diversion Rate',
    target: '75% by 2025',
    current: 62,
    baseline: 0,
    currentValue: 62,
    unit: '%',
    status: 'At Risk',
    department: 'Facilities',
    startDate: '2023-01-01',
    deadline: '2025-12-31',
  },
]

export default function EnvironmentalGoalsPage() {
  return (
    <AppLayout>
      <div className="p-4 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link href="/environmental" className="text-muted-foreground hover:text-foreground">
                Environmental
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">Goals</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Environmental Goals</h1>
            <p className="text-muted-foreground mt-2">Track and manage sustainability targets</p>
          </div>
          <Button variant="eco-green">
            <Plus size={18} />
            Create Goal
          </Button>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {goalsData.map((goal) => (
            <Card key={goal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target size={20} className="text-[#16a34a]" />
                      {goal.name}
                    </CardTitle>
                    <CardDescription className="mt-1">{goal.department}</CardDescription>
                  </div>
                  <Badge
                    variant={goal.status === 'On Track' ? 'status-approved' : 'status-pending'}
                  >
                    {goal.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Progress</span>
                    <span className="text-sm font-bold text-[#16a34a]">{goal.current}%</span>
                  </div>
                  <Progress value={goal.current} className="h-2" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Current</p>
                    <p className="text-lg font-semibold text-foreground">{goal.currentValue}</p>
                    <p className="text-xs text-muted-foreground">{goal.unit}</p>
                  </div>
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Target</p>
                    <p className="text-lg font-semibold text-foreground">{goal.target}</p>
                  </div>
                </div>

                {/* Dates */}
                <div className="text-xs text-muted-foreground border-t border-border pt-3">
                  <p>Started: {goal.startDate}</p>
                  <p>Deadline: {goal.deadline}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-border">
                  <Button variant="outline" className="flex-1 text-sm" size="sm">
                    <Edit size={16} />
                    Edit
                  </Button>
                  <Button variant="ghost" className="text-red-600 text-sm" size="sm">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#16a34a]">{goalsData.length}</div>
              <p className="text-sm text-muted-foreground mt-2">Total Goals</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600">{goalsData.filter(g => g.status === 'On Track').length}</div>
              <p className="text-sm text-muted-foreground mt-2">On Track</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600">{goalsData.filter(g => g.status === 'At Risk').length}</div>
              <p className="text-sm text-muted-foreground mt-2">At Risk</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#2563eb]">
                {Math.round(goalsData.reduce((acc, g) => acc + g.current, 0) / goalsData.length)}%
              </div>
              <p className="text-sm text-muted-foreground mt-2">Avg Progress</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
