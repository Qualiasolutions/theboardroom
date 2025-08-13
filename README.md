# Boardroom (Demo UI)

A high-end, corporate-grade demo UI for an invitation-only founder community. Frontend-only (no backend), built with Next.js, Tailwind, and Radix. Dark-first, zero radius, black/gold/white palette.

## Stack
- Next.js App Router (TypeScript)
- Tailwind CSS v4
- Radix primitives
- Framer Motion
- lucide-react icons
- next-themes (dark default)

## Quick Start
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the demo.

**Demo Login:** Use invite code `DEMO` to access the application.

## Key Features
- **Landing Page**: Corporate login with invite code authentication
- **Dashboard**: Activity overview with stats and recent threads  
- **Rooms**: Strategic discussion spaces with tabs (Threads, Chat, Briefings, Members)
- **Introductions**: Request and approve network connections
- **Briefings**: Schedule and manage strategic sessions
- **Responsive Design**: Mobile-first with elegant desktop experience

## Architecture Notes
- All data is mocked under `src/data/` (members, rooms, threads, briefings, introductions, notifications)
- Zero border radius enforced globally via Tailwind config
- Corporate color palette: Black (#0B0B0C), Gold (#D4AF37), White (#F5F6F7)
- Component library: shadcn/ui with custom theme
- Layout system: Fixed sidebar navigation with responsive header

## Routes
- `/` Landing + Login
- `/membership` Founder payment page (€50K membership fee)
- `/membership/success` Payment confirmation
- `/dashboard` Main activity overview
- `/rooms` → `/rooms/[id]` Strategic discussion spaces
- `/introductions` Network connection requests
- `/briefings` Scheduled strategic sessions
