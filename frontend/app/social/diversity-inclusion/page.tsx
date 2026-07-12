'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AppLayout } from '@/components/layout/app-layout'
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { Users, TrendingUp, Target, CheckCircle2 } from 'lucide-react'

const genderData = [
  { name: 'Male', value: 55, employees: 121 },
  { name: 'Female', value: 42, employees: 92 },
  { name: 'Non-binary', value: 3, employees: 7 },
]

const ageData = [
  { name: '18-25', value: 12 },
  { name: '26-35', value: 35 },
  { name: '36-45', value: 28 },
  { name: '46-55', value: 18 },
  { name: '55+', value: 7 },
]

const ethnicityData = [
  { name: 'Asian', value: 35, employees: 77 },
  { name: 'Caucasian', value: 42, employees: 92 },
  { name: 'Hispanic', value: 12, employees: 26 },
  { name: 'African', value: 8, employees: 18 },
  { name: 'Other', value: 3, employees: 7 },
]

const levelData = [
  { level: 'Executive', female: 20, male: 30, other: 2 },
  { level: 'Manager', female: 18, male: 28, other: 1 },
  { level: 'Senior', female: 25, male: 35, other: 2 },
  { level: 'Junior', female: 29, male: 28, other: 2 },
]

const COLORS = ['#16a34a', '#2563eb', '#7c3aed', '#f97316', '#ef4444']

const initiatives = [
  {
    id: 1,
    name: 'Women in Leadership Program',
    target: '40% female leadership by 2025',
    current: '28%',
    status: 'In Progress',
  },
  {
    id: 2,
    name: 'Ethnic Diversity Initiative',
    target: '50% ethnic diversity',
    current: '45%',
    status: 'On Track',
  },
  {
    id: 3,
    name: 'LGBTQ+ Support Group',
    target: 'Expand member participation',
    current: '156 members',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Mentorship Program',
    target: '100+ mentee pairs',
    current: '87 pairs',
    status: 'In Progress',
  },
]

export default function DiversityInclusionPage() {
  const totalEmployees = 220

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Diversity & Inclusion
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor and advance workplace diversity metrics
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Total Employees
                </span>
                <p className="text-3xl font-bold text-foreground">
                  {totalEmployees}
                </p>
                <p className="text-xs text-muted-foreground">
                  Across all departments
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Female Representation
                </span>
                <p className="text-3xl font-bold text-foreground">42%</p>
                <p className="text-xs text-green-600">+5% from last year</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Ethnic Diversity
                </span>
                <p className="text-3xl font-bold text-foreground">45%</p>
                <p className="text-xs text-muted-foreground">Non-majority groups</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Pay Equity Gap
                </span>
                <p className="text-3xl font-bold text-foreground">3.2%</p>
                <p className="text-xs text-green-600">Target: &lt;2% by 2025</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Gender Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={80}
                    fill="#16a34a"
                    dataKey="value"
                  >
                    {genderData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Age Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="value" fill="#16a34a" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Ethnic Representation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ethnicityData.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.employees} ({item.value}%)
                      </p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-[#16a34a] h-2 rounded-full transition-all"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>By Career Level</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={levelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="level" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="female" fill="#16a34a" />
                  <Bar dataKey="male" fill="#2563eb" />
                  <Bar dataKey="other" fill="#7c3aed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Initiatives */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>D&I Initiatives</CardTitle>
              <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white">
                Add Initiative
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {initiatives.map((init) => (
                <div
                  key={init.id}
                  className="p-4 border border-border rounded-lg hover:bg-muted/50 transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground">
                        {init.name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {init.target}
                      </p>
                    </div>
                    <Badge
                      className={
                        init.status === 'On Track'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                          : init.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                            : 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400'
                      }
                    >
                      {init.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Current</p>
                      <p className="text-lg font-bold text-foreground">
                        {init.current}
                      </p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-[#16a34a]" />
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
