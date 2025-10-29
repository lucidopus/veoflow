/**
 * Footer component with links and branding
 */
export default function Footer() {
  return (
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
  );
}