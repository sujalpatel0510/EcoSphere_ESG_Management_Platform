'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertCircle, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[#16a34a]/20 blur-xl rounded-full" />
            <AlertCircle className="w-20 h-20 text-[#16a34a] relative" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        <div className="flex gap-3 flex-col sm:flex-row pt-4">
          <Link href="/" className="flex-1">
            <Button
              variant="outline"
              className="w-full gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
          <Link href="/dashboard" className="flex-1">
            <Button className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white gap-2">
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Button>
          </Link>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Need help? Here are some useful links:
          </p>
          <div className="space-y-2">
            <Link href="/dashboard" className="block">
              <span className="text-[#16a34a] hover:text-[#15803d] text-sm font-medium">
                Go to Dashboard
              </span>
            </Link>
            <Link href="/login" className="block">
              <span className="text-[#16a34a] hover:text-[#15803d] text-sm font-medium">
                Back to Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
