# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VeoFlow is an AI-powered product video automation system that transforms static e-commerce product photos into professional model videos. The system scrapes product catalogs, generates AI videos showing clothing fit and movement, and delivers seamless looping videos for fashion e-commerce businesses.

**Key Technologies:**
- Next.js 16 with App Router
- TypeScript (strict mode)
- React 19
- Tailwind CSS v4
- Planned integrations: Firecrawl (web scraping), Google Gemini API (Veo 3.1 for video generation, Nano Banana for image enhancement), Supabase (database), Trigger.dev (task orchestration)

## Development Commands

```bash
# Development server
npm run dev           # Start Next.js dev server at http://localhost:3000

# Production build
npm run build         # Build optimized production bundle
npm start             # Start production server

# Code quality
npm run lint          # Run ESLint on codebase
```

## Project Architecture

### Application Structure

This is a **Next.js App Router** application with the following structure:

```
app/
├── layout.tsx       # Root layout with Geist fonts
├── page.tsx         # Homepage (currently placeholder)
└── globals.css      # Global styles and Tailwind directives

docs/
├── PROJECT_PLAN.md  # Product vision and requirements
└── dev_rules/
    └── ui_rules.md  # Comprehensive UI/UX design system

tsconfig.json        # TypeScript config with @/* path alias
```

### Path Aliases

- `@/*` - Points to root directory (e.g., `@/app`, `@/components`)

### Design System

The project has a comprehensive UI design system documented in `docs/dev_rules/ui_rules.md`. **All UI development MUST follow these rules.** Key principles:

- **Color System**: Use OKLCH color space with semantic tokens
- **Typography**: Geist Sans for UI, Geist Mono for code, consistent type scale
- **Layout**: Mobile-first responsive design with Tailwind breakpoints
- **Components**: Accessible, animated, with clear variant patterns
- **Animations**: Spring-based motion with stagger effects for lists
- **Dark Mode**: All components must support light/dark variants
- **Accessibility**: WCAG AA compliance minimum, semantic HTML, ARIA attributes

Refer to `docs/dev_rules/ui_rules.md` for detailed specifications on colors, typography, spacing, components, animations, and accessibility requirements.

## Key Architectural Decisions

### No Telegram Bot Integration
The system is **web-only**. All user interactions happen through the Next.js web interface. Do not implement Telegram Bot API features.

### Task Orchestration Strategy
Long-running tasks (Firecrawl scraping, Veo video generation) will use **Trigger.dev** for:
- Durable execution beyond serverless timeouts
- Automatic retries on failure
- Cron scheduling for batch jobs
- Progress tracking and observability

### Database Strategy
**Supabase** (PostgreSQL) will handle:
- Job/task metadata storage
- Video generation results
- User data (if authentication is added)
- Real-time subscriptions for progress updates

## Implementation Guidelines

### When Building Features

1. **Check PROJECT_PLAN.md** - Understand the product vision before implementing features
2. **Follow ui_rules.md** - All UI components must adhere to the design system
3. **Mobile-first** - Start with mobile layouts, progressively enhance for larger screens
4. **TypeScript strict mode** - All code must be properly typed
5. **API Routes** - Place in `app/api/` using App Router conventions
6. **Trigger.dev tasks** - Long-running operations should be Trigger.dev tasks, not API routes

### External Service Integration

When integrating external APIs:

- **Firecrawl**: Requires deep research into API capabilities and patterns before implementation. Do not assume polling or any specific integration pattern.
- **Google Gemini API**: Requires research into Veo 3.1 and Nano Banana capabilities, API patterns, and best practices.
- **Supabase**: Use `@supabase/supabase-js` client library
- **Trigger.dev**: Initialize with `npx trigger.dev init`, create tasks in `trigger/` folder

### Environment Variables

Store all API keys in `.env.local`:
- `FIRECRAWL_API_KEY`
- `GOOGLE_GENAI_API_KEY` or Google Cloud credentials
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_KEY`
- `TRIGGER_DEV_PROJECT_TOKEN`

## Core Workflows

### Video Generation Pipeline (High-Level)
1. User submits product collection URL via web interface
2. API route triggers Firecrawl scraping task (via Trigger.dev)
3. Firecrawl extracts product images, stores metadata in Supabase
4. For each product, trigger Veo 3.1 video generation task
5. Handle async video generation (implementation pattern TBD after API research)
6. Store video URL and metadata in Supabase
7. Update UI with progress/completion status

**Note**: Specific implementation patterns for Firecrawl and Google Gemini APIs require thorough research before coding. Do not assume polling, webhooks, or any specific async pattern without investigating the actual API capabilities first.

### Seamless Looping Requirement
Videos must start and end with the original product photo for perfect loops. This may require specific prompting strategies for Veo 3.1.

## Important Constraints

### What This System Does NOT Need
- Telegram bot or messaging integrations
- Complex multi-tenancy (initially single user/admin)
- Video editing capabilities (AI generates final output)
- Payment processing (can be added later)

### User-Facing Constraints
Never execute `supabase db reset` without explicit user approval (per global CLAUDE.md rules).

## Next Steps for Development

The codebase is currently a fresh Next.js installation. Priority implementation order:

1. **Design System Setup** - Implement Tailwind theme with OKLCH colors, semantic tokens
2. **UI Components** - Build reusable components following ui_rules.md (buttons, cards, inputs, etc.)
3. **Landing/Dashboard Page** - Create interface for submitting collection URLs
4. **Supabase Integration** - Set up database schema, client initialization
5. **Trigger.dev Setup** - Initialize task orchestration framework
6. **API Research Phase** - Deep research into Firecrawl and Google Gemini API capabilities, patterns, and best practices
7. **Firecrawl Integration** - Implement scraping based on research findings
8. **Google Gemini Integration** - Implement Veo 3.1 video generation based on research findings
9. **Progress Tracking** - Real-time UI updates via Supabase subscriptions
10. **Video Preview/Download** - Display generated videos with download capability

## Project Philosophy

This project prioritizes:
- **Simplicity**: Web-only, no external messaging platforms
- **Reliability**: Automatic retries, durable task execution
- **User Experience**: Beautiful, accessible UI with real-time feedback
- **Cost Efficiency**: Replacing $30K photoshoots with AI automation
- **Scalability**: Batch processing for entire product catalogs

Refer to `docs/PROJECT_PLAN.md` for the complete product vision and success metrics.

## Commit Message Guidelines

When committing code changes, use the following format:

```
<short imperative title>

<concise explanation of WHAT changed and WHY>

Changes:
- <bullet describing change>
- <another change>
- ...
```

**Important Notes:**
- Keep commit messages **clean and professional** - no verbose output or edit summaries
- Do **NOT** include line-by-line diffs or code blocks in commit messages
- Do **NOT** show edit summaries like:
  ```
  79 +              </a>
  80 +              <a href="#" className="text-sm font-medium...
  ```
- Do **NOT** use `cat << EOF` blocks or verbose tooling output
- After pushing, provide a **brief 1-2 line summary** of what changed (e.g., "Implemented authentication system and removed unused files")
- Focus on user impact and motivation, not implementation details
