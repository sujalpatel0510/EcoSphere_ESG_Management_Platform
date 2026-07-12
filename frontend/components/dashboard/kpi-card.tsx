import React from 'react'
import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: string | number
  unit?: string
  change?: number
  icon?: React.ReactNode
  color?: 'green' | 'blue' | 'purple' | 'orange'
  description?: string
  trend?: 'up' | 'down' | 'neutral'
}

const colorClasses = {
  green: 'text-[#16a34a] bg-[#16a34a]/10',
  blue: 'text-[#2563eb] bg-[#2563eb]/10',
  purple: 'text-[#7c3aed] bg-[#7c3aed]/10',
  orange: 'text-[#f97316] bg-[#f97316]/10',
}

export function KPICard({
  title,
  value,
  unit,
  change,
  icon,
  color = 'blue',
  description,
  trend,
}: KPICardProps) {
  const bgClass = colorClasses[color]

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all hover:border-primary/50 border border-border">
      <div className="p-6 bg-gradient-to-br from-card to-card/50">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-foreground">{value}</h3>
              {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            </div>
          </div>
          {icon && (
            <div className={cn('p-3 rounded-lg', bgClass)}>
              {icon}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {change !== undefined && (
            <div
              className={cn(
                'flex items-center gap-1 text-sm font-semibold',
                trend === 'up' && 'text-green-600',
                trend === 'down' && 'text-red-600',
                trend === 'neutral' && 'text-slate-600'
              )}
            >
              {trend === 'up' && <TrendingUp size={16} />}
              {trend === 'down' && <TrendingDown size={16} />}
              {Math.abs(change)}%
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
