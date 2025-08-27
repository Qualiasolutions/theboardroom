# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server with TurboPack at http://localhost:3000
npm run build        # Build production bundle
npm run start        # Start production server
npm run lint         # Run ESLint checks
```

## Architecture Overview

This is a **demo-only frontend application** for an exclusive founder community platform called "Boardroom". It demonstrates a corporate-grade UI with invitation-only access and advanced strategic planning tools.

### Tech Stack
- **Framework**: Next.js 15.4.6 with App Router (TypeScript)
- **Styling**: Tailwind CSS v4 with zero border-radius design system
- **Components**: Radix UI primitives + custom shadcn/ui components
- **State**: Zustand for client-side state management
- **Icons**: lucide-react
- **Themes**: next-themes (dark mode default)
- **Animations**: Framer Motion
- **Data**: TanStack React Query for caching (frontend-only)

### Project Structure
```
src/
├── app/                   # Next.js App Router pages
│   ├── (authenticated)/   # Protected routes with shared layout
│   │   ├── boardroom/     # Strategic planning workspace with drag-drop
│   │   ├── dashboard/     # Main activity overview
│   │   ├── rooms/         # Discussion spaces
│   │   ├── introductions/ # Network connections
│   │   └── briefings/     # Strategic sessions
│   ├── membership/        # Payment flow (demo only)
│   └── page.tsx          # Landing page with invite validation
├── components/
│   ├── layout/           # Navigation sidebar & header
│   ├── theme/            # Theme provider configuration
│   └── ui/               # shadcn/ui components + custom extensions
└── lib/
    ├── store.ts          # Zustand store with boards/notifications
    └── utils.ts          # Utility functions (cn helper)
```

### Key Features & Components

**Strategic Boardroom** (`src/app/(authenticated)/boardroom/page.tsx`):
- Drag-and-drop strategic planning workspace
- Multiple board templates (SWOT, OKRs, Roadmaps)
- Item types: notes, objectives, tasks, risks, ideas, milestones
- Export/import functionality with JSON format
- Real-time collaboration features (demo)
- Advanced filtering and search capabilities

**Design System**:
- **Colors**: Corporate palette defined in `tailwind.config.ts`
  - Background: `#0B0B0C` (boardroom black)
  - Gold accent: `#D4AF37` with soft variant
  - Panel: `#111214` for elevated surfaces
- **Border Radius**: Zero everywhere (enforced globally)
- **Theme**: Dark-first with CSS custom properties
- **Typography**: Inter/DM Sans font stack

**State Management**:
- Zustand store (`src/lib/store.ts`) handles:
  - Multiple strategic boards with persistence
  - Board items with positions, status, priority
  - Notification system
  - Current board selection

### Authentication & Access
- Demo-only authentication with hardcoded invite codes
- Valid codes: `FOUNDERS2024`, `DEMO`
- Protected routes use `(authenticated)` route group
- No real session management or backend integration
- Login validation occurs on landing page (`src/app/page.tsx`)

### Development Notes
- All data is client-side only (no API calls)
- Board data persists in localStorage via Zustand
- Components follow shadcn/ui patterns with Radix primitives
- Zero border-radius is enforced in Tailwind config
- Path alias `@/*` maps to `./src/*`
- TypeScript strict mode enabled

### Common Debugging Patterns
- **React Infinite Loops**: When modifying the boardroom page, be careful with useEffect dependencies. The store functions `addBoard`, `setCurrentBoard`, `updateBoard` should not be in dependency arrays as they can cause infinite loops
- **Zustand State Persistence**: State is persisted in localStorage under `boardroom-storage` key. Clear this if state becomes corrupted during development
- **Board Item Updates**: Use debouncing for rapid board updates to prevent performance issues (see `src/app/(authenticated)/boardroom/page.tsx:135`)

### Deployment
- Optimized for Vercel deployment
- No environment variables required for demo
- Static export compatible (all frontend)
- Auto-deploy configured for main branch