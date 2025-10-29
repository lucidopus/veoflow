import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import HeroSection from './components/HeroSection'
import UrlInputForm from './components/UrlInputForm'
import ExampleCollections from './components/ExampleCollections'
import FAQSection from './components/FAQSection'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect authenticated users to dashboard
  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content with smooth transitions */}
      <main className="relative">
        {/* Call to Action Section for Unauthenticated Users */}
        <section className="relative py-24 md:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background/95"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.03),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.02),transparent_50%)]"></div>

          <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Ready to get started?
            </h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed mb-8">
              Create your account to start generating professional product videos with AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup" className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden cursor-pointer h-12 px-8 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25">
                Get Started Free
              </Link>
              <Link href="/auth/signin" className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden cursor-pointer h-12 px-8 py-2.5 border-2 border-border bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary/50">
                Sign In
              </Link>
            </div>
          </div>
        </section>

        {/* Example Collections - Enhanced background */}
        <section className="relative py-24 md:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.01)_25%,transparent_25%,transparent_75%,rgba(59,130,246,0.01)_75%)] bg-[length:20px_20px]"></div>

          <div className="relative z-10 container mx-auto px-6 max-w-6xl">
            <ExampleCollections />
          </div>
        </section>

        {/* FAQ Section - Clean background */}
        <section className="relative py-24 md:py-36">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/10"></div>

          <div className="relative z-10 container mx-auto px-6 max-w-4xl">
            <FAQSection />
          </div>
        </section>
      </main>
    </div>
  )
   return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content with smooth transitions */}
      <main className="relative">
        {/* URL Input Section - Enhanced with gradient background */}
        <section className="relative py-24 md:py-36 overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background/95"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.03),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.02),transparent_50%)]"></div>

          <div className="relative z-10 container mx-auto px-6 max-w-4xl">
            <UrlInputForm />
          </div>
        </section>

        {/* Example Collections - Enhanced background */}
        <section className="relative py-24 md:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.01)_25%,transparent_25%,transparent_75%,rgba(59,130,246,0.01)_75%)] bg-[length:20px_20px]"></div>

          <div className="relative z-10 container mx-auto px-6 max-w-6xl">
            <ExampleCollections />
          </div>
        </section>

        {/* FAQ Section - Clean background */}
        <section className="relative py-24 md:py-36">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/10"></div>

          <div className="relative z-10 container mx-auto px-6 max-w-4xl">
            <FAQSection />
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative py-16 border-t border-border/20 bg-gradient-to-t from-muted/20 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02),transparent)]"></div>
        <div className="relative z-10 container mx-auto px-6 max-w-6xl">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-lg font-semibold">VeoFlow</span>
            </div>
            <p className="text-muted-foreground mb-8 font-light">
              © {new Date().getFullYear()} VeoFlow - AI Product Video Automation
            </p>
            <div className="flex justify-center space-x-10">
              <a href="/docs" className="text-muted-foreground hover:text-foreground transition-all duration-300">
                Documentation
              </a>
              <a href="https://github.com" className="text-muted-foreground hover:text-foreground transition-all duration-300">
                GitHub
              </a>
              <a href="/support" className="text-muted-foreground hover:text-foreground transition-all duration-300">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}