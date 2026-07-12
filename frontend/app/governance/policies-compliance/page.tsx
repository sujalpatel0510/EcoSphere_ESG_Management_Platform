'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AppLayout } from '@/components/layout/app-layout'
import { Plus, Search, FileText, CheckCircle2, AlertCircle, Clock, Download, Edit2, Trash2 } from 'lucide-react'

const complianceMetrics = [
  { name: 'Policies Approved', value: 3, total: 5, percentage: 60 },
  { name: 'Training Completion', value: 156, total: 200, percentage: 78 },
  { name: 'Audit Items Resolved', value: 28, total: 35, percentage: 80 },
  { name: 'Policy Acknowledgments', value: 187, total: 200, percentage: 93 },
]

export default function PoliciesCompliancePage() {
  const [policies, setPolicies] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', category: 'Compliance', status: 'Approved', version: 'v1.0', lastUpdated: '', nextReview: '', coverage: '0%' })

  const categories = ['All', 'Ethics', 'Compliance', 'Environmental', 'Social']

  const loadPolicies = () => {
    fetch('http://127.0.0.1:5000/api/governance/policies')
      .then((res) => res.json())
      .then((data) => setPolicies(data))
      .catch((err) => console.error('Error fetching policies:', err))
  }

  useEffect(() => {
    loadPolicies()
  }, [])

  const resetForm = () => {
    setForm({ name: '', category: 'Compliance', status: 'Approved', version: 'v1.0', lastUpdated: '', nextReview: '', coverage: '0%' })
    setEditingId(null)
  }

  const handleSave = () => {
    const method = editingId ? 'PUT' : 'POST'
    fetch(`http://127.0.0.1:5000/api/governance/policies${editingId ? `/${editingId}` : ''}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(() => {
        loadPolicies()
        setOpen(false)
        resetForm()
      })
      .catch((err) => console.error('Error saving policy:', err))
  }

  const handleDelete = (id: number) => {
    fetch(`http://127.0.0.1:5000/api/governance/policies/${id}`, { method: 'DELETE' })
      .then(() => setPolicies(policies.filter((policy) => policy.id !== id)))
      .catch((err) => console.error('Error deleting policy:', err))
  }

  const handleEdit = (policy: any) => {
    setEditingId(policy.id)
    setForm({
      name: policy.name,
      category: policy.category,
      status: policy.status,
      version: policy.version,
      lastUpdated: policy.lastUpdated || '',
      nextReview: policy.nextReview || '',
      coverage: policy.coverage,
    })
    setOpen(true)
  }

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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white gap-2" onClick={resetForm}>
                <Plus className="w-4 h-4" />
                New Policy
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Policy' : 'Create New Policy'}</DialogTitle>
                <DialogDescription>
                  {editingId ? 'Update the policy details.' : 'Add a new company policy document.'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Policy Name</label>
                  <Input placeholder="e.g., Remote Work Policy" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                      <option>Ethics</option>
                      <option>Compliance</option>
                      <option>Environmental</option>
                      <option>Social</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                      <option>Approved</option>
                      <option>In Review</option>
                      <option>Pending Approval</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Version" value={form.version} onChange={(e) => setForm({ ...form, version: e.target.value })} />
                  <Input placeholder="Coverage" value={form.coverage} onChange={(e) => setForm({ ...form, coverage: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input type="date" value={form.lastUpdated} onChange={(e) => setForm({ ...form, lastUpdated: e.target.value })} />
                  <Input type="date" value={form.nextReview} onChange={(e) => setForm({ ...form, nextReview: e.target.value })} />
                </div>
                <Button className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white" onClick={handleSave}>
                  {editingId ? 'Save Changes' : 'Create Policy'}
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
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-[#16a34a] hover:text-[#15803d]" onClick={() => handleEdit(policy)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(policy.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-[#16a34a] hover:text-[#15803d]">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
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
