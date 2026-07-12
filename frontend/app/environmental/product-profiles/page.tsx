'use client'

import React, { useState } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Edit, Trash2, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'

const productsData = [
  {
    id: 1,
    name: 'Product A - Premium Edition',
    sku: 'PRD-001',
    category: 'Consumer Electronics',
    environmental: 75,
    social: 72,
    governance: 80,
    overall: 76,
    carbonFootprint: 5.2,
    recyclability: 85,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Product B - Standard',
    sku: 'PRD-002',
    category: 'Packaging',
    environmental: 88,
    social: 80,
    governance: 85,
    overall: 84,
    carbonFootprint: 1.2,
    recyclability: 95,
    status: 'Active',
  },
  {
    id: 3,
    name: 'Product C - Eco Line',
    sku: 'PRD-003',
    category: 'Textiles',
    environmental: 92,
    social: 88,
    governance: 90,
    overall: 90,
    carbonFootprint: 2.8,
    recyclability: 98,
    status: 'Active',
  },
  {
    id: 4,
    name: 'Product D - Legacy',
    sku: 'PRD-004',
    category: 'Electronics',
    environmental: 62,
    social: 68,
    governance: 70,
    overall: 67,
    carbonFootprint: 8.5,
    recyclability: 60,
    status: 'Under Review',
  },
]

export default function ProductESGProfilesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
              <span className="text-foreground font-medium">Product Profiles</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Product ESG Profiles</h1>
            <p className="text-muted-foreground mt-2">Manage ESG metrics for your products</p>
          </div>
          <Button variant="eco-green">
            <Plus size={18} />
            Add Product
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">{product.sku}</p>
                  </div>
                  <Badge variant="eco-blue">{product.category}</Badge>
                </div>
                <Badge
                  variant={product.status === 'Active' ? 'status-approved' : 'status-pending'}
                >
                  {product.status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Overall Score */}
                <div className="bg-gradient-to-r from-[#16a34a]/10 to-[#2563eb]/10 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Overall ESG Score</span>
                    <span className="text-2xl font-bold text-[#16a34a]">{product.overall}/100</span>
                  </div>
                  <Progress value={product.overall} className="h-2" />
                </div>

                {/* Component Scores */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Environmental</p>
                    <p className="text-lg font-bold text-[#16a34a]">{product.environmental}</p>
                    <Progress value={product.environmental} className="h-1 mt-2" />
                  </div>
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Social</p>
                    <p className="text-lg font-bold text-[#2563eb]">{product.social}</p>
                    <Progress value={product.social} className="h-1 mt-2" />
                  </div>
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Governance</p>
                    <p className="text-lg font-bold text-[#7c3aed]">{product.governance}</p>
                    <Progress value={product.governance} className="h-1 mt-2" />
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 border-t border-border pt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Carbon Footprint</p>
                    <p className="text-sm font-semibold text-foreground">{product.carbonFootprint} kg CO2e</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Recyclability</p>
                    <p className="text-sm font-semibold text-foreground">{product.recyclability}%</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 border-t border-border pt-3">
                  <Button variant="outline" className="flex-1 text-sm" size="sm">
                    <Edit size={16} />
                    Edit
                  </Button>
                  <Button variant="ghost" className="text-red-600 text-sm" size="sm">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#16a34a]">{productsData.length}</div>
              <p className="text-sm text-muted-foreground mt-2">Total Products</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#2563eb]">
                {(productsData.reduce((sum, p) => sum + p.overall, 0) / productsData.length).toFixed(0)}
              </div>
              <p className="text-sm text-muted-foreground mt-2">Avg ESG Score</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#7c3aed]">
                {(productsData.reduce((sum, p) => sum + p.carbonFootprint, 0) / productsData.length).toFixed(1)}
              </div>
              <p className="text-sm text-muted-foreground mt-2">Avg Carbon Footprint</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600">
                {productsData.filter(p => p.overall >= 85).length}
              </div>
              <p className="text-sm text-muted-foreground mt-2">High ESG Score</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
