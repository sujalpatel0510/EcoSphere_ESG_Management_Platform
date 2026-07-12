'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AppLayout } from '@/components/layout/app-layout'
import { FileText, Download, Plus } from 'lucide-react'
import Link from 'next/link'

const initialReports = [
  { id: 1, name: 'Environmental Report', description: 'Carbon emissions, waste management, water usage', href: '/reports/environmental', icon: 'leaf', lastGenerated: '2024-06-10' },
  { id: 2, name: 'Social Report', description: 'Diversity, employee engagement, community impact', href: '/reports/social', icon: 'users', lastGenerated: '2024-06-09' },
  { id: 3, name: 'Governance Report', description: 'Board composition, audits, compliance, policies', href: '/reports/governance', icon: 'lock', lastGenerated: '2024-06-08' },
  { id: 4, name: 'ESG Summary', description: 'Comprehensive overview of all ESG metrics', href: '/reports/summary', icon: 'chart', lastGenerated: '2024-06-07' },
]

export default function ReportsPage() {
  const [reports, setReports] = useState(initialReports)
  const [lastExported, setLastExported] = useState('2024-06-10')
  const [statusMessage, setStatusMessage] = useState('')

  const handleExport = (report: (typeof reports)[number]) => {
    const content = `Report: ${report.name}\nGenerated: ${new Date().toISOString().slice(0, 10)}\nDescription: ${report.description}`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${report.name.toLowerCase().replace(/\s+/g, '-')}.txt`
    anchor.click()
    URL.revokeObjectURL(url)
    setLastExported(new Date().toISOString().slice(0, 10))
    setStatusMessage(`${report.name} exported successfully`)
  }

  const handleNewReport = () => {
    const newReport = { id: Date.now(), name: 'Custom Report', description: 'Fresh report draft built from current ESG metrics', href: '/reports/custom', icon: 'build', lastGenerated: new Date().toISOString().slice(0, 10) }
    setReports((current) => [newReport, ...current])
    setStatusMessage('New report draft created')
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground mt-1">Generate and manage ESG reports</p>
          </div>
          <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white gap-2" onClick={handleNewReport}><Plus className="w-4 h-4" />New Report</Button>
        </div>

        {statusMessage && <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{statusMessage}</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm"><CardContent className="pt-6"><div className="space-y-2"><span className="text-sm text-muted-foreground">Reports Generated</span><p className="text-3xl font-bold text-foreground">{reports.length + 4}</p><p className="text-xs text-muted-foreground">This year</p></div></CardContent></Card>
          <Card className="border-0 shadow-sm"><CardContent className="pt-6"><div className="space-y-2"><span className="text-sm text-muted-foreground">Scheduled Reports</span><p className="text-3xl font-bold text-foreground">5</p><p className="text-xs text-muted-foreground">Monthly</p></div></CardContent></Card>
          <Card className="border-0 shadow-sm"><CardContent className="pt-6"><div className="space-y-2"><span className="text-sm text-muted-foreground">Last Export</span><p className="text-lg font-bold text-foreground">{lastExported}</p><p className="text-xs text-muted-foreground">Text export</p></div></CardContent></Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report) => (
            <Card key={report.id} className="border-0 shadow-sm hover:shadow-md transition cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{report.name}</CardTitle>
                    <CardDescription className="mt-2">{report.description}</CardDescription>
                  </div>
                  <FileText className="w-6 h-6 text-[#16a34a]" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">Last generated: {report.lastGenerated}</div>
                <div className="flex gap-2">
                  <Link href={report.href} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-xs"><FileText className="w-3 h-3 mr-1" />View</Button>
                  </Link>
                  <Button size="sm" className="bg-[#16a34a] hover:bg-[#15803d] text-white text-xs" onClick={() => handleExport(report)}><Download className="w-3 h-3 mr-1" />Export</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
