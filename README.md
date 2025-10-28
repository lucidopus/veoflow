# VeoFlow

AI-powered product video automation for e-commerce. Transform static product photos into professional model videos showing fit and movement.

## What is VeoFlow?

VeoFlow automates the creation of product videos for fashion e-commerce catalogs. It scrapes product images from collection pages and uses Google's Veo 3.1 AI to generate professional model videos that show how clothes fit and move - replacing expensive $30K+ photoshoots while increasing conversion rates.

**Key Features:**
- Automated product catalog scraping
- AI-generated model videos (8-second seamless loops)
- Batch processing for entire collections
- Web-based dashboard and management
- Real-time progress tracking

## Tech Stack

- **Frontend & Backend**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 with OKLCH colors
- **Database**: Supabase (PostgreSQL)
- **Task Orchestration**: Trigger.dev
- **AI Services**:
  - Firecrawl (web scraping)
  - Google Gemini API (Veo 3.1 for video, Nano Banana for image enhancement)

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn 

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your API keys to .env.local
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to launch the app.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
veoflow/
├── app/                    # Next.js App Router
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ...
│   │   ├── HeaderNavigation.tsx
│   │   ├── HeroSection.tsx
│   │   ├── UrlInputForm.tsx
│   │   └── ...
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Landing page
│   ├── globals.css        # Global styles & animations
│   └── lib/
│       └── theme-provider.tsx
└── package.json
```

## Environment Variables

Create a `.env.local` file with:

```env
FIRECRAWL_API_KEY=your_firecrawl_key
GOOGLE_GENAI_API_KEY=your_google_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
TRIGGER_DEV_PROJECT_TOKEN=your_trigger_token
```

## Development Workflow

This project follows a research-first approach:

1. **Design System Implementation** - OKLCH colors, semantic tokens, Tailwind setup
2. **UI Components** - Reusable components with consistent styling
3. **API Research** - Deep dive into Firecrawl and Google Gemini capabilities
4. **Integration** - Implement based on research findings
5. **Orchestration** - Trigger.dev tasks for long-running operations

## Design Philosophy

- **Web-only interface** - No external messaging platforms
- **Mobile-first** - Progressive enhancement for larger screens
- **Accessibility** - WCAG AA compliance minimum
- **TypeScript strict mode** - Fully typed codebase
- **Research before implementation** - No assumptions about external APIs

## Key Constraints

- Use OKLCH color space for all color definitions
- Support both light and dark modes
- Long-running tasks must use Trigger.dev (not API routes)
- Never execute `supabase db reset` without explicit approval

## Project Status

✅ **Phases 1-2 Complete** - Design system and landing page fully implemented.

**Completed:**
- ✅ Phase 1: Design System & Foundation (OKLCH colors, 7 UI components, dark mode)
- ✅ Phase 2: Landing Page & Core UI Layout (Hero, URL input, examples, FAQ, responsive)

**Next:** Phase 3 (Supabase Database & Schema) - Ready to begin backend implementation.

## Current Implementation

The application currently features a complete landing page with:

- **Professional Design System**: OKLCH color palette, dark/light mode toggle, smooth animations
- **Landing Page**: Hero section, URL input form with validation, example collections, FAQ accordion
- **Responsive Design**: Mobile-first approach, works on all screen sizes
- **Accessibility**: WCAG AA compliant, keyboard navigation, screen reader support
- **Component Library**: 7 reusable UI components (Button, Card, Input, Badge, Toast, Label, etc.)

**Try it out:**
```bash
npm run dev
# Visit http://localhost:3000
```

The UI is production-ready and follows all design system guidelines. Backend integration (database, scraping, video generation) will be implemented in upcoming phases.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Trigger.dev Documentation](https://trigger.dev/docs)
- [Supabase Documentation](https://supabase.com/docs)

## License

Private project - All rights reserved
