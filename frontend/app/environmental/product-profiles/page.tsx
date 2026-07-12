'use client'

import { useEffect, useState } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'

const STORAGE_KEY = 'ecosphere-product-profiles'

const initialProducts = [
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
]

export default function ProductESGProfilesPage() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingProductId, setEditingProductId] = useState<number | null>(null)
  const [form, setForm] = useState({
    name: '',
    sku: '',
    category: 'Consumer Electronics',
    environmental: '75',
    social: '72',
    governance: '80',
    carbonFootprint: '3.0',
    recyclability: '85',
    status: 'Active',
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return
    try {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length) {
        setProducts(parsed)
      }
    } catch {
      // ignore malformed storage
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    }
  }, [products])

  const resetForm = () => {
    setForm({
      name: '',
      sku: '',
      category: 'Consumer Electronics',
      environmental: '75',
      social: '72',
      governance: '80',
      carbonFootprint: '3.0',
      recyclability: '85',
      status: 'Active',
    })
    setEditingProductId(null)
    setShowForm(false)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.name || !form.sku) return

    const payload = {
      ...form,
      environmental: Number(form.environmental),
      social: Number(form.social),
      governance: Number(form.governance),
      carbonFootprint: Number(form.carbonFootprint),
      recyclability: Number(form.recyclability),
      overall: Math.round((Number(form.environmental) + Number(form.social) + Number(form.governance)) / 3),
    }

    if (editingProductId) {
      setProducts((current) => current.map((item) => (item.id === editingProductId ? { ...item, ...payload } : item)))
    } else {
      setProducts((current) => [{ id: Date.now(), ...payload }, ...current])
    }

    resetForm()
  }

  const handleEdit = (product: (typeof products)[number]) => {
    setEditingProductId(product.id)
    setForm({
      name: product.name,
      sku: product.sku,
      category: product.category,
      environmental: String(product.environmental),
      social: String(product.social),
      governance: String(product.governance),
      carbonFootprint: String(product.carbonFootprint),
      recyclability: String(product.recyclability),
      status: product.status,
    })
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    setProducts((current) => current.filter((item) => item.id !== id))
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const averageScore = products.length ? Math.round(products.reduce((sum, item) => sum + item.overall, 0) / products.length) : 0
  const averageCarbon = products.length ? (products.reduce((sum, item) => sum + item.carbonFootprint, 0) / products.length).toFixed(1) : '0.0'
  const highScoreCount = products.filter((item) => item.overall >= 85).length

  return (
    <AppLayout>
      <div className="p-4 md:p-8 space-y-6">
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
          <Button variant="eco-green" onClick={() => { setShowForm(true); setEditingProductId(null); setForm({ name: '', sku: '', category: 'Consumer Electronics', environmental: '75', social: '72', governance: '80', carbonFootprint: '3.0', recyclability: '85', status: 'Active' }) }}>
            <Plus size={18} />
            Add Product
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input placeholder="Search products..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>{editingProductId ? 'Edit Product' : 'Add Product'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
                <Input placeholder="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input placeholder="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
                <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                <Input placeholder="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
                <Input type="number" placeholder="Environmental" value={form.environmental} onChange={(e) => setForm({ ...form, environmental: e.target.value })} />
                <Input type="number" placeholder="Social" value={form.social} onChange={(e) => setForm({ ...form, social: e.target.value })} />
                <Input type="number" placeholder="Governance" value={form.governance} onChange={(e) => setForm({ ...form, governance: e.target.value })} />
                <Input type="number" step="0.1" placeholder="Carbon Footprint" value={form.carbonFootprint} onChange={(e) => setForm({ ...form, carbonFootprint: e.target.value })} />
                <Input type="number" placeholder="Recyclability" value={form.recyclability} onChange={(e) => setForm({ ...form, recyclability: e.target.value })} />
                <div className="md:col-span-2 flex gap-2">
                  <Button type="submit" className="bg-[#16a34a] hover:bg-[#15803d] text-white">{editingProductId ? 'Save Product' : 'Create Product'}</Button>
                  <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

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
                <Badge variant={product.status === 'Active' ? 'status-approved' : 'status-pending'}>{product.status}</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-[#16a34a]/10 to-[#2563eb]/10 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Overall ESG Score</span>
                    <span className="text-2xl font-bold text-[#16a34a]">{product.overall}/100</span>
                  </div>
                  <Progress value={product.overall} className="h-2" />
                </div>
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
                <div className="flex gap-2 border-t border-border pt-3">
                  <Button variant="outline" className="flex-1 text-sm" size="sm" onClick={() => handleEdit(product)}>
                    <Edit size={16} />
                    Edit
                  </Button>
                  <Button variant="ghost" className="text-red-600 text-sm" size="sm" onClick={() => handleDelete(product.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#16a34a]">{products.length}</div>
              <p className="text-sm text-muted-foreground mt-2">Total Products</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#2563eb]">{averageScore}</div>
              <p className="text-sm text-muted-foreground mt-2">Avg ESG Score</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#7c3aed]">{averageCarbon}</div>
              <p className="text-sm text-muted-foreground mt-2">Avg Carbon Footprint</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600">{highScoreCount}</div>
              <p className="text-sm text-muted-foreground mt-2">High ESG Score</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
