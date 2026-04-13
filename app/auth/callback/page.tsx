'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    const handleLogin = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error(error)
        return
      }

      if (data.session) {
        // user logged in successfully
        router.push('/') // redirect to homepage
      }
    }

    handleLogin()
  }, [])

  return <p>Logging you in...</p>
}