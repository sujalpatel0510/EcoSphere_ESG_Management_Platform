'use client'

import React, { useState } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  Legend,
  ResponsiveContainer,
} from 'recharts'

const carbonTransactionsData = [
  {
    id: 1,
    date: '2024-07-15',
    department: 'Manufacturing',
    source: 'Natural Gas Usage',
    quantity: 150,
    unit: 'therm',
    co2Equivalent: 795,
    factor: 5.3,
    status: 'Approved',
  },
  {
    id: 2,
    date: '2024-07-14',
    department: 'Logistics',
    source: 'Fleet Fuel (Diesel)',
    quantity: 200,
    unit: 'gallon',
    co2Equivalent: 2030,
    factor: 10.15,
    status: 'Approved',
  },
  {
    id: 3,
    date: '2024-07-13',
    department: 'Operations',
    source: 'Electricity Consumption',
    quantity: 5000,
    unit: 'kWh',
    co2Equivalent: 1165,
    factor: 0.233,
    status: 'Approved',
  },
  {
    id: 4,
    date: '2024-07-12',
    department: 'Facilities',
    source: 'Waste to Landfill',
    quantity: 25,
    unit: 'metric ton',
    co2Equivalent: 18.5,
    factor: 0.74,
    status: 'Pending',
  },
  {
    id: 5,
    date: '2024-07-11',
    department: 'Manufacturing',
    source: 'Water Usage',
    quantity: 100000,
    unit: 'gallon',
    co2Equivalent: 13.2,
    factor: 0.000132,
    status: 'Approved',
  },
]

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
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTransactions = carbonTransactionsData.filter((trans) =>
    trans.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trans.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalEmissions = carbonTransactionsData.reduce((sum, trans) => sum + trans.co2Equivalent, 0)
  const averageEmissions = (totalEmissions / carbonTransactionsData.length).toFixed(2)

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
            <Button variant="eco-green">
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
              <p className="text-3xl font-bold text-[#16a34a]">{carbonTransactionsData.length}</p>
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
                {carbonTransactionsData.filter(t => t.status === 'Approved').length}
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
