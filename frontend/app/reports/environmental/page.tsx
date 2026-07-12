'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AppLayout } from '@/components/layout/app-layout'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Download, Printer, Share2 } from 'lucide-react'

const emissionData = [
  { month: 'Jan', scope1: 1200, scope2: 2400, scope3: 1400 },
  { month: 'Feb', scope1: 1300, scope2: 2210, scope3: 1300 },
  { month: 'Mar', scope1: 980, scope2: 2290, scope3: 1200 },
  { month: 'Apr', scope1: 900, scope2: 2000, scope3: 1100 },
  { month: 'May', scope1: 850, scope2: 1800, scope3: 1000 },
  { month: 'Jun', scope1: 720, scope2: 1600, scope3: 900 },
]

const wasteData = [
  { name: 'Recycled', value: 45 },
  { name: 'Landfill', value: 30 },
  { name: 'Composted', value: 15 },
  { name: 'Incinerated', value: 10 },
]

const energyData = [
  { type: 'Solar', usage: 35 },
  { type: 'Wind', usage: 25 },
  { type: 'Grid', usage: 40 },
]

const COLORS = ['#16a34a', '#2563eb', '#7c3aed', '#f97316']

export default function EnvironmentalReportPage() {
  const [statusMessage, setStatusMessage] = useState('')

  const handleExport = () => {
    const content = `Environmental Report\nGenerated: ${new Date().toISOString().slice(0, 10)}\nTotal Emissions: 18,450 tCO2e\nRenewable Energy: 47%`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'environmental-report.txt'
    anchor.click()
    URL.revokeObjectURL(url)
    setStatusMessage('Exported environmental report')
  }

  const handlePrint = () => {
    window.print()
    setStatusMessage('Print dialog opened')
  }

  const handleShare = () => {
    setStatusMessage('Share link copied to clipboard')
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Environmental Report</h1>
            <p className="text-muted-foreground mt-1">H1 2024 Environmental Impact Analysis</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}><Printer className="w-4 h-4 mr-2" />Print</Button>
            <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white gap-2" onClick={handleExport}><Download className="w-4 h-4" />Export PDF</Button>
          </div>
        </div>

        {statusMessage && <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{statusMessage}</div>}

        <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader><CardTitle>Executive Summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><p className="text-sm text-muted-foreground">Total Emissions</p><p className="text-2xl font-bold text-foreground mt-1">18,450</p><p className="text-xs text-green-600">-12% vs last year</p></div>
              <div><p className="text-sm text-muted-foreground">Energy Consumed</p><p className="text-2xl font-bold text-foreground mt-1">2,840 MWh</p><p className="text-xs text-muted-foreground">47% renewable</p></div>
              <div><p className="text-sm text-muted-foreground">Waste Generated</p><p className="text-2xl font-bold text-foreground mt-1">562 tons</p><p className="text-xs text-green-600">45% recycled</p></div>
              <div><p className="text-sm text-muted-foreground">Water Used</p><p className="text-2xl font-bold text-foreground mt-1">18.4M gal</p><p className="text-xs text-muted-foreground">Baseline</p></div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle>Emission Trends</CardTitle><CardDescription>Scope 1, 2, and 3 emissions (tCO2e)</CardDescription></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={emissionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Legend />
                  <Line type="monotone" dataKey="scope1" stroke="#16a34a" strokeWidth={2} />
                  <Line type="monotone" dataKey="scope2" stroke="#2563eb" strokeWidth={2} />
                  <Line type="monotone" dataKey="scope3" stroke="#7c3aed" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle>Waste Breakdown</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={wasteData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name} ${value}%`} outerRadius={80} fill="#16a34a" dataKey="value">
                    {wasteData.map((entry, index) => (<Cell key={entry.name} fill={COLORS[index % COLORS.length]} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader><CardTitle>Energy Mix</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="type" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                <Bar dataKey="usage" fill="#16a34a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader><CardTitle>Detailed Metrics</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4"><div><p className="text-sm font-medium text-muted-foreground">Carbon Intensity</p><p className="text-2xl font-bold text-foreground mt-2">2.1 tCO2e/M$</p><p className="text-xs text-green-600">Target: 1.8 by 2025</p></div><div><p className="text-sm font-medium text-muted-foreground">Water Intensity</p><p className="text-2xl font-bold text-foreground mt-2">2.1 M gal/M$</p><p className="text-xs text-muted-foreground">Baseline metric</p></div></div>
              <div className="space-y-4"><div><p className="text-sm font-medium text-muted-foreground">Renewable Energy %</p><p className="text-2xl font-bold text-foreground mt-2">47%</p><p className="text-xs text-green-600">Target: 75% by 2030</p></div><div><p className="text-sm font-medium text-muted-foreground">Waste Diversion Rate</p><p className="text-2xl font-bold text-foreground mt-2">60%</p><p className="text-xs text-green-600">Target: 80% by 2025</p></div></div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleShare}><Share2 className="w-4 h-4 mr-2" />Share Report</Button>
          <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white gap-2" onClick={handleExport}><Download className="w-4 h-4" />Download PDF</Button>
        </div>
      </div>
    </AppLayout>
  )
}
