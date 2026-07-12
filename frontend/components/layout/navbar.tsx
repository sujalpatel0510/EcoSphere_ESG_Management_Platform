'use client'

import React, { useState } from 'react'
import { Menu, Bell, Search, Moon, Sun, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface NavbarProps {
  onMenuClick: () => void
  isDarkMode: boolean
  onDarkModeToggle: () => void
}

export function Navbar({
  onMenuClick,
  isDarkMode,
  onDarkModeToggle,
}: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [notifications] = useState([
    { id: 1, message: 'New compliance issue assigned', time: '2 min ago' },
    { id: 2, message: 'Policy acknowledgement reminder', time: '1 hour ago' },
    { id: 3, message: 'CSR activity approved', time: '3 hours ago' },
  ])

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    window.location.href = '/login'
  }

  return (
    <nav className="sticky top-0 z-40 w-full bg-background border-b border-border shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 gap-4">
        {/* Left section */}
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu size={20} />
          </Button>
          <div className="hidden md:block flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search..."
                className="pl-10 bg-accent/50"
              />
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onDarkModeToggle}
            className="text-muted-foreground hover:text-foreground"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowNotifications(!showNotifications)
                setShowProfile(false)
              }}
              className="relative text-muted-foreground hover:text-foreground"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#f97316] rounded-full"></span>
            </Button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="px-4 py-3 border-b border-border/50 hover:bg-accent/50 cursor-pointer transition-colors"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {notif.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notif.time}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border text-center">
                  <button className="text-sm text-[#16a34a] hover:underline">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowProfile(!showProfile)
                setShowNotifications(false)
              }}
              className="flex items-center gap-2 px-3 text-muted-foreground hover:text-foreground"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#16a34a] to-[#2563eb] flex items-center justify-center">
                <span className="text-white text-sm font-semibold">JD</span>
              </div>
            </Button>

            {/* Profile dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-border">
                  <p className="font-semibold text-sm">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@company.com</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent rounded-lg transition-colors">
                    <User size={16} />
                    Profile Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
