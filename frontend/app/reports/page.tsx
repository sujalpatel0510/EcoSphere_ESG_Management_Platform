'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AppLayout } from '@/components/layout/app-layout'
import { BarChart3, FileText, Download, Plus } from 'lucide-react'
import Link from 'next/link'

const reportCategories = [
  {
    id: 1,
    name: 'Environmental Report',
    description: 'Carbon emissions, waste management, water usage',
    href: '/reports/environmental',
    icon: 'leaf',
    lastGenerated: '2024-06-10',
  },
  {
    id: 2,
    name: 'Social Report',
    description: 'Diversity, employee engagement, community impact',
    href: '/reports/social',
    icon: 'users',
    lastGenerated: '2024-06-09',
  },
  {
    id: 3,
    name: 'Governance Report',
    description: 'Board composition, audits, compliance, policies',
    href: '/reports/governance',
    icon: 'lock',
    lastGenerated: '2024-06-08',
  },
  {
    id: 4,
    name: 'ESG Summary',
    description: 'Comprehensive overview of all ESG metrics',
    href: '/reports/summary',
    icon: 'chart',
    lastGenerated: '2024-06-07',
  },
  {
    id: 5,
    name: 'Custom Report Builder',
    description: 'Create custom reports with selected metrics',
    href: '/reports/custom',
    icon: 'build',
    lastGenerated: 'N/A',
  },
]

export default function ReportsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground mt-1">
              Generate and manage ESG reports
            </p>
          </div>
          <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white gap-2">
            <Plus className="w-4 h-4" />
            New Report
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Reports Generated
                </span>
                <p className="text-3xl font-bold text-foreground">24</p>
                <p className="text-xs text-muted-foreground">This year</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Scheduled Reports
                </span>
                <p className="text-3xl font-bold text-foreground">5</p>
                <p className="text-xs text-muted-foreground">Monthly</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Last Export
                </span>
                <p className="text-lg font-bold text-foreground">
                  2024-06-10
                </p>
                <p className="text-xs text-muted-foreground">PDF Format</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportCategories.map((report) => (
            <Link key={report.id} href={report.href}>
              <Card className="border-0 shadow-sm hover:shadow-md transition cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {report.name}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {report.description}
                      </CardDescription>
                    </div>
                    <FileText className="w-6 h-6 text-[#16a34a]" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    {report.lastGenerated !== 'N/A' && (
                      <>Last generated: {report.lastGenerated}</>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      className="bg-[#16a34a] hover:bg-[#15803d] text-white text-xs"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Scheduled Reports */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Scheduled Reports</CardTitle>
            <CardDescription>
              Set up automatic report generation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-semibold text-foreground">
                    Monthly ESG Summary
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Every 1st of the month at 9:00 AM
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-semibold text-foreground">
                    Quarterly Report Pack
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Every 1st of Q month at 10:00 AM
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
