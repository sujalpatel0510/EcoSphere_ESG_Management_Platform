'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  Leaf,
  Users,
  FileText,
  Settings,
  ChevronDown,
  Menu,
  X,
  Zap,
  Trophy,
  Lock,
  TrendingUp,
  Target,
  Briefcase,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href?: string
  icon: React.ReactNode
  children?: NavItem[]
}

const navigationItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <BarChart3 size={20} />,
  },
  {
    label: 'Environmental',
    icon: <Leaf size={20} />,
    children: [
      { label: 'Emission Factors', href: '/environmental/emission-factors' },
      { label: 'Environmental Goals', href: '/environmental/goals' },
      { label: 'Product ESG Profiles', href: '/environmental/product-profiles' },
      { label: 'Carbon Transactions', href: '/environmental/carbon-transactions' },
    ],
  },
  {
    label: 'Social',
    icon: <Users size={20} />,
    children: [
      { label: 'CSR Initiatives', href: '/social/csr-initiatives' },
      { label: 'Employee Engagement', href: '/social/employee-engagement' },
      { label: 'Diversity & Inclusion', href: '/social/diversity-inclusion' },
    ],
  },
  {
    label: 'Governance',
    icon: <Lock size={20} />,
    children: [
      { label: 'Policies & Compliance', href: '/governance/policies-compliance' },
      { label: 'Board Members', href: '/governance/board-members' },
      { label: 'Risk Management', href: '/governance/risk-management' },
      { label: 'Audits', href: '/governance/audits' },
    ],
  },
  {
    label: 'Gamification',
    icon: <Trophy size={20} />,
    children: [
      { label: 'Challenges', href: '/gamification/challenges' },
      { label: 'Badges & Achievements', href: '/gamification/badges-achievements' },
      { label: 'Leaderboard', href: '/gamification/leaderboard' },
      { label: 'Rewards', href: '/gamification/rewards' },
    ],
  },
  {
    label: 'Reports',
    icon: <FileText size={20} />,
    children: [
      { label: 'Environmental Report', href: '/reports/environmental' },
      { label: 'Social Report', href: '/reports/social' },
      { label: 'Governance Report', href: '/reports/governance' },
      { label: 'ESG Summary', href: '/reports/summary' },
      { label: 'Custom Report Builder', href: '/reports/custom' },
    ],
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings size={20} />,
  },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(['Environmental'])

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    )
  }

  const isActive = (href?: string) => {
    if (!href) return false
    return pathname === href || pathname.startsWith(href + '/')
  }

  const renderNavItem = (item: NavItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.label)
    const active = isActive(item.href)

    return (
      <div key={item.label}>
        {hasChildren ? (
          <button
            onClick={() => toggleExpanded(item.label)}
            className={cn(
              'w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-colors',
              'hover:bg-accent dark:hover:bg-accent/50',
              isExpanded && 'bg-accent/50'
            )}
          >
            <div className="flex items-center gap-3">
              <div className="text-muted-foreground">{item.icon}</div>
              <span>{item.label}</span>
            </div>
            <ChevronDown
              size={16}
              className={cn(
                'transition-transform',
                isExpanded && 'rotate-180'
              )}
            />
          </button>
        ) : (
          <Link
            href={item.href || '#'}
            onClick={onClose}
            className={cn(
              'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all',
              active
                ? 'bg-[#16a34a]/10 text-[#16a34a] font-semibold'
                : 'text-foreground hover:bg-accent'
            )}
          >
            <div className={cn(active && 'text-[#16a34a]')}>{item.icon}</div>
            <span>{item.label}</span>
          </Link>
        )}

        {hasChildren && isExpanded && (
          <div className="ml-6 space-y-1 mt-1 border-l border-border pl-4">
            {item.children.map((child) => (
              <Link
                key={child.label}
                href={child.href || '#'}
                onClick={onClose}
                className={cn(
                  'block px-4 py-2 text-sm rounded-lg transition-all',
                  isActive(child.href)
                    ? 'text-[#16a34a] font-semibold bg-[#16a34a]/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                )}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50 overflow-y-auto transition-transform lg:relative lg:z-0 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="sticky top-0 bg-sidebar border-b border-sidebar-border p-6 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold">
            <Leaf className="text-[#16a34a]" size={24} />
            <span className="text-lg">EcoSphere</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-6 space-y-2">
          {navigationItems.map((item) => renderNavItem(item))}
        </nav>
      </aside>
    </>
  )
}
