'use client'

import React, { useEffect, useState } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, Target } from 'lucide-react'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'

export default function EnvironmentalGoalsPage() {
  const [goals, setGoals] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({
    name: '',
    target: '',
    current: '0',
    baseline: '0',
    currentValue: '0',
    unit: 'tons CO2e',
    status: 'On Track',
    department: 'All',
    startDate: '',
    deadline: '',
  })

  const loadGoals = () => {
    fetch('http://127.0.0.1:5000/api/environmental/goals')
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error('Error fetching goals:', err))
  }

  useEffect(() => {
    loadGoals()
  }, [])

  const resetForm = () => {
    setForm({
      name: '',
      target: '',
      current: '0',
      baseline: '0',
      currentValue: '0',
      unit: 'tons CO2e',
      status: 'On Track',
      department: 'All',
      startDate: '',
      deadline: '',
    })
    setEditingId(null)
  }

  const handleSave = () => {
    const payload = {
      ...form,
      current: Number(form.current),
      baseline: Number(form.baseline),
      currentValue: Number(form.currentValue),
    }

    const method = editingId ? 'PUT' : 'POST'
    fetch(`http://127.0.0.1:5000/api/environmental/goals${editingId ? `/${editingId}` : ''}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(() => {
        loadGoals()
        setOpen(false)
        resetForm()
      })
      .catch((err) => console.error('Error saving goal:', err))
  }

  const handleDelete = (id: number) => {
    fetch(`http://127.0.0.1:5000/api/environmental/goals/${id}`, { method: 'DELETE' })
      .then(() => setGoals(goals.filter((goal) => goal.id !== id)))
      .catch((err) => console.error('Error deleting goal:', err))
  }

  const handleEdit = (goal: any) => {
    setEditingId(goal.id)
    setForm({
      name: goal.name,
      target: goal.target,
      current: String(goal.current),
      baseline: String(goal.baseline),
      currentValue: String(goal.currentValue),
      unit: goal.unit,
      status: goal.status,
      department: goal.department,
      startDate: goal.startDate,
      deadline: goal.deadline,
    })
    setOpen(true)
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
              <span className="text-foreground font-medium">Goals</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Environmental Goals</h1>
            <p className="text-muted-foreground mt-2">Track and manage sustainability targets</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="eco-green" onClick={resetForm}>
                <Plus size={18} />
                Create Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Goal' : 'Create Goal'}</DialogTitle>
                <DialogDescription>Manage your sustainability targets from the database.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Goal name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input placeholder="Target" value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} />
                <div className="grid grid-cols-2 gap-4">
                  <Input type="number" placeholder="Current" value={form.current} onChange={(e) => setForm({ ...form, current: e.target.value })} />
                  <Input type="number" placeholder="Baseline" value={form.baseline} onChange={(e) => setForm({ ...form, baseline: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input type="number" placeholder="Current value" value={form.currentValue} onChange={(e) => setForm({ ...form, currentValue: e.target.value })} />
                  <Input placeholder="Unit" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option>On Track</option>
                    <option>At Risk</option>
                    <option>Planning</option>
                  </select>
                  <Input placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
                  <Input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
                </div>
                <Button className="w-full" onClick={handleSave}>{editingId ? 'Save Changes' : 'Create Goal'}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <Card key={goal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target size={20} className="text-[#16a34a]" />
                      {goal.name}
                    </CardTitle>
                    <CardDescription className="mt-1">{goal.department}</CardDescription>
                  </div>
                  <Badge
                    variant={goal.status === 'On Track' ? 'status-approved' : 'status-pending'}
                  >
                    {goal.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Progress</span>
                    <span className="text-sm font-bold text-[#16a34a]">{goal.current}%</span>
                  </div>
                  <Progress value={goal.current} className="h-2" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Current</p>
                    <p className="text-lg font-semibold text-foreground">{goal.currentValue}</p>
                    <p className="text-xs text-muted-foreground">{goal.unit}</p>
                  </div>
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Target</p>
                    <p className="text-lg font-semibold text-foreground">{goal.target}</p>
                  </div>
                </div>

                {/* Dates */}
                <div className="text-xs text-muted-foreground border-t border-border pt-3">
                  <p>Started: {goal.startDate}</p>
                  <p>Deadline: {goal.deadline}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-border">
                  <Button variant="outline" className="flex-1 text-sm" size="sm" onClick={() => handleEdit(goal)}>
                    <Edit size={16} />
                    Edit
                  </Button>
                  <Button variant="ghost" className="text-red-600 text-sm" size="sm" onClick={() => handleDelete(goal.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#16a34a]">{goals.length}</div>
              <p className="text-sm text-muted-foreground mt-2">Total Goals</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600">{goals.filter(g => g.status === 'On Track').length}</div>
              <p className="text-sm text-muted-foreground mt-2">On Track</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600">{goals.filter(g => g.status === 'At Risk').length}</div>
              <p className="text-sm text-muted-foreground mt-2">At Risk</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#2563eb]">
                {goals.length ? Math.round(goals.reduce((acc, g) => acc + Number(g.current || 0), 0) / goals.length) : 0}%
              </div>
              <p className="text-sm text-muted-foreground mt-2">Avg Progress</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
