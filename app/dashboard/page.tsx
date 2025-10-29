'use client'

import { useEffect, useState } from 'react'

// Force dynamic rendering to avoid static generation issues
export const dynamic = 'force-dynamic'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/Card'
import UrlInputForm from '@/app/components/UrlInputForm'

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
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Hello{' '}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {profile?.username || profile?.first_name || user?.email || 'User'}
              </span>
              !
            </h2>
            <p className="text-lg text-muted-foreground">
              Ready to transform your product collection into professional videos?
            </p>
          </div>

          {/* URL Input Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Start New Video Generation</CardTitle>
              <CardDescription>
                Enter a product collection URL to begin generating AI-powered model videos for your products.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UrlInputForm />
            </CardContent>
          </Card>

          {/* Recent Jobs Section (placeholder for future) */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Jobs</CardTitle>
              <CardDescription>
                View the status of your recent video generation jobs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>No jobs yet. Start by entering a collection URL above.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}