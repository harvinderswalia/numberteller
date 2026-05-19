# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite)
npm run build      # Production build
npm run lint       # ESLint
npm run typecheck  # TypeScript check (no emit)
npm run preview    # Preview production build
```

## Architecture

**What it is**: A client-side numerology SPA. All calculation logic runs in the browser. Supabase handles auth and chart persistence only — there are no edge functions.

**Routing**: `src/App.tsx` manages a `currentPage` state string with 9 pages. There is no React Router. Navigation components call `onNavigate(pageName)` callbacks.

**State**: No Redux/Zustand. Top-level state in `App.tsx` holds calculation results and modal visibility flags. Auth state is in `AuthContext` (React Context). Forms use local `useState`.

## Core Calculation Engine

`src/utils/numerology.ts` — The brain of the app (~740 lines, 50+ exported functions). All pure functions.

Key rules hardcoded throughout:
- **Master numbers** (11, 22, 33) are preserved during reduction and formatted as "11/2", "22/4", "33/6"
- **Karmic debt numbers** (13, 14, 16, 19) are never reduced (kept as "13/4", etc.)
- **Letter-to-number**: Pythagorean table (A=1…Z=8, repeating). Y is treated as vowel based on surrounding context.
- **Harmony scoring**: Numbers have "friendly groups" (e.g., 6 harmonizes with 2,3,4,6,8,9) used in all compatibility and target scoring.

`src/utils/nameCorrection.ts` — Name optimization engine (~720 lines). Generates target EX/SU number pairs based on desire category, then applies micro-mutations to the user's name (double letters, c↔k swaps, adding h, etc.) to find variants that hit those targets. Filters candidates that would create over-energy (LP/EX/SU repeating the same number).

`src/utils/loShuGrid.ts` — Lo Shu 3×3 grid calculator. Analyzes planes (mental/emotional/practical), detects power arrows, flags missing numbers.

## Over-Energy Logic

When a number appears in multiple core positions (BD, LP, EX, SU), it is flagged as "over-energy" — a numerological imbalance. This affects:
- **`calculateCoreHarmony()`** in `numerology.ts`: penalizes the harmony score for repeated-number pairs from 1.0 → 0.4 (overriding the normal "same number = perfect" logic)
- **`CoreChart.tsx`**: renders "Over-Energy" badge (orange) instead of "Perfect"/"Strong" for affected pairs, shows an explicit warning block
- **Name correction target generation** in `nameCorrection.ts`: blocks any suggested EX/SU that matches LP or BD numbers

## Database

Single table: `saved_charts`
- `user_auth_id uuid` — links to `auth.users`, ON DELETE CASCADE
- `chart_data jsonb` — full results blob
- RLS policies restrict all operations to `auth.uid() = user_auth_id`
- Max 10 charts per user (enforced in `src/utils/savedCharts.ts`)

Auth: Supabase email/password. Auth state managed in `src/contexts/AuthContext.tsx` via `onAuthStateChange`. Always use async IIFE pattern inside the callback to avoid Supabase deadlocks:
```ts
supabase.auth.onAuthStateChange((event, session) => {
  (async () => { /* async work here */ })();
});
```

## Environment Variables

Required in `.env`:
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Key Conventions

- Master number display: always use "11/2" format, never bare "11"
- `getNumericValue(val)` helper pattern used throughout components to extract the reduced integer from "11/2"-style strings (split on `/`, take last part)
- Harmony scores are 0.0–1.0 floats throughout; only converted to percentage for display
- `DESIRE_CATEGORIES` in `nameCorrection.ts` defines which EX/SU numbers are desirable per goal (Career, Relationships, Wealth, Health, Spirituality) — this is where allowed target numbers live
- Subscription gating exists in `src/utils/subscription.ts` but currently allows all users unlimited calculations
