# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server with Turbopack at http://localhost:3000
npm run build        # Build production bundle
npm run start        # Start production server
npm run lint         # Run ESLint checks
```

## Architecture Overview

This is a **production-ready full-stack application** for an exclusive founder community platform called "Boardroom". It features enterprise-grade UI with Supabase backend, real-time collaboration, and strategic planning tools.

### Tech Stack
- **Framework**: Next.js 15.4.6 with App Router (TypeScript)
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Styling**: Tailwind CSS v4 with zero border-radius design system
- **Components**: Radix UI primitives + shadcn/ui components
- **State Management**: TanStack React Query + Zustand
- **Authentication**: Supabase Auth with Google OAuth
- **Icons**: lucide-react
- **Themes**: next-themes (dark mode default)
- **Animations**: Framer Motion
- **Database**: PostgreSQL with Row Level Security (RLS)

### Project Structure
```
src/
├── app/                   # Next.js App Router pages
│   ├── (authenticated)/   # Protected routes with Supabase auth
│   │   ├── boardroom/     # Real-time strategic planning workspace
│   │   ├── dashboard/     # User activity dashboard
│   │   ├── rooms/         # Multi-user discussion spaces
│   │   ├── introductions/ # Network connections
│   │   └── briefings/     # Strategic sessions
│   ├── auth/              # Authentication pages (login, callback)
│   ├── membership/        # Membership flow
│   └── page.tsx          # Landing page with auth redirect
├── components/
│   ├── layout/           # Authenticated navigation & header
│   ├── providers/        # React Query & theme providers
│   ├── theme/            # Theme configuration
│   └── ui/               # shadcn/ui components + extensions
├── lib/
│   ├── supabase/         # Supabase client utilities (server/client)
│   ├── hooks/            # Custom Supabase React Query hooks
│   ├── types/            # TypeScript database types
│   └── utils.ts          # Utility functions
└── middleware.ts          # Next.js auth middleware
```

### Key Features & Components

**Executive Dashboard** (`src/app/(authenticated)/dashboard/page.tsx`):
- **Premium KPI Cards**: Real-time metrics with executive glassmorphism styling
- **Staggered Animations**: Progressive loading with sophisticated timing curves
- **Dynamic Data**: Live calculations from board completion rates and user activity
- **Luxury Interactions**: Card-float effects, micro-bounces, and premium hover states
- **Command Integration**: Quick actions with luxury button styling and shortcuts

**Strategic Boardroom** (`src/app/(authenticated)/boardroom/page.tsx`):
- **Premium Canvas**: Real-time drag-and-drop workspace with glassmorphism design
- **Executive Controls**: Enhanced search, filtering, and premium action buttons with glass panels
- **Board Templates**: Multiple strategic frameworks (SWOT, OKRs, Roadmaps, Risk Assessment)
- **Item Management**: 14 item types with status tracking, priority levels, and assignments
- **Visual Polish**: Staggered animations, luxury hover effects, and premium interactions
- **Advanced Features**: Export/import, board sharing, template system integration
- **Performance**: Debounced updates, optimistic UI, and smooth 60fps animations
- **Database Integration**: Supabase persistence with real-time collaboration

**Navigation System** (`src/components/layout/navigation.tsx` & `header.tsx`):
- **Glassmorphism Navigation**: Premium backdrop blur with gold accent gradients
- **Command Palette**: Full keyboard navigation (⌘K) with glassmorphism modal
- **Luxury Buttons**: Shine effects with premium animations and micro-interactions
- **Executive Search**: Enhanced search bar with command shortcuts and hover effects
- **User Profile**: Professional avatar with status indicators and hover animations

**Authentication System** (`src/app/auth/`):
- **Supabase Integration**: Full auth with email/password and Google OAuth
- **Protected Routes**: Next.js middleware with session management
- **Organization Access**: Multi-tenant architecture with RLS policies
- **Production Ready**: Server-side session handling with secure cookie management

**Database Integration** (`src/lib/`):
- **Custom Hooks** (`src/lib/hooks/useSupabase.ts`): React Query hooks for all Supabase operations
- **Type Safety** (`src/lib/types/database.types.ts`): Generated TypeScript types from database schema
- **Client Utilities** (`src/lib/supabase/`): Server and client-side Supabase clients
- **Real-time Sync**: Live updates for boards, comments, and user presence

**Design System - TOP-NOTCH Executive UI**:
- **Colors**: Premium corporate palette with CSS custom properties
  - Background: `#0B0B0C` (deep boardroom black)
  - Foreground: `#F5F6F7` (near white for maximum contrast)
  - Panel: `#111214` (elevated dark surfaces)
  - Gold Primary: `#D4AF37` (executive gold accent)
  - Gold Soft: `#C9A227` (subtle gold variant)
  - Mid: `#7E838C` (professional mid-tone)
  - Border: `#22242A` (subtle separators)

- **Premium Visual Effects**:
  - **Glassmorphism**: Advanced backdrop blur with `.glass` and `.glass-light` utilities
  - **Executive Shadows**: Multi-layered premium shadows (`.shadow-premium`, `.shadow-premium-lg`)
  - **Luxury Animations**: 35+ custom animation classes with cubic-bezier easing
  - **Micro-interactions**: Sophisticated hover states with `.micro-bounce`, `.card-float`
  - **Premium Buttons**: Luxury shine effects with `.btn-luxury` class

