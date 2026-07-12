'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AppLayout } from '@/components/layout/app-layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bell, Lock, Users, Palette, Save, Mail, Smartphone } from 'lucide-react'

const STORAGE_KEY = 'ecosphere-settings'

const notificationDefaults = [
  { title: 'Email Notifications', description: 'Receive email updates', icon: Mail, enabled: true },
  { title: 'SMS Notifications', description: 'Receive SMS alerts', icon: Smartphone, enabled: false },
  { title: 'Weekly Report', description: 'Get weekly ESG summary', enabled: true },
  { title: 'Challenge Updates', description: 'Notifications about new challenges', enabled: true },
  { title: 'Achievement Alerts', description: 'When you earn badges', enabled: true },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState({ firstName: 'John', lastName: 'Doe', email: 'john.doe@company.com', jobTitle: 'ESG Manager', department: 'Sustainability' })
  const [security, setSecurity] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [notifications, setNotifications] = useState(notificationDefaults)
  const [organization, setOrganization] = useState({ organizationName: 'Acme Corporation', industry: 'Technology', companySize: '201-1000 employees' })
  const [appearance, setAppearance] = useState({ theme: 'System', primaryColor: '#16a34a', animations: true, compactSidebar: false })
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return
    try {
      const parsed = JSON.parse(saved)
      if (parsed?.profile) setProfile(parsed.profile)
      if (parsed?.security) setSecurity(parsed.security)
      if (parsed?.notifications) setNotifications(parsed.notifications)
      if (parsed?.organization) setOrganization(parsed.organization)
      if (parsed?.appearance) setAppearance(parsed.appearance)
    } catch {
      // ignore malformed data
    }
  }, [])

  const persistSettings = (patch: Record<string, unknown>) => {
    const next = { profile, security, notifications, organization, appearance, ...patch }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    }
    setStatusMessage('Settings saved successfully')
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
        </div>

        {statusMessage && <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{statusMessage}</div>}

        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-muted">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b">
                  <div className="w-16 h-16 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-xl font-bold">JD</div>
                  <Button variant="outline">Change Avatar</Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-sm font-medium">First Name</label><Input value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} /></div>
                  <div className="space-y-2"><label className="text-sm font-medium">Last Name</label><Input value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} /></div>
                </div>
                <div className="space-y-2"><label className="text-sm font-medium">Email Address</label><Input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Job Title</label><Input value={profile.jobTitle} onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })} /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Department</label><select value={profile.department} onChange={(e) => setProfile({ ...profile, department: e.target.value })} className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"><option>Sustainability</option><option>Operations</option><option>Strategy</option><option>HR</option></select></div>
                <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white gap-2" onClick={() => persistSettings({ profile })}><Save className="w-4 h-4" />Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader><CardTitle className="flex items-center gap-2"><Lock className="w-5 h-5" />Security Settings</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2"><label className="text-sm font-medium">Current Password</label><Input type="password" value={security.currentPassword} onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })} placeholder="••••••••" /></div>
                <div className="space-y-2"><label className="text-sm font-medium">New Password</label><Input type="password" value={security.newPassword} onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })} placeholder="••••••••" /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Confirm New Password</label><Input type="password" value={security.confirmPassword} onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })} placeholder="••••••••" /></div>
                <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white gap-2" onClick={() => persistSettings({ security })}><Save className="w-4 h-4" />Update Password</Button>
                <div className="pt-6 border-t space-y-4"><h3 className="font-semibold text-foreground">Two-Factor Authentication</h3><p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p><Button variant="outline">Enable 2FA</Button></div>
                <div className="pt-6 border-t space-y-4"><h3 className="font-semibold text-foreground">Active Sessions</h3><div className="space-y-2"><div className="flex items-center justify-between p-3 border border-border rounded-lg"><div><p className="font-medium text-sm">Chrome on Mac</p><p className="text-xs text-muted-foreground">Last active: 2 hours ago</p></div><Badge className="bg-green-100 text-green-700">Current</Badge></div><div className="flex items-center justify-between p-3 border border-border rounded-lg"><div><p className="font-medium text-sm">Safari on iPhone</p><p className="text-xs text-muted-foreground">Last active: 3 days ago</p></div><Button variant="outline" size="sm">Sign Out</Button></div></div></div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5" />Notification Preferences</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">{notifications.map((item, index) => (
                  <div key={`${item.title}-${index}`} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div><p className="font-medium text-foreground">{item.title}</p><p className="text-sm text-muted-foreground">{item.description}</p></div>
                    <input type="checkbox" checked={item.enabled} onChange={() => { const next = [...notifications]; next[index] = { ...next[index], enabled: !next[index].enabled }; setNotifications(next) }} className="w-5 h-5 rounded border-input" />
                  </div>
                ))}</div>
                <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white gap-2" onClick={() => persistSettings({ notifications })}><Save className="w-4 h-4" />Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="organization" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader><CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" />Organization Settings</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2"><label className="text-sm font-medium">Organization Name</label><Input value={organization.organizationName} onChange={(e) => setOrganization({ ...organization, organizationName: e.target.value })} /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Industry</label><select value={organization.industry} onChange={(e) => setOrganization({ ...organization, industry: e.target.value })} className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"><option>Technology</option><option>Manufacturing</option><option>Energy</option></select></div>
                <div className="space-y-2"><label className="text-sm font-medium">Company Size</label><select value={organization.companySize} onChange={(e) => setOrganization({ ...organization, companySize: e.target.value })} className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"><option>201-1000 employees</option><option>1001-5000 employees</option><option>5000+ employees</option></select></div>
                <div className="pt-6 border-t space-y-4"><h3 className="font-semibold text-foreground">Team Members</h3><div className="space-y-2"><div className="flex items-center justify-between p-3 border border-border rounded-lg"><div><p className="font-medium text-sm">Sarah Chen</p><p className="text-xs text-muted-foreground">Admin</p></div><Badge className="bg-purple-100 text-purple-700">Owner</Badge></div><div className="flex items-center justify-between p-3 border border-border rounded-lg"><div><p className="font-medium text-sm">James Mitchell</p><p className="text-xs text-muted-foreground">Editor</p></div><Button variant="outline" size="sm">Remove</Button></div></div><Button variant="outline" className="w-full">Invite Team Member</Button></div>
                <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white gap-2" onClick={() => persistSettings({ organization })}><Save className="w-4 h-4" />Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader><CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5" />Appearance Settings</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div><label className="text-sm font-medium mb-3 block">Theme</label><div className="flex gap-3">{['Light', 'Dark', 'System'].map((themeOption) => <Button key={themeOption} variant={themeOption === 'System' ? 'default' : 'outline'} className={themeOption === 'System' ? 'bg-[#16a34a] hover:bg-[#15803d] text-white' : ''} onClick={() => setAppearance({ ...appearance, theme: themeOption })}>{themeOption}</Button>)}</div></div>
                <div><label className="text-sm font-medium mb-3 block">Primary Color</label><div className="flex gap-3">{['#16a34a', '#2563eb', '#7c3aed', '#f97316'].map((color) => <button key={color} className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition" style={{ backgroundColor: color }} title={color} onClick={() => setAppearance({ ...appearance, primaryColor: color })} />)}</div></div>
                <div><label className="flex items-center gap-2"><input type="checkbox" checked={appearance.animations} onChange={(e) => setAppearance({ ...appearance, animations: e.target.checked })} className="w-4 h-4" /><span className="text-sm font-medium">Enable animations</span></label></div>
                <div><label className="flex items-center gap-2"><input type="checkbox" checked={appearance.compactSidebar} onChange={(e) => setAppearance({ ...appearance, compactSidebar: e.target.checked })} className="w-4 h-4" /><span className="text-sm font-medium">Compact sidebar</span></label></div>
                <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white gap-2" onClick={() => persistSettings({ appearance })}><Save className="w-4 h-4" />Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
