'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Plus, Download, Filter, Search } from 'lucide-react'
import Link from 'next/link'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api'

const monthlyEmissionsData = [
  { month: 'Jan', emissions: 4500 },
  { month: 'Feb', emissions: 4200 },
  { month: 'Mar', emissions: 4100 },
  { month: 'Apr', emissions: 3900 },
  { month: 'May', emissions: 3600 },
  { month: 'Jun', emissions: 3400 },
  { month: 'Jul', emissions: 3200 },
]

const departmentEmissionsData = [
  { department: 'Manufacturing', emissions: 1200 },
  { department: 'Logistics', emissions: 800 },
  { department: 'Operations', emissions: 600 },
  { department: 'Facilities', emissions: 400 },
  { department: 'R&D', emissions: 200 },
]

export default function CarbonTransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ date: '', department: '', source: '', quantity: '', unit: '', co2Equivalent: '', factor: '', status: 'Pending' })

  useEffect(() => {
    fetch(`${API_BASE}/operations/carbon-transactions`)
      .then((res) => res.json())
      .then((data) => setTransactions(Array.isArray(data) ? data : []))
      .catch(() => setTransactions([]))
  }, [])

  const filteredTransactions = useMemo(() => transactions.filter((trans) =>
    trans.source?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trans.department?.toLowerCase().includes(searchTerm.toLowerCase())
  ), [transactions, searchTerm])

  const totalEmissions = transactions.reduce((sum, trans) => sum + Number(trans.co2Equivalent || 0), 0)
  const averageEmissions = transactions.length ? (totalEmissions / transactions.length).toFixed(2) : '0.00'

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const payload = {
      date: form.date,
      department: form.department,
      source: form.source,
      quantity: Number(form.quantity || 0),
      unit: form.unit,
      co2Equivalent: Number(form.co2Equivalent || 0),
      factor: Number(form.factor || 0),
      status: form.status,
    }

    const response = await fetch(`${API_BASE}/operations/carbon-transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      const created = await response.json()
      setTransactions((prev) => [created, ...prev])
      setForm({ date: '', department: '', source: '', quantity: '', unit: '', co2Equivalent: '', factor: '', status: 'Pending' })
      setShowForm(false)
    }
  }

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
              <span className="text-foreground font-medium">Carbon Transactions</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Carbon Transactions</h1>
            <p className="text-muted-foreground mt-2">Track and manage carbon emissions across operations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download size={18} />
              Export
            </Button>
            <Button variant="eco-green" onClick={() => setShowForm((value) => !value)}>
              <Plus size={18} />
              Log Emission
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Transactions</p>
              <p className="text-3xl font-bold text-[#16a34a]">{transactions.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Emissions</p>
              <p className="text-3xl font-bold text-[#2563eb]">{totalEmissions.toFixed(0)}</p>
              <p className="text-xs text-muted-foreground mt-1">tons CO2e</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Avg per Transaction</p>
              <p className="text-3xl font-bold text-[#7c3aed]">{averageEmissions}</p>
              <p className="text-xs text-muted-foreground mt-1">tons CO2e</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Approved</p>
              <p className="text-3xl font-bold text-green-600">
                {transactions.filter((t) => t.status === 'Approved').length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Emissions Trend</CardTitle>
              <CardDescription>CO2e emissions over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyEmissionsData}>
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
                    dot={{ fill: '#16a34a' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Emissions by Department</CardTitle>
              <CardDescription>CO2e distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentEmissionsData}>
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
                  <Bar dataKey="emissions" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {showForm && (
          <Card className="bg-accent/50">
            <CardHeader>
              <CardTitle className="text-lg">Log a New Emission</CardTitle>
              <CardDescription>Save a transaction so it stays in the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="Manufacturing" required />
                </div>
                <div className="space-y-2">
                  <Label>Source</Label>
                  <Input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} placeholder="Natural Gas" required />
                </div>
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="150" required />
                </div>
                <div className="space-y-2">
                  <Label>Unit</Label>
                  <Input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="therm" required />
                </div>
                <div className="space-y-2">
                  <Label>CO2e (tons)</Label>
                  <Input type="number" step="0.01" value={form.co2Equivalent} onChange={(e) => setForm({ ...form, co2Equivalent: e.target.value })} placeholder="795" required />
                </div>
                <div className="space-y-2">
                  <Label>Factor</Label>
                  <Input type="number" step="0.01" value={form.factor} onChange={(e) => setForm({ ...form, factor: e.target.value })} placeholder="5.3" />
                </div>
                <div className="space-y-2 flex flex-col justify-end gap-2">
                  <Label>Status</Label>
                  <select className="h-10 rounded-md border border-input bg-background px-3" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option>Pending</option>
                    <option>Approved</option>
                  </select>
                  <Button type="submit" variant="eco-green">Save</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search transactions..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter size={18} />
            Filter
          </Button>
        </div>

        {/* Transactions Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-accent/30">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Department</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Source</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Quantity</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">CO2 Equivalent</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((trans) => (
                    <tr key={trans.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground">{trans.date}</td>
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{trans.department}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{trans.source}</td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {trans.quantity} {trans.unit}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#16a34a]">
                        {trans.co2Equivalent.toFixed(2)} tons
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Badge
                          variant={trans.status === 'Approved' ? 'status-approved' : 'status-pending'}
                        >
                          {trans.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
