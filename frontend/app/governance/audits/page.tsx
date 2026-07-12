'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AppLayout } from '@/components/layout/app-layout'
import { Plus, Calendar, Users, CheckCircle2, AlertCircle, Clock, FileText } from 'lucide-react'

const audits = [
  {
    id: 1,
    name: 'Internal ESG Audit Q2 2024',
    type: 'Internal',
    scope: 'All ESG metrics',
    auditor: 'Internal Audit Team',
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    status: 'Completed',
    findings: 'Minor findings - 3',
    issues: 0,
  },
  {
    id: 2,
    name: 'External Sustainability Audit',
    type: 'External',
    scope: 'Environmental & Social',
    auditor: 'EY Sustainability',
    startDate: '2024-04-15',
    endDate: '2024-05-15',
    status: 'Completed',
    findings: 'Compliant',
    issues: 0,
  },
  {
    id: 3,
    name: 'Compliance Audit - Data Privacy',
    type: 'Regulatory',
    scope: 'GDPR Compliance',
    auditor: 'Deloitte',
    startDate: '2024-07-01',
    endDate: '2024-08-30',
    status: 'In Progress',
    findings: 'Pending',
    issues: 0,
  },
  {
    id: 4,
    name: 'Internal Control Assessment',
    type: 'Internal',
    scope: 'Financial Controls',
    auditor: 'Internal Audit Team',
    startDate: '2024-08-01',
    endDate: '2024-09-15',
    status: 'Scheduled',
    findings: 'N/A',
    issues: 0,
  },
  {
    id: 5,
    name: 'Third-Party ESG Verification',
    type: 'External',
    scope: 'ESG Data Verification',
    auditor: 'Bureau Veritas',
    startDate: '2024-09-01',
    endDate: '2024-10-31',
    status: 'Scheduled',
    findings: 'N/A',
    issues: 0,
  },
]

const auditFindings = [
  {
    id: 1,
    auditName: 'Internal ESG Audit Q2 2024',
    finding: 'Documentation gaps in environmental metrics tracking',
    severity: 'Minor',
    responsible: 'Environmental Team',
    dueDate: '2024-07-31',
    status: 'In Progress',
  },
  {
    id: 2,
    auditName: 'Internal ESG Audit Q2 2024',
    finding: 'Inconsistent reporting across departments',
    severity: 'Minor',
    responsible: 'Data Governance',
    dueDate: '2024-08-15',
    status: 'Open',
  },
  {
    id: 3,
    auditName: 'Internal ESG Audit Q2 2024',
    finding: 'Training completion tracking needs improvement',
    severity: 'Minor',
    responsible: 'HR Department',
    dueDate: '2024-07-15',
    status: 'Closed',
  },
]

export default function AuditsPage() {
  const [activeTab, setActiveTab] = useState<'audits' | 'findings'>('audits')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700'
      case 'In Progress':
        return 'bg-blue-100 text-blue-700'
      case 'Scheduled':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-100 text-red-700'
      case 'Major':
        return 'bg-orange-100 text-orange-700'
      case 'Minor':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Audits</h1>
            <p className="text-muted-foreground mt-1">
              Schedule, track, and manage internal and external audits
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white gap-2">
                <Plus className="w-4 h-4" />
                Schedule Audit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Audit</DialogTitle>
                <DialogDescription>
                  Create a new internal or external audit
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Audit Name</label>
                  <input
                    placeholder="e.g., Q3 Internal Audit"
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                    <option>Internal</option>
                    <option>External</option>
                    <option>Regulatory</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Scope</label>
                  <input
                    placeholder="e.g., ESG metrics, Financial controls"
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                  />
                </div>
                <Button className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white">
                  Schedule Audit
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
                <span className="text-sm text-muted-foreground">
                  Total Audits
                </span>
                <p className="text-3xl font-bold text-foreground">
                  {audits.length}
                </p>
                <p className="text-xs text-muted-foreground">This year</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Completed
                </span>
                <p className="text-3xl font-bold text-green-600">
                  {audits.filter((a) => a.status === 'Completed').length}
                </p>
                <p className="text-xs text-green-500">On schedule</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  In Progress
                </span>
                <p className="text-3xl font-bold text-blue-600">
                  {audits.filter((a) => a.status === 'In Progress').length}
                </p>
                <p className="text-xs text-blue-500">Active audits</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Findings
                </span>
                <p className="text-3xl font-bold text-foreground">
                  {auditFindings.length}
                </p>
                <p className="text-xs text-muted-foreground">
                  {auditFindings.filter((f) => f.status === 'Closed').length}{' '}
                  resolved
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('audits')}
              className={`pb-3 px-2 font-medium text-sm border-b-2 transition ${
                activeTab === 'audits'
                  ? 'border-[#16a34a] text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Audits
            </button>
            <button
              onClick={() => setActiveTab('findings')}
              className={`pb-3 px-2 font-medium text-sm border-b-2 transition ${
                activeTab === 'findings'
                  ? 'border-[#16a34a] text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Findings
            </button>
          </div>
        </div>

        {/* Audits List */}
        {activeTab === 'audits' && (
          <div className="space-y-3">
            {audits.map((audit) => (
              <Card key={audit.id} className="border-0 shadow-sm hover:shadow-md transition">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <FileText className="w-10 h-10 text-[#16a34a] mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {audit.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {audit.scope}
                        </p>
                        <div className="flex gap-4 mt-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            {audit.auditor}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            {audit.startDate} to {audit.endDate}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getStatusColor(audit.status)}>
                        {audit.status === 'Completed' && (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        )}
                        {audit.status === 'In Progress' && (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {audit.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {audit.type}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Findings List */}
        {activeTab === 'findings' && (
          <div className="space-y-3">
            {auditFindings.map((finding) => (
              <Card key={finding.id} className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {finding.finding}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {finding.auditName}
                      </p>
                      <div className="flex gap-4 mt-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">
                            Responsible
                          </p>
                          <p className="font-medium">
                            {finding.responsible}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Due Date</p>
                          <p className="font-medium">{finding.dueDate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getSeverityColor(finding.severity)}>
                        {finding.severity === 'Minor' && (
                          <AlertCircle className="w-3 h-3 mr-1" />
                        )}
                        {finding.severity}
                      </Badge>
                      <Badge
                        variant={
                          finding.status === 'Closed'
                            ? 'default'
                            : 'outline'
                        }
                        className={
                          finding.status === 'Closed'
                            ? 'bg-green-100 text-green-700'
                            : finding.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-700'
                              : ''
                        }
                      >
                        {finding.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
