'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [router])

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="inline-block animate-spin">
          <div className="h-12 w-12 border-4 border-[#16a34a] border-t-transparent rounded-full"></div>
        </div>
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </main>
  )
}
