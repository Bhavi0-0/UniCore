'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginCard from "@/components/login-card"
import { supabase } from '@/lib/supabase'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (data.user) {
        router.push('/dashboard')
      } else {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  if (loading) {
    return <p className="text-center mt-10">Checking login...</p>
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      <div className="relative z-10">
        <LoginCard />
      </div>
    </main>
  )
}