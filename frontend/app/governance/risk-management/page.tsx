'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AppLayout } from '@/components/layout/app-layout'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts'
import { AlertTriangle, TrendingDown, Plus } from 'lucide-react'

const STORAGE_KEY = 'ecosphere-risk-register'

const initialRisks = [
  { id: 1, name: 'Climate Change', category: 'Environmental', impact: 4, probability: 3, status: 'Active', mitigation: 'Carbon reduction strategy, renewable energy adoption' },
  { id: 2, name: 'Data Security', category: 'Technology', impact: 5, probability: 2, status: 'Active', mitigation: 'Enhanced cybersecurity measures, regular audits' },
  { id: 3, name: 'Regulatory Changes', category: 'Compliance', impact: 4, probability: 4, status: 'Monitoring', mitigation: 'Regulatory monitoring, policy updates' },
]

const riskTrends = [
  { month: 'Jan', critical: 2, high: 4, medium: 6, low: 8 },
  { month: 'Feb', critical: 2, high: 3, medium: 6, low: 9 },
  { month: 'Mar', critical: 1, high: 4, medium: 7, low: 8 },
  { month: 'Apr', critical: 1, high: 3, medium: 6, low: 10 },
  { month: 'May', critical: 2, high: 4, medium: 5, low: 9 },
  { month: 'Jun', critical: 2, high: 5, medium: 6, low: 8 },
]

export default function RiskManagementPage() {
  const [risks, setRisks] = useState(initialRisks)
  const [selectedRisk, setSelectedRisk] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', category: 'Environmental', impact: '3', probability: '2', status: 'Monitoring', mitigation: '' })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return
    try {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length) {
        setRisks(parsed)
      }
    } catch {
      // ignore malformed data
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(risks))
    }
  }, [risks])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.name) return

    const payload = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      impact: Number(form.impact),
      probability: Number(form.probability),
      status: form.status,
      mitigation: form.mitigation || 'Mitigation plan pending',
    }

    setRisks((current) => [payload, ...current])
    setForm({ name: '', category: 'Environmental', impact: '3', probability: '2', status: 'Monitoring', mitigation: '' })
    setShowForm(false)
  }

  const getRiskColor = (probability: number, impact: number) => {
    const score = probability * impact
    if (score >= 12) return 'bg-red-100 text-red-700'
    if (score >= 8) return 'bg-orange-100 text-orange-700'
    return 'bg-yellow-100 text-yellow-700'
  }

  const getRiskSeverity = (probability: number, impact: number) => {
    const score = probability * impact
    if (score >= 12) return 'Critical'
    if (score >= 8) return 'High'
    return 'Medium'
  }

  const criticalCount = risks.filter((risk) => getRiskSeverity(risk.probability, risk.impact) === 'Critical').length
  const highCount = risks.filter((risk) => getRiskSeverity(risk.probability, risk.impact) === 'High').length

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Risk Management</h1>
            <p className="text-muted-foreground mt-1">Identify, assess, and monitor enterprise risks</p>
          </div>
          <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white gap-2" onClick={() => setShowForm((current) => !current)}>
            <Plus className="w-4 h-4" />Add Risk
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Risk</CardTitle>
              <CardDescription>Capture a new enterprise risk and mitigation plan.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
                <input placeholder="Risk name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-10 rounded-md border border-input bg-background px-3" />
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="h-10 rounded-md border border-input bg-background px-3">
                  <option value="Environmental">Environmental</option>
                  <option value="Technology">Technology</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Operational">Operational</option>
                </select>
                <input type="number" placeholder="Impact" value={form.impact} onChange={(e) => setForm({ ...form, impact: e.target.value })} className="h-10 rounded-md border border-input bg-background px-3" />
                <input type="number" placeholder="Probability" value={form.probability} onChange={(e) => setForm({ ...form, probability: e.target.value })} className="h-10 rounded-md border border-input bg-background px-3" />
                <input placeholder="Mitigation" value={form.mitigation} onChange={(e) => setForm({ ...form, mitigation: e.target.value })} className="h-10 rounded-md border border-input bg-background px-3 md:col-span-2" />
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="h-10 rounded-md border border-input bg-background px-3 md:col-span-2">
                  <option value="Active">Active</option>
                  <option value="Monitoring">Monitoring</option>
                  <option value="Mitigating">Mitigating</option>
                </select>
                <div className="md:col-span-2 flex gap-2">
                  <Button type="submit" className="bg-[#16a34a] hover:bg-[#15803d] text-white">Save Risk</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Total Risks</span>
                <p className="text-3xl font-bold text-foreground">{risks.length}</p>
                <p className="text-xs text-muted-foreground">Identified risks</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Critical</span>
                <p className="text-3xl font-bold text-red-600">{criticalCount}</p>
                <p className="text-xs text-red-500">Immediate action needed</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">High</span>
                <p className="text-3xl font-bold text-orange-600">{highCount}</p>
                <p className="text-xs text-orange-500">Close monitoring</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Trend</span>
                <p className="text-3xl font-bold text-foreground flex items-center gap-1"><TrendingDown className="w-5 h-5 text-green-600" />12%</p>
                <p className="text-xs text-green-600">Overall risk decreased</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Risk Heat Map</CardTitle>
            <CardDescription>Probability vs Impact analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="probability" name="Probability" type="number" domain={[0, 5]} label={{ value: 'Probability', position: 'insideBottomRight', offset: -5 }} stroke="#9ca3af" />
                <YAxis dataKey="impact" name="Impact" type="number" domain={[0, 5]} label={{ value: 'Impact', angle: -90, position: 'insideLeft' }} stroke="#9ca3af" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} formatter={(value, name, props) => name === 'name' ? props.payload.name : value} />
                <Scatter name="Risks" data={risks} fill="#16a34a" onClick={(data) => setSelectedRisk(data.id)} />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Risk Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="critical" stackId="a" fill="#ef4444" />
                <Bar dataKey="high" stackId="a" fill="#f97316" />
                <Bar dataKey="medium" stackId="a" fill="#eab308" />
                <Bar dataKey="low" stackId="a" fill="#84cc16" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Risk Register</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {risks.map((risk) => (
                <div key={risk.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-orange-500" />{risk.name}</h3>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">{risk.category}</Badge>
                        <Badge className={`text-xs ${getRiskColor(risk.probability, risk.impact)}`}>{getRiskSeverity(risk.probability, risk.impact)}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-3">
                    <div>
                      <p className="text-muted-foreground">Impact</p>
                      <p className="font-medium">{risk.impact}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Mitigation Strategy</p>
                      <p className="font-medium text-xs">{risk.mitigation}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="font-medium">{risk.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
