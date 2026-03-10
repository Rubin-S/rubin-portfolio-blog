# Refactor Architecture

This refactor keeps all existing routes and business behavior intact while consolidating shared logic and removing dead code.

## Structure

- `app/(main)`: public pages and route-local content data
- `app/games/_lib`: Matter.js scene setup and helper logic
- `app/rubin-admin/posts/_lib`: post-editor helper utilities
- `app/rubin-admin/**`: admin pages plus route-local client components where React Server Component boundaries require them
- `components/common`: shared layout primitives used across routes
- `components/ui`: small reusable UI primitives
- `components/blog`: shared blog rendering and list primitives
- `components/anim`: retained animation primitives
- `components/providers`: app-wide providers
- `lib/firebase`: Firebase admin/client initialization
- `lib/auth`: session and admin-auth helpers
- `lib/posts`: post queries, serialization, and content rendering helpers
- `lib/series`: series queries and serialization helpers
- `lib/utils`: shared utility exports and date formatting
- `types`: shared data types

## Shared Components

- `components/common/Header.tsx`: main public site header
- `components/common/PaperLayout.tsx`: shared page content wrapper
- `components/ui/ThemeToggle.tsx`: theme switcher
- `components/ui/EditorialPageHeader.tsx`: repeated page title/subtitle header
- `components/ui/SectionHeading.tsx`: repeated section heading pattern
- `components/ui/TagPill.tsx`: repeated tag chip
- `components/ui/StatusBadge.tsx`: shared post-status badge
- `components/ui/FormField.tsx`: repeated form-field wrapper
- `components/blog/PostContent.tsx`: canonical rich-post renderer
- `components/blog/PostListItem.tsx`: shared post teaser/list item

## Route-Local Client Components

These remain local to their routes because they depend on client-only hooks while their parent pages still need server data fetching.

- `app/rubin-admin/posts/PostTableClient.tsx`
- `app/rubin-admin/posts/[slug]/edit/PostEditorClient.tsx`
- `app/rubin-admin/series/[slug]/edit/SeriesEditorClient.tsx`

## Data and Auth

- Use `@/lib/firebase/admin` for server-side Firebase Admin access
- Use `@/lib/firebase/client` for client-side Firebase Auth
- Use `@/lib/auth/session` for session verification and cookie management
- Use `@/lib/posts/*` and `@/lib/series/*` for serialization/query logic instead of direct mixed-responsibility server modules

## Notes

- All removed files were either dead, duplicated, or superseded by the new structure.
- `npm run lint` and `npx tsc --noEmit` pass after the refactor.
- ESLint still prints the `baseline-browser-mapping` age notice, but it is informational and does not fail lint.
