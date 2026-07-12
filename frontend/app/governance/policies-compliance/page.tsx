'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AppLayout } from '@/components/layout/app-layout'
import { Plus, Search, FileText, CheckCircle2, AlertCircle, Clock, Download } from 'lucide-react'

const policies = [
  {
    id: 1,
    name: 'Code of Conduct',
    category: 'Ethics',
    status: 'Approved',
    version: 'v3.2',
    lastUpdated: '2024-05-15',
    nextReview: '2024-11-15',
    coverage: '100%',
  },
  {
    id: 2,
    name: 'Data Privacy Policy',
    category: 'Compliance',
    status: 'Approved',
    version: 'v2.1',
    lastUpdated: '2024-04-20',
    nextReview: '2024-10-20',
    coverage: '95%',
  },
  {
    id: 3,
    name: 'Environmental Policy',
    category: 'Environmental',
    status: 'In Review',
    version: 'v1.0',
    lastUpdated: '2024-06-01',
    nextReview: '2024-12-01',
    coverage: '78%',
  },
  {
    id: 4,
    name: 'Anti-Corruption Policy',
    category: 'Ethics',
    status: 'Approved',
    version: 'v2.0',
    lastUpdated: '2024-03-15',
    nextReview: '2024-09-15',
    coverage: '100%',
  },
  {
    id: 5,
    name: 'Workplace Safety Policy',
    category: 'Social',
    status: 'Pending Approval',
    version: 'v1.5',
    lastUpdated: '2024-06-10',
    nextReview: '2024-12-10',
    coverage: '82%',
  },
]

const complianceMetrics = [
  { name: 'Policies Approved', value: 3, total: 5, percentage: 60 },
  { name: 'Training Completion', value: 156, total: 200, percentage: 78 },
  { name: 'Audit Items Resolved', value: 28, total: 35, percentage: 80 },
  { name: 'Policy Acknowledgments', value: 187, total: 200, percentage: 93 },
]

export default function PoliciesCompliancePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Ethics', 'Compliance', 'Environmental', 'Social']

  const filteredPolicies = policies.filter(
    (policy) =>
      (selectedCategory === 'All' || policy.category === selectedCategory) &&
      (policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.category.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Policies & Compliance
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage company policies and compliance requirements
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white gap-2">
                <Plus className="w-4 h-4" />
                New Policy
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Policy</DialogTitle>
                <DialogDescription>
                  Add a new company policy document
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Policy Name</label>
                  <Input placeholder="e.g., Remote Work Policy" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                    <option>Ethics</option>
                    <option>Compliance</option>
                    <option>Environmental</option>
                    <option>Social</option>
                  </select>
                </div>
                <Button className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white">
                  Create Policy
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Compliance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {complianceMetrics.map((metric, idx) => (
            <Card key={idx} className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">{metric.name}</p>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {metric.percentage}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {metric.value} of {metric.total}
                    </p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-[#16a34a] h-2 rounded-full transition-all"
                      style={{ width: `${metric.percentage}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search policies..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className={
                      selectedCategory === cat
                        ? 'bg-[#16a34a] hover:bg-[#15803d] text-white'
                        : ''
                    }
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Policies List */}
        <div className="space-y-3">
          {filteredPolicies.map((policy) => (
            <Card key={policy.id} className="border-0 shadow-sm hover:shadow-md transition">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <FileText className="w-10 h-10 text-[#16a34a] mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">
                          {policy.name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {policy.version}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Category</p>
                          <p className="font-medium">{policy.category}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Updated</p>
                          <p className="font-medium">{policy.lastUpdated}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Next Review</p>
                          <p className="font-medium">{policy.nextReview}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Coverage</p>
                          <p className="font-medium">{policy.coverage}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      className={
                        policy.status === 'Approved'
                          ? 'bg-green-100 text-green-700'
                          : policy.status === 'In Review'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                      }
                    >
                      {policy.status === 'Approved' && (
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                      )}
                      {policy.status === 'In Review' && (
                        <Clock className="w-3 h-3 mr-1" />
                      )}
                      {policy.status === 'Pending Approval' && (
                        <AlertCircle className="w-3 h-3 mr-1" />
                      )}
                      {policy.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#16a34a] hover:text-[#15803d]"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