- **Advanced Animation System**:
  - **Staggered Entrance**: `.stagger-item` with progressive delays (0.1s - 0.6s)
  - **Gradient Text**: `.text-luxury` with animated background gradients
  - **Loading States**: Premium shimmer animations with `.loading-skeleton`
  - **Hover Effects**: Multi-layer transforms with `.hover-lift` and scale transitions
  - **Command Palette**: Glassmorphism modal with advanced blur effects

- **Typography & Layout**:
  - **Zero Border Radius**: Enforced globally for executive aesthetic
  - **Font Stack**: Inter/DM Sans with font-feature-settings optimization
  - **Text Rendering**: Optimized with antialiasing and subpixel rendering
  - **Responsive Grid**: Executive dashboard with 4-column KPI layout

### Authentication & Access
- **Production Authentication**: Supabase Auth with email/password and Google OAuth
- **User Management**: Users must be created through Supabase Dashboard (invitation-only)
- **Protected Routes**: Next.js middleware (`middleware.ts`) protects all `(authenticated)` routes
- **Session Management**: Server-side session handling with cookie-based auth
- **Organization-based Access**: Multi-tenant architecture with organization isolation
- **Role-based Permissions**: Owner/Admin/Member roles with different access levels

## Environment Variables

Required environment variables in `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://yppqtoovofcwoyzkhndu.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SUPABASE_PROJECT_REF=yppqtoovofcwoyzkhndu
```

## Database Setup

1. **Execute Schema**: Run `supabase-schema.sql` in Supabase SQL Editor
2. **Enable RLS**: Row Level Security is automatically configured  
3. **Storage Setup**: Buckets for avatars and board attachments are created
4. **Default Organization**: Demo organization is created for testing
5. **Enable Realtime**: Enable realtime replication for `board_items`, `comments`, and `posts` tables in Supabase Dashboard → Database → Replication

### Development Notes
- **Data Persistence**: All data stored in Supabase PostgreSQL database
- **Real-time Updates**: Uses Supabase Realtime for live collaboration
- **Type Safety**: Database types generated in `src/lib/types/database.types.ts`
- **Query Optimization**: React Query for caching and optimistic updates
- **Components**: Follow shadcn/ui patterns with Radix primitives
- **Zero Border-radius**: Enforced globally in Tailwind config
- **Path Alias**: `@/*` maps to `./src/*`
- **TypeScript**: Strict mode enabled with comprehensive type checking

### Common Debugging Patterns
- **Authentication Issues**: Check middleware.ts and ensure cookies are properly set
- **Database Access**: Verify RLS policies allow user access to organization data
- **Real-time Not Working**: Check Supabase Realtime is enabled for tables
- **Query Errors**: Use React Query DevTools to debug cache and network issues
- **Type Errors**: Regenerate database types if schema changes
- **Infinite Loops**: Avoid putting Supabase client instances in useEffect dependencies
- **Premium Animations**: Check CSS custom properties are properly defined in globals.css
- **Command Palette**: Ensure keyboard event listeners are properly cleaned up
- **Glassmorphism Issues**: Verify backdrop-filter support and fallbacks for older browsers
- **State Hydration**: Use proper client-side mounting checks for Zustand store access

### Database Schema Overview

```sql
-- Core Tables:
organizations     # Founder communities/companies
profiles         # User profiles with organization membership
boards           # Strategic planning boards
board_items      # Draggable items on boards
comments         # Real-time comments on board items
rooms            # Discussion rooms
posts            # Forum-style posts
post_replies     # Replies to posts

-- Storage Buckets:
avatars          # User profile pictures
board-attachments # Files attached to board items
```

### Deployment & Production
- **Platform**: Vercel (optimized for Next.js 15 with Turbopack)
- **Database**: Supabase (hosted PostgreSQL with real-time capabilities)
- **Environment**: Production `.env` required with Supabase credentials
- **Build Optimization**: 
  - Premium CSS animations with optimized keyframes
  - Component lazy loading with React.Suspense boundaries
  - Image optimization with next/image for avatars and assets
  - Font optimization with next/font for Inter/DM Sans
- **Performance**:
  - 60fps animations with hardware acceleration
  - Glassmorphism effects optimized for performance
  - Command palette with efficient keyboard event handling
  - Staggered loading to prevent layout shift
- **Scaling**: Multi-tenant architecture ready for enterprise production load

### Implementation Status

**✅ COMPLETED FEATURES**:
- **Authentication System**: Supabase Auth with Google OAuth and invitation-only access
- **Database Schema**: Full PostgreSQL schema with RLS policies and realtime capabilities
- **Real-time Collaboration**: Live board updates, user presence, and collaborative editing
- **Premium UI System**: Glassmorphism design with 35+ animation classes and command palette (⌘K)
- **Strategic Boardroom**: Drag-and-drop workspace with multiple templates (SWOT, OKR, Roadmap)
- **Executive Dashboard**: Real-time KPI cards with premium animations and staggered loading
- **React Query Integration**: Custom hooks for all CRUD operations with optimistic updates

**🔧 KNOWN TECHNICAL CONSIDERATIONS**:
- Ensure position fields match database schema (`position_x`/`position_y` vs `position.x`/`position.y`)
- Verify realtime replication is enabled for collaborative tables
- Monitor React Query cache hydration on SSR transitions
- Validate RLS policies for proper organization data isolation