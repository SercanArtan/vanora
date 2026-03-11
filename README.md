# Rick and Morty Explorer

A Next.js application for browsing characters, episodes, and locations from the Rick and Morty universe, built as a case study for **Vanora Ventures**.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org) | React framework — App Router, SSR, ISR |
| [TypeScript](https://typescriptlang.org) | Type safety across the codebase |
| [Tailwind CSS 3](https://tailwindcss.com) | Utility-first styling with design tokens |
| [Zod](https://zod.dev) | Runtime API response validation |
| [Lucide React](https://lucide.dev) | Icon library |
| [Radix UI](https://radix-ui.com) | Accessible primitives (`Slot`) |
| [CVA](https://cva.style) | Component variant management |
| [ESLint](https://eslint.org) + [Prettier](https://prettier.io) | Linting and code formatting |

**API:** [Rick and Morty API](https://rickandmortyapi.com/documentation)

---

## Why This Structure?

The project follows a **feature-based architecture** where code is organized by domain rather than by technical role.

### The Problem with Technical Grouping

A flat structure like `components/`, `hooks/`, `utils/`, `types/` works for small apps but breaks down as features grow. You end up with files scattered across folders — a character-related schema sits next to an episode type, an API helper shares a folder with unrelated utilities.

### Feature-Based Solution

Each domain is self-contained:

```
features/
├── shared/       →  Cross-domain utilities (used by all)
├── character/    →  Everything character-related
├── episode/      →  Everything episode-related
└── location/     →  Everything location-related
```

Each domain has the same internal structure:

```
features/character/
├── api.ts         →  Data fetching (getCharacter, getCharacters, getCharactersByUrls)
├── schemas.ts     →  Zod schemas (CharacterSchema, CharacterResponseSchema)
├── types.ts       →  TypeScript types (inferred from schemas via z.infer)
└── components/    →  UI components (CharacterCard, CharacterDetail, CharacterGrid)
```

**Benefits:**
- **Discoverability** — Need to change character logic? Everything is in `features/character/`
- **Encapsulation** — Each domain owns its API, schemas, types, and components
- **Scalability** — Adding a new domain (e.g. `features/dimension/`) follows an established pattern
- **Dependency Clarity** — Imports between domains are explicit cross-references, not hidden in shared folders

---

## DRY Rules Applied

### 1. `fetchApi` + `fetchManyByUrls` — Shared API Layer

**Problem:** Every domain needed fetch → validate → error-handle logic. Batch-fetching characters by URL array was copy-pasted.

**Solution:** Two generic helpers in `features/shared/api.ts`:

```typescript
// Single resource: fetch + Zod parse + revalidation
fetchApi<T>(url, schema, revalidate?)

// Batch fetch: extract IDs from URL array, single API call
fetchManyByUrls<T>(urls, batchEndpoint, schema)
```

Domain APIs become thin wrappers:

```typescript
// features/character/api.ts
export async function getCharacter(id: number) {
  return fetchApi(`${API_BASE}/character/${id}`, CharacterSchema, 3600);
}
```

---

### 2. `InfoRow` — Composable Data Display

**Problem:** Character info rows, episode rows, and location link rows all had similar markup but slightly different structures (some had subtitles, some were clickable with chevrons).

**Solution:** A single `InfoRow` component with optional props:

```tsx
// Basic info row
<InfoRow label="Gender" value="Male" />

// Clickable row with chevron (auto-wraps in <Link>)
<InfoRow label="Location" value="Earth" href="/location/1" />

// With subtitle (e.g. episode air date)
<InfoRow label="S01E01" value="Pilot" subtitle="December 2, 2013" href="/episode/1" />
```

One component covers all three use cases. No duplicate `<Link>` + `<ChevronRight>` markup.

---

### 3. `DetailLayout` + `DetailPageWrapper` — Page Shells

**Problem:** Character, episode, and location pages shared identical outer structure (container, Go Back button, hero area, content section).

**Solution:** A composable `DetailLayout` with sub-components:

```tsx
<DetailLayout>
  <DetailLayout.Hero icon={...} gradient="...">
    <h1>Title</h1>
  </DetailLayout.Hero>
  <DetailLayout.Content>
    {/* domain-specific content */}
  </DetailLayout.Content>
</DetailLayout>
```

`DetailPageWrapper` provides consistent container styling across all detail routes.

---

### 4. `createDetailMetadata` — Metadata Factory

**Problem:** All three detail pages had the same pattern:  `parseId → fetch → handle not-found → build metadata`. Only the fetch function and metadata shape differed.

**Solution:** A generic factory function:

```typescript
export const generateMetadata = createDetailMetadata("Character", getCharacter, (character) => ({
  title: `${character.name} | Rick and Morty Explorer`,
  description: `Details for ${character.name}...`,
  openGraph: { images: [character.image] },
}));
```

Internally, `createDetailMetadata` handles `parseId`, error handling, and the "Not Found" fallback title.

---

### 5. `ErrorContent` + `DetailLoadingSkeleton` — Error & Loading States

**Problem:** 3 error pages had 23 identical lines, differing only in the heading text. 2 loading pages were 33 identical lines.

**Solution:**

```tsx
// Error pages → 1 line each
<ErrorContent title="Failed to load episode" error={error} reset={reset} />

// Loading pages → 1 line each
<DetailLoadingSkeleton />
```

---

### 6. `parseId` — Shared Utility

**Problem:** Every detail page needed `Number(params.id)` → `isNaN()` → `notFound()`.

**Solution:** A single utility in `lib/utils.ts`:

```typescript
export function parseId(id: string): number {
  const num = Number(id);
  if (isNaN(num)) notFound();
  return num;
}
```

---

### 7. Design Tokens in Tailwind Config

**Problem:** Hardcoded pixel values (`h-[246px]`, `mb-[61px]`, `gap-[20px]`) scattered across components.

**Solution:** Named tokens in `tailwind.config.ts`:

```typescript
spacing:  { section: "61px", card: "20px" }
height:   { card: "246px", footer: "60px" }
maxWidth: { grid: "1020px" }
```

Components use semantic names: `h-card`, `mb-section`, `max-w-grid`

---

## Project Structure

```
src/
├── app/                               # Next.js App Router
│   ├── layout.tsx                     # Root layout (Header + <main> + Footer)
│   ├── page.tsx                       # Home — character listing with filters
│   ├── loading.tsx                    # Home skeleton loader
│   ├── error.tsx                      # Home error boundary
│   ├── not-found.tsx                  # Custom 404 page
│   ├── character/[id]/               # Character detail (page + loading + error)
│   ├── episode/[id]/                 # Episode detail (page + loading + error)
│   └── location/[id]/                # Location detail (page + loading + error)
├── components/
│   ├── shared/                        # Header, Footer
│   └── ui/                            # Button, Input, CustomSelect
├── features/
│   ├── shared/                        # Cross-domain utilities
│   │   ├── api.ts                     # fetchApi(), fetchManyByUrls()
│   │   ├── schemas.ts                 # InfoSchema, LocationRefSchema
│   │   ├── types.ts                   # Info, LocationRef
│   │   └── components/                # DetailLayout, DetailPageWrapper, ErrorContent,
│   │                                  # DetailLoadingSkeleton, InfoRow, ResidentGrid
│   ├── character/                     # Character domain
│   │   ├── api.ts                     # getCharacters(), getCharacter(), getCharactersByUrls()
│   │   ├── schemas.ts                 # CharacterSchema, CharacterResponseSchema
│   │   ├── types.ts                   # Character, CharacterResponse, CharacterFilters
│   │   └── components/                # CharacterCard, CharacterDetail, CharacterGrid, CharacterFilters
│   ├── episode/                       # Episode domain
│   │   ├── api.ts                     # getEpisode(), getEpisodesByUrls()
│   │   ├── schemas.ts / types.ts      # EpisodeSchema, Episode
│   │   └── components/                # EpisodeDetail
│   └── location/                      # Location domain
│       ├── api.ts                     # getLocation()
│       ├── schemas.ts / types.ts      # LocationSchema, Location
│       └── components/                # LocationDetail
├── lib/utils.ts                       # cn(), parseId()
└── styles/globals.css                 # Tailwind directives + CSS variables
```

---

## What I Will Do Next

### Features
- [ ] Episode listing page — Browse all episodes with season filtering
- [ ] Location listing page — Browse all locations with type/dimension filtering
- [ ] Dark mode — Theme toggle with `next-themes`
- [ ] Favorites system — Save favorites with `localStorage`
- [ ] Pagination for residents/characters — "Show More" on detail pages (currently limited to 20)
- [ ] Character comparison — Side-by-side view

### Technical
- [ ] Upgrade to Next.js 15 — React 19, Turbopack, improved caching
- [ ] Add unit tests — Jest + React Testing Library
- [ ] Add E2E tests — Playwright for critical user flows
- [ ] Suspense boundaries — Wrap `CharacterFilters` for `useSearchParams()`
- [ ] CI/CD — GitHub Actions for lint, test, deploy
- [ ] Error monitoring — Sentry integration

### Design
- [ ] Status badges — Color-coded (Alive = green, Dead = red, Unknown = gray)
- [ ] Page transitions — Smooth animations between routes
- [ ] Breadcrumbs — Home > Character > Rick Sanchez
- [ ] Smart "Go Back" — Return to previous page context, not always `/`
- [ ] Empty state illustrations — Better UX for "no results"

---

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Development
npm run dev

# Production
npm run build && npm run start

# Lint + Format
npm run lint
npx prettier --write .
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_BASE` | Rick and Morty API base URL | `https://rickandmortyapi.com/api` |
