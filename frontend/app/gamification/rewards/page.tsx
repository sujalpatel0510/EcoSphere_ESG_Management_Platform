'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AppLayout } from '@/components/layout/app-layout'
import { Gift, Coins, Plus, ShoppingCart, Check } from 'lucide-react'

const rewards = [
  {
    id: 1,
    name: 'Coffee Shop Voucher',
    description: '$10 voucher for company cafeteria',
    points: 100,
    icon: '☕',
    available: 45,
    redeemed: 156,
    status: 'Available',
  },
  {
    id: 2,
    name: 'Extra Day Off',
    description: 'One paid day off to use anytime',
    points: 500,
    icon: '🏖️',
    available: 12,
    redeemed: 23,
    status: 'Available',
  },
  {
    id: 3,
    name: 'Fitness Membership',
    description: '3-month gym membership',
    points: 750,
    icon: '💪',
    available: 8,
    redeemed: 5,
    status: 'Available',
  },
  {
    id: 4,
    name: 'Tech Gadget',
    description: 'AirPods Pro or equivalent',
    points: 1000,
    icon: '🎧',
    available: 3,
    redeemed: 2,
    status: 'Limited Stock',
  },
  {
    id: 5,
    name: 'Travel Voucher',
    description: '$500 towards travel',
    points: 1500,
    icon: '✈️',
    available: 2,
    redeemed: 1,
    status: 'Limited Stock',
  },
  {
    id: 6,
    name: 'Charity Donation',
    description: 'Donation in your name',
    points: 200,
    icon: '❤️',
    available: 999,
    redeemed: 67,
    status: 'Always Available',
  },
]

const redemptionHistory = [
  {
    id: 1,
    user: 'Sarah Chen',
    reward: 'Extra Day Off',
    points: 500,
    date: '2024-06-10',
    status: 'Redeemed',
  },
  {
    id: 2,
    user: 'James Mitchell',
    reward: 'Coffee Shop Voucher',
    points: 100,
    date: '2024-06-09',
    status: 'Redeemed',
  },
  {
    id: 3,
    user: 'Priya Sharma',
    reward: 'Fitness Membership',
    points: 750,
    date: '2024-06-08',
    status: 'Pending',
  },
  {
    id: 4,
    user: 'Michael Rodriguez',
    reward: 'Coffee Shop Voucher',
    points: 100,
    date: '2024-06-07',
    status: 'Redeemed',
  },
  {
    id: 5,
    user: 'Emma Thompson',
    reward: 'Charity Donation',
    points: 200,
    date: '2024-06-06',
    status: 'Redeemed',
  },
]

export default function RewardsPage() {
  const [selectedReward, setSelectedReward] = useState<number | null>(null)
  const userPoints = 2850

  const totalRedeemed = redemptionHistory.filter(
    (r) => r.status === 'Redeemed'
  ).length

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Rewards</h1>
            <p className="text-muted-foreground mt-1">
              Redeem your points for rewards
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white gap-2">
                <Plus className="w-4 h-4" />
                Add Reward
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Reward</DialogTitle>
                <DialogDescription>
                  Create a new reward for team members
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Reward Name</label>
                  <input
                    placeholder="e.g., Wireless Earbuds"
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    placeholder="Describe the reward"
                    className="w-full px-3 py-2 rounded-md border border-input bg-background"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Points Required</label>
                  <input
                    type="number"
                    placeholder="e.g., 500"
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                  />
                </div>
                <Button className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white">
                  Add Reward
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* User Points Card */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-[#16a34a]/10 to-[#2563eb]/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Your Points</p>
                <p className="text-4xl font-bold text-[#16a34a] mt-2">
                  {userPoints}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Enough for{' '}
                  <span className="font-semibold text-foreground">
                    1 Extra Day Off +  Coffee Voucher
                  </span>
                </p>
              </div>
              <Coins className="w-16 h-16 text-[#16a34a] opacity-20" />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Total Rewards
                </span>
                <p className="text-3xl font-bold text-foreground">
                  {rewards.length}
                </p>
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Total Redeemed
                </span>
                <p className="text-3xl font-bold text-foreground">
                  {rewards.reduce((sum, r) => sum + r.redeemed, 0)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {totalRedeemed} this month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Most Popular
                </span>
                <p className="text-lg font-bold text-foreground">
                  Coffee Voucher
                </p>
                <p className="text-xs text-muted-foreground">156 redeemed</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Participation
                </span>
                <p className="text-3xl font-bold text-foreground">87%</p>
                <p className="text-xs text-green-600">Of team</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rewards Grid */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Available Rewards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <Card
                key={reward.id}
                className={`border-0 shadow-sm hover:shadow-md transition cursor-pointer ${
                  selectedReward === reward.id ? 'ring-2 ring-[#16a34a]' : ''
                }`}
                onClick={() => setSelectedReward(reward.id)}
              >
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="text-4xl">{reward.icon}</div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {reward.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {reward.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <Coins className="w-4 h-4 text-[#16a34a]" />
                        <span className="font-semibold text-foreground">
                          {reward.points}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          reward.status === 'Available'
                            ? 'bg-green-100 text-green-700'
                            : reward.status === 'Limited Stock'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-blue-100 text-blue-700'
                        }
                      >
                        {reward.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {reward.available} available •{' '}
                      {reward.redeemed} redeemed
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white gap-2"
                          disabled={userPoints < reward.points}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          {userPoints >= reward.points
                            ? 'Redeem'
                            : 'Not Enough Points'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Redeem Reward</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">
                              You are about to redeem:
                            </p>
                            <p className="text-xl font-bold text-foreground mt-2">
                              {reward.name}
                            </p>
                            <div className="flex items-center gap-2 mt-3">
                              <Coins className="w-4 h-4 text-[#16a34a]" />
                              <span className="font-semibold">
                                {reward.points} points
                              </span>
                            </div>
                          </div>
                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-900">
                              Your remaining balance will be{' '}
                              <span className="font-bold">
                                {userPoints - reward.points} points
                              </span>
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => {}}
                            >
                              Cancel
                            </Button>
                            <Button className="flex-1 bg-[#16a34a] hover:bg-[#15803d] text-white gap-2">
                              <Check className="w-4 h-4" />
                              Confirm Redemption
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Redemption History */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Redemption History</CardTitle>
            <CardDescription>
              Recent reward redemptions by team members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {redemptionHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition"
                >
                  <div>
                    <p className="font-semibold text-foreground">
                      {item.user}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Redeemed {item.reward}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Coins className="w-4 h-4 text-[#16a34a]" />
                      <span className="font-semibold">{item.points}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {item.date}
                      </p>
                      <Badge
                        variant="outline"
                        className={
                          item.status === 'Redeemed'
                            ? 'bg-green-100 text-green-700 mt-1'
                            : 'bg-yellow-100 text-yellow-700 mt-1'
                        }
                      >
                        {item.status}
                      </Badge>
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
