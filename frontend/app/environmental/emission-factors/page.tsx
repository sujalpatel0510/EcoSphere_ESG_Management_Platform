'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api'

export default function EmissionFactorsPage() {
  const [factors, setFactors] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [form, setForm] = useState({ name: '', unit: '', co2Factor: '', category: 'Energy', source: 'Manual', status: 'Active' })

  useEffect(() => {
    fetch(`${API_BASE}/operations/emission-factors`)
      .then((res) => res.json())
      .then((data) => setFactors(Array.isArray(data) ? data : []))
      .catch(() => setFactors([]))
  }, [])

  const filteredFactors = useMemo(() => factors.filter((factor) =>
    factor.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ), [factors, searchTerm])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const payload = {
      name: form.name,
      unit: form.unit,
      co2Factor: Number(form.co2Factor || 0),
      category: form.category,
      source: form.source,
      status: form.status,
    }

    const response = await fetch(`${API_BASE}/operations/emission-factors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      const created = await response.json()
      setFactors((prev) => [created, ...prev])
      setForm({ name: '', unit: '', co2Factor: '', category: 'Energy', source: 'Manual', status: 'Active' })
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
              <span className="text-foreground font-medium">Emission Factors</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Emission Factors</h1>
            <p className="text-muted-foreground mt-2">Manage carbon conversion factors for your organization</p>
          </div>
          <Button variant="eco-green" onClick={() => setShowForm(!showForm)}>
            <Plus size={18} />
            Add Factor
          </Button>
        </div>

        {/* Add Factor Form */}
        {showForm && (
          <Card className="bg-accent/50">
            <CardHeader>
              <CardTitle className="text-lg">Add New Emission Factor</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Factor Name</Label>
                  <Input placeholder="e.g., Electricity" />
                </div>
                <div className="space-y-2">
                  <Label>Unit</Label>
                  <Input placeholder="e.g., kWh" />
                </div>
                <div className="space-y-2">
                  <Label>CO2 Factor (kg CO2e)</Label>
                  <Input placeholder="e.g., 0.233" type="number" step="0.001" />
                </div>
                <div className="space-y-2 flex flex-col justify-end gap-2">
                  <Button variant="eco-green" className="w-full">Save</Button>
                  <Button variant="outline" className="w-full" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search emission factors..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-accent/30">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Factor Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Unit</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">CO2 Factor</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Source</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFactors.map((factor) => (
                    <tr key={factor.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{factor.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{factor.unit}</td>
                      <td className="px-6 py-4 text-sm text-foreground font-semibold">{factor.co2Factor} kg CO2e</td>
                      <td className="px-6 py-4 text-sm">
                        <Badge variant="eco-blue">{factor.category}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{factor.source}</td>
                      <td className="px-6 py-4 text-sm">
                        <Badge variant="status-approved">{factor.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit size={16} />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 size={16} className="text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#16a34a]">{emissionFactorsData.length}</div>
                <p className="text-sm text-muted-foreground mt-2">Total Factors</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2563eb]">{factors.filter((f) => f.status === 'Active').length}</div>
                <p className="text-sm text-muted-foreground mt-2">Active Factors</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#7c3aed]">{new Set(factors.map((f) => f.category)).size}</div>
                <p className="text-sm text-muted-foreground mt-2">Categories</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
