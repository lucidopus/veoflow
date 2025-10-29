'use client'

import { useEffect, useState } from 'react'

// Force dynamic rendering to avoid static generation issues
export const dynamic = 'force-dynamic'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function DashboardPage() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [profile, setProfile] = useState<{ first_name?: string; last_name?: string; username?: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = typeof window !== 'undefined' ? createClient() : null

  useEffect(() => {
    if (!supabase) return

    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/signin')
        return
      }
      setUser(user)

      // Fetch user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name, username')
        .eq('id', user.id)
        .single()

      setProfile(profile)
      setIsLoading(false)
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.push('/auth/signin')
      } else {
        setUser(session.user)
        // Refetch profile on auth change
        if (session.user) {
          supabase
            .from('profiles')
            .select('first_name, last_name, username')
            .eq('id', session.user.id)
            .single()
            .then(({ data }) => setProfile(data))
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [router, supabase])


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <h2 className="text-3xl font-bold">
        Hello{' '}
        <span className="bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          {profile?.username || profile?.first_name || user?.email || 'User'}
        </span>
        !
      </h2>
    </div>
  )
}