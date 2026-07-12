'use client'

import React from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { KPICard } from '@/components/dashboard/kpi-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import {
  Leaf,
  Users,
  Lock,
  Trophy,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react'

const carbonTrendData = [
  { month: 'Jan', emissions: 4000 },
  { month: 'Feb', emissions: 3800 },
  { month: 'Mar', emissions: 3600 },
  { month: 'Apr', emissions: 3900 },
  { month: 'May', emissions: 3400 },
  { month: 'Jun', emissions: 3200 },
  { month: 'Jul', emissions: 3500 },
]

const departmentScoreData = [
  { department: 'Manufacturing', score: 82 },
  { department: 'Logistics', score: 75 },
  { department: 'R&D', score: 88 },
  { department: 'Sales', score: 70 },
  { department: 'HR', score: 92 },
]

const csrParticipationData = [
  { name: 'Participated', value: 68, fill: '#16a34a' },
  { name: 'Not Participated', value: 32, fill: '#e5e7eb' },
]

const monthlyESGData = [
  { month: 'Jan', environmental: 78, social: 72, governance: 80 },
  { month: 'Feb', environmental: 79, social: 73, governance: 81 },
  { month: 'Mar', environmental: 81, social: 75, governance: 82 },
  { month: 'Apr', environmental: 80, social: 76, governance: 83 },
  { month: 'May', environmental: 82, social: 77, governance: 84 },
  { month: 'Jun', environmental: 83, social: 78, governance: 85 },
  { month: 'Jul', environmental: 85, social: 80, governance: 86 },
]

const recentActivities = [
  { id: 1, title: 'Carbon emission report filed', time: '2 hours ago', type: 'environmental' },
  { id: 2, title: 'New CSR activity created', time: '5 hours ago', type: 'social' },
  { id: 3, title: 'Compliance audit completed', time: '1 day ago', type: 'governance' },
  { id: 4, title: 'Employee badge unlocked', time: '2 days ago', type: 'gamification' },
]

const upcomingAudits = [
  { id: 1, name: 'Q3 Compliance Audit', date: '2024-08-15', department: 'Governance' },
  { id: 2, name: 'Environmental Audit', date: '2024-08-20', department: 'Environmental' },
  { id: 3, name: 'Social Impact Review', date: '2024-08-25', department: 'Social' },
]

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="p-4 md:p-8 space-y-8">
        {/* Page header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here&apos;s your ESG performance overview.</p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Overall ESG Score"
            value="83"
            unit="/100"
            change={5}
            trend="up"
            icon={<TrendingUp className="w-5 h-5" />}
            color="blue"
            description="Month-over-month growth"
          />
          <KPICard
            title="Environmental Score"
            value="85"
            unit="/100"
            change={3}
            trend="up"
            icon={<Leaf className="w-5 h-5" />}
            color="green"
            description="Carbon footprint improving"
          />
          <KPICard
            title="Social Score"
            value="80"
            unit="/100"
            change={2}
            trend="up"
            icon={<Users className="w-5 h-5" />}
            color="blue"
            description="Employee engagement up"
          />
          <KPICard
            title="Governance Score"
            value="86"
            unit="/100"
            change={4}
            trend="up"
            icon={<Lock className="w-5 h-5" />}
            color="purple"
            description="Compliance rate strong"
          />
        </div>

        {/* Second row - Additional KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard
            title="Carbon Emissions (This Month)"
            value="3,240"
            unit="tons CO2e"
            change={8}
            trend="down"
            description="Reduced from last month"
          />
          <KPICard
            title="CSR Participation Rate"
            value="68%"
            change={12}
            trend="up"
            description="More employees engaged"
          />
          <KPICard
            title="Compliance Rate"
            value="94%"
            change={2}
            trend="up"
            description="All audits on track"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Carbon Emission Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Carbon Emission Trend</CardTitle>
              <CardDescription>Monthly CO2e emissions in tons</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={carbonTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="emissions"
                    stroke="#16a34a"
                    strokeWidth={2}
                    dot={{ fill: '#16a34a', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department ESG Ranking */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Department ESG Ranking</CardTitle>
              <CardDescription>Average score by department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentScoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Bar dataKey="score" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* CSR Participation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">CSR Participation</CardTitle>
              <CardDescription>Employee participation rate</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={csrParticipationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {csrParticipationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly ESG Score Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly ESG Score Trend</CardTitle>
              <CardDescription>Score progression over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyESGData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="environmental"
                    stackId="1"
                    stroke="#16a34a"
                    fill="#16a34a"
                    fillOpacity={0.1}
                  />
                  <Area
                    type="monotone"
                    dataKey="social"
                    stackId="1"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.1}
                  />
                  <Area
                    type="monotone"
                    dataKey="governance"
                    stackId="1"
                    stroke="#7c3aed"
                    fill="#7c3aed"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom section - Activities and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'environmental' ? 'bg-[#16a34a]/10' :
                      activity.type === 'social' ? 'bg-[#2563eb]/10' :
                      activity.type === 'governance' ? 'bg-[#7c3aed]/10' :
                      'bg-[#f97316]/10'
                    }`}>
                      {activity.type === 'environmental' && <Leaf size={18} className="text-[#16a34a]" />}
                      {activity.type === 'social' && <Users size={18} className="text-[#2563eb]" />}
                      {activity.type === 'governance' && <Lock size={18} className="text-[#7c3aed]" />}
                      {activity.type === 'gamification' && <Trophy size={18} className="text-[#f97316]" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compliance Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compliance Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                <AlertCircle size={18} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-100">1 Overdue Issue</p>
                  <p className="text-xs text-red-700 dark:text-red-200">Action required</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                <Clock size={18} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-100">3 Due Soon</p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-200">Next 7 days</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <CheckCircle size={18} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-100">94% Compliant</p>
                  <p className="text-xs text-green-700 dark:text-green-200">On track</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Audits */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Audits</CardTitle>
            <CardDescription>Schedule for next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAudits.map((audit) => (
                <div key={audit.id} className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{audit.name}</p>
                    <p className="text-sm text-muted-foreground">{audit.date}</p>
                  </div>
                  <Badge variant="eco-purple">{audit.department}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              <Button variant="eco-green" className="w-full">
                Report Emission
              </Button>
              <Button variant="eco-blue" className="w-full">
                Log CSR Activity
              </Button>
              <Button variant="eco-purple" className="w-full">
                File Audit
              </Button>
              <Button variant="eco-orange" className="w-full">
                Create Challenge
              </Button>
              <Button variant="outline" className="w-full">
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
