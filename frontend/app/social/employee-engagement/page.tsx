'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AppLayout } from '@/components/layout/app-layout'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, Smile, AlertCircle } from 'lucide-react'

const STORAGE_KEY = 'ecosphere-employee-engagement-surveys'

const engagementData = [
  { month: 'Jan', satisfaction: 72, participation: 65, retention: 88 },
  { month: 'Feb', satisfaction: 75, participation: 68, retention: 89 },
  { month: 'Mar', satisfaction: 78, participation: 72, retention: 90 },
  { month: 'Apr', satisfaction: 81, participation: 75, retention: 91 },
  { month: 'May', satisfaction: 79, participation: 73, retention: 90 },
  { month: 'Jun', satisfaction: 82, participation: 77, retention: 92 },
]

const departmentEngagement = [
  { department: 'Engineering', score: 85, employees: 45 },
  { department: 'Sales', score: 78, employees: 32 },
  { department: 'Marketing', score: 88, employees: 18 },
  { department: 'Operations', score: 75, employees: 25 },
  { department: 'HR', score: 92, employees: 12 },
]

const initialSurveys = [
  {
    id: 1,
    name: 'Q2 2024 Engagement Survey',
    response_rate: 87,
    sentiment: 'Positive',
    participants: 128,
    date: '2024-06-15',
  },
  {
    id: 2,
    name: 'Work-Life Balance Assessment',
    response_rate: 76,
    sentiment: 'Mixed',
    participants: 98,
    date: '2024-05-20',
  },
  {
    id: 3,
    name: 'Career Development Survey',
    response_rate: 82,
    sentiment: 'Positive',
    participants: 112,
    date: '2024-04-10',
  },
]

const COLORS = ['#16a34a', '#2563eb', '#7c3aed', '#f97316', '#ef4444']

export default function EmployeeEngagementPage() {
  const [surveys, setSurveys] = useState(initialSurveys)
  const [form, setForm] = useState({ name: '', response_rate: '80', participants: '120', date: '', sentiment: 'Positive' })
  const [showForm, setShowForm] = useState(false)
  const avgEngagementScore = 82

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return
    try {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length) {
        setSurveys(parsed)
      }
    } catch {
      // ignore malformed data
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(surveys))
    }
  }, [surveys])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.name || !form.date) return

    const payload = {
      id: Date.now(),
      name: form.name,
      response_rate: Number(form.response_rate),
      participants: Number(form.participants),
      date: form.date,
      sentiment: form.sentiment,
    }

    setSurveys((current) => [payload, ...current])
    setForm({ name: '', response_rate: '80', participants: '120', date: '', sentiment: 'Positive' })
    setShowForm(false)
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employee Engagement</h1>
          <p className="text-muted-foreground mt-1">Track and improve employee satisfaction and engagement</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Overall Score</span>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-foreground">{avgEngagementScore}</p>
                <p className="text-xs text-green-600">+3% from last quarter</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Avg Satisfaction</span>
                <p className="text-3xl font-bold text-foreground">81%</p>
                <p className="text-xs text-muted-foreground">Positive feedback</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Participation</span>
                <p className="text-3xl font-bold text-foreground">77%</p>
                <p className="text-xs text-muted-foreground">In surveys</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Retention Rate</span>
                <p className="text-3xl font-bold text-foreground">92%</p>
                <p className="text-xs text-green-600">+1% improvement</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle>Engagement Trends</CardTitle>
              <CardDescription>Satisfaction, participation, and retention over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Legend />
                  <Line type="monotone" dataKey="satisfaction" stroke="#16a34a" strokeWidth={2} dot={{ fill: '#16a34a' }} />
                  <Line type="monotone" dataKey="participation" stroke="#2563eb" strokeWidth={2} dot={{ fill: '#2563eb' }} />
                  <Line type="monotone" dataKey="retention" stroke="#7c3aed" strokeWidth={2} dot={{ fill: '#7c3aed' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Department Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={departmentEngagement} dataKey="score" nameKey="department" cx="50%" cy="50%" outerRadius={80} label>
                    {departmentEngagement.map((entry) => (
                      <Cell key={entry.department} fill={COLORS[departmentEngagement.indexOf(entry) % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Department Engagement Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentEngagement}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="department" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                <Bar dataKey="score" fill="#16a34a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Surveys</CardTitle>
              <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white" onClick={() => setShowForm((current) => !current)}>Create Survey</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {showForm && (
              <form className="grid gap-3 md:grid-cols-2 rounded-lg border border-border p-4" onSubmit={handleSubmit}>
                <Input placeholder="Survey name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                <Input type="number" placeholder="Response rate" value={form.response_rate} onChange={(e) => setForm({ ...form, response_rate: e.target.value })} />
                <Input type="number" placeholder="Participants" value={form.participants} onChange={(e) => setForm({ ...form, participants: e.target.value })} />
                <select className="w-full rounded-md border border-input bg-background px-3 py-2" value={form.sentiment} onChange={(e) => setForm({ ...form, sentiment: e.target.value })}>
                  <option value="Positive">Positive</option>
                  <option value="Mixed">Mixed</option>
                  <option value="Needs Attention">Needs Attention</option>
                </select>
                <div className="md:col-span-2 flex gap-2">
                  <Button type="submit" className="bg-[#16a34a] hover:bg-[#15803d] text-white">Save Survey</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </form>
            )}
            <div className="space-y-4">
              {surveys.map((survey) => (
                <div key={survey.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{survey.name}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" />{survey.participants} participants</span>
                      <span>{survey.response_rate}% response</span>
                      <span>{survey.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={survey.sentiment === 'Positive' ? 'default' : 'outline'} className={survey.sentiment === 'Positive' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : survey.sentiment === 'Mixed' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'}>{survey.sentiment}</Badge>
                    <Button variant="ghost" size="sm">View</Button>
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
