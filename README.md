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

Open [http://localhost:3000](http://localhost:3000) to see the application.

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
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── docs/
│   ├── PROJECT_PLAN.md    # Product vision and requirements
│   └── dev_rules/
│       └── ui_rules.md    # UI/UX design system
├── CLAUDE.md              # Developer guidance for Claude Code
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

## Documentation

- **[PROJECT_PLAN.md](docs/PROJECT_PLAN.md)** - Complete product vision, user experience goals, and success metrics
- **[UI Rules](docs/dev_rules/ui_rules.md)** - Comprehensive UI/UX design system and component guidelines
- **[CLAUDE.md](CLAUDE.md)** - Technical architecture and developer guidance

## Development Workflow

This project follows a research-first approach:

1. **Design System Implementation** - OKLCH colors, semantic tokens, Tailwind setup
2. **UI Components** - Reusable components following ui_rules.md
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

- All UI must follow the design system in `docs/dev_rules/ui_rules.md`
- Use OKLCH color space for all color definitions
- Support both light and dark modes
- Long-running tasks must use Trigger.dev (not API routes)
- Never execute `supabase db reset` without explicit approval

## Project Status

🚧 **Early Development** - Currently implementing design system and core UI components.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Trigger.dev Documentation](https://trigger.dev/docs)
- [Supabase Documentation](https://supabase.com/docs)

## License

Private project - All rights reserved
