'use client';

import HeaderNavigation from './components/HeaderNavigation';
import HeroSection from './components/HeroSection';
import UrlInputForm from './components/UrlInputForm';
import ExampleCollections from './components/ExampleCollections';
import FAQSection from './components/FAQSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderNavigation />

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