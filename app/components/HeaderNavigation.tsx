'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/app/components/ui/Button';
import { ThemeToggle } from '@/app/components/theme-toggle';
import { LogOut } from 'lucide-react';

/**
  * Header navigation component with OpenAI-inspired design
  * Shows different UI for authenticated vs unauthenticated users
  */
export default function HeaderNavigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = typeof window !== 'undefined' ? createClient() : null

  useEffect(() => {
    if (!supabase) return

    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
      setIsLoading(false)
    }

    checkAuth()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session?.user)
    })

    return () => subscription?.unsubscribe()
  }, [supabase])

  const handleSignOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/60 backdrop-blur-2xl">
        <div className="container mx-auto px-6 max-w-7xl h-18" />
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/60 backdrop-blur-2xl animate-fadeIn">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-18">
          {/* Logo and branding */}
          <Link href={isAuthenticated ? '/dashboard' : '/'}>
            <div className="flex items-center space-x-4 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-white font-bold text-base">V</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  VeoFlow
                </h1>
              </div>
            </div>
          </Link>

          {/* Navigation - show for all users */}
          <nav className="hidden md:flex items-center space-x-10">
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative group">
              Products
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative group">
              Solutions
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative group">
              Docs
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative group">
              Pricing
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Unauthenticated user actions */}
            {!isAuthenticated && (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm" className="hidden md:flex hover-lift font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="hover-lift bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl font-medium">
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            {/* Authenticated user actions */}
            {isAuthenticated && (
              <Button
                onClick={handleSignOut}
                variant="ghost"
                size="sm"
                className="hidden md:flex hover-lift font-medium gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            )}

            {/* Mobile menu button */}
            <button className="md:hidden p-3 rounded-xl hover:bg-accent/50 transition-all duration-300">
              <span className="sr-only">Menu</span>
              <div className="w-5 h-0.5 bg-foreground mb-1.5 transition-all duration-300"></div>
              <div className="w-5 h-0.5 bg-foreground mb-1.5 transition-all duration-300"></div>
              <div className="w-5 h-0.5 bg-foreground transition-all duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}