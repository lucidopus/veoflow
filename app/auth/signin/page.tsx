'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/app/components/ui/Button'
import { Input } from '@/app/components/ui/Input'
import { Label } from '@/app/components/ui/Label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/Card'

function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = typeof window !== 'undefined' ? createClient() : null

  useEffect(() => {
    const messageParam = searchParams.get('message')
    if (messageParam) {
      setMessage(messageParam)
      // Auto-dismiss success message after 5 seconds
      const timer = setTimeout(() => {
        setMessage('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) return

    setIsLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else if (data.user) {
        // Redirect to dashboard
        router.push('/dashboard')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Sign in to your VeoFlow account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {message && (
            <div className="mb-4 text-sm text-green-600 bg-green-50 dark:bg-green-950/50 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-lg p-4 backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300">
              {message}
            </div>
          )}
          <form onSubmit={handleSignIn} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200"
                required
              />
            </div>
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg p-4 backdrop-blur-sm">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don&apos;t have an account? </span>
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Force dynamic rendering to avoid static generation issues
export const dynamic = 'force-dynamic'

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignInForm />
    </Suspense>
  )
}