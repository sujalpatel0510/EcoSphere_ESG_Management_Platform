'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AppLayout } from '@/components/layout/app-layout'
import { Plus, Search, Edit2, Trash2, Heart, Users, Briefcase, TrendingUp } from 'lucide-react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5000'

export default function CSRInitiativesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [initiatives, setInitiatives] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [newInit, setNewInit] = useState({ name: '', description: '', category: 'Healthcare', impact: 'N/A', budget: '$0', status: 'Planning', startDate: '', team: '1' })
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const loadInitiatives = () => {
    fetch(`${API_BASE_URL}/api/social/csr-initiatives`)
      .then(res => res.ok ? res.json() : Promise.reject(new Error('Failed to load initiatives')))
      .then(data => setInitiatives(data))
      .catch(err => {
        console.error('Error fetching initiatives:', err)
        setInitiatives([])
      })
  }

  useEffect(() => {
    loadInitiatives()
  }, [])

  const resetForm = () => {
    setNewInit({ name: '', description: '', category: 'Healthcare', impact: 'N/A', budget: '$0', status: 'Planning', startDate: '', team: '1' })
    setEditingId(null)
  }

  const handleCreate = () => {
    const payload = {
      ...newInit,
      team: Number(newInit.team || 0),
    }

    const requestOptions = {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }

    fetch(`${API_BASE_URL}/api/social/csr-initiatives${editingId ? `/${editingId}` : ''}`, requestOptions)
      .then(res => res.ok ? res.json() : Promise.reject(new Error('Failed to save initiative')))
      .then(() => {
        loadInitiatives()
        setOpen(false)
        resetForm()
      })
  }

  const handleDelete = (id: number) => {
    fetch(`${API_BASE_URL}/api/social/csr-initiatives/${id}`, { method: 'DELETE' })
      .then(() => setInitiatives(initiatives.filter(i => i.id !== id)))
  }

  const handleEdit = (init: any) => {
    setEditingId(init.id)
    setNewInit({
      name: init.name,
      description: init.description,
      category: init.category,
      impact: init.impact || 'N/A',
      budget: init.budget || '$0',
      status: init.status || 'Planning',
      startDate: init.startDate || '',
      team: String(init.team || 1),
    })
    setOpen(true)
  }

  const categories = ['All', 'Healthcare', 'Education', 'Environment', 'Social']
  const filteredInitiatives = initiatives.filter(
    (init) =>
      (selectedCategory === 'All' || init.category === selectedCategory) &&
      (init.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        init.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const stats = [
    {
      label: 'Total Initiatives',
      value: initiatives.length,
      icon: Briefcase,
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    },
    {
      label: 'Total Budget',
      value: '$200K',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
    },
    {
      label: 'People Impacted',
      value: '5.65K+',
      icon: Users,
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
    },
    {
      label: 'Active Programs',
      value: '3',
      icon: Heart,
      color: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
    },
  ]

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">CSR Initiatives</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track corporate social responsibility programs
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white gap-2">
                <Plus className="w-4 h-4" />
                New Initiative
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Initiative' : 'Create New Initiative'}</DialogTitle>
                <DialogDescription>
                  {editingId ? 'Update the selected initiative details.' : 'Add a new CSR initiative to your portfolio.'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Initiative Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Community Health Program"
                    value={newInit.name}
                    onChange={(e) => setNewInit({ ...newInit, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Brief description"
                    value={newInit.description}
                    onChange={(e) => setNewInit({ ...newInit, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    title="Category select"
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                    value={newInit.category}
                    onChange={(e) => setNewInit({ ...newInit, category: e.target.value })}
                  >
                    <option>Healthcare</option>
                    <option>Education</option>
                    <option>Environment</option>
                    <option>Social</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="impact">Impact</Label>
                    <Input
                      id="impact"
                      placeholder="e.g., 500 families"
                      value={newInit.impact}
                      onChange={(e) => setNewInit({ ...newInit, impact: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget</Label>
                    <Input
                      id="budget"
                      placeholder="e.g., $25,000"
                      value={newInit.budget}
                      onChange={(e) => setNewInit({ ...newInit, budget: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      title="Status select"
                      className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                      value={newInit.status}
                      onChange={(e) => setNewInit({ ...newInit, status: e.target.value })}
                    >
                      <option>Planning</option>
                      <option>Active</option>
                      <option>Completed</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team">Team Size</Label>
                    <Input
                      id="team"
                      type="number"
                      min="1"
                      value={newInit.team}
                      onChange={(e) => setNewInit({ ...newInit, team: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newInit.startDate}
                    onChange={(e) => setNewInit({ ...newInit, startDate: e.target.value })}
                  />
                </div>
                <Button onClick={handleCreate} className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white">
                  {editingId ? 'Save Changes' : 'Create Initiative'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <Card key={idx} className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Filters and Search */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search initiatives..."
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

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredInitiatives.map((init) => (
            <Card key={init.id} className="border-0 shadow-sm hover:shadow-md transition">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{init.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {init.description}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={init.status === 'Active' ? 'default' : 'outline'}
                    className={
                      init.status === 'Active'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400'
                    }
                  >
                    {init.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Category</p>
                    <p className="font-semibold">{init.category}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Budget</p>
                    <p className="font-semibold">{init.budget}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Impact</p>
                    <p className="font-semibold">{init.impact}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Team Size</p>
                    <p className="font-semibold">{init.team} people</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#16a34a] hover:text-[#15803d]"
                    onClick={() => handleEdit(init)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(init.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
