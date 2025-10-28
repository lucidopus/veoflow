import { Button } from '@/app/components/ui/Button';

/**
  * Hero section component with OpenAI-inspired design
  */
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Enhanced gradient background with smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.01]"></div>

      <div className="relative z-10 text-center py-24 md:py-40">
        <div className="max-w-5xl mx-auto px-6">
          {/* Main headline with enhanced gradient text effect */}
          <h1 className="text-6xl md:text-8xl font-bold mb-10 animate-slideUp leading-[0.9] tracking-tight">
            Turn photos into
            <br />
            <span className="gradient-text bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              professional videos
            </span>
          </h1>

          {/* Enhanced value proposition */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-3xl mx-auto animate-slideUp animation-delay-100 leading-relaxed font-light">
            Transform your product catalog into engaging videos that show how clothes fit and move naturally.
            Save thousands on production costs while increasing conversion rates.
          </p>

          {/* Enhanced call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slideUp animation-delay-200">
            <Button size="lg" className="px-10 py-5 text-lg font-medium hover-lift bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="px-10 py-5 text-lg font-medium hover-lift border-2 hover:bg-accent/50 transition-all duration-300">
              Watch Demo
            </Button>
          </div>

          {/* Enhanced trust indicators */}
          <div className="mt-20 animate-fadeIn animation-delay-300">
            <p className="text-sm text-muted-foreground/80 mb-6 font-medium">Trusted by leading fashion brands</p>
            <div className="flex justify-center items-center space-x-12 opacity-70">
              <div className="text-sm font-semibold tracking-wide">ZARA</div>
              <div className="text-sm font-semibold tracking-wide">H&M</div>
              <div className="text-sm font-semibold tracking-wide">UNIQLO</div>
              <div className="text-sm font-semibold tracking-wide">ASOS</div>
            </div>
          </div>
        </div>

        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/8 via-primary/4 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-primary/6 via-primary/3 to-transparent rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/3 via-transparent to-transparent rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
      </div>

      {/* Smooth transition element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
    </section>
  );
}