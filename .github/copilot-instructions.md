# Rubin Portfolio Blog – AI Guide
**Stack**
- Next 15 App Router with server components by default; TypeScript strict mode and Tailwind (app/globals.css) power all styling.
- Firebase is the single backend: admin SDK lives in lib/firebase.admin.ts (Node runtime only) and client SDK lives in lib/firebase.client.ts.
- Fonts use next/font (app/layout.tsx) and global CSS variables carry the design system; respect ThemeProvider + TypographyProvider wrappers.

**Environment & Setup**
- Copy .env.example to .env.local; Firebase private keys need real newlines (lib/firebase.admin.ts handles \n replacement).
- Core commands: `npm run dev`, `npm run build`, `npm run lint`, `npm run seed` (scripts/seed.js nukes+re-seeds Firestore collections).
- Tools for admin claims run with `npx ts-node tools/setAdminClaim.ts <uid>` and `tools/checkAdminClaim.ts`; both expect .env.local to be loaded.

**Data Model**
- Firestore collections: posts (status, metrics.views/likes, content TipTap JSON), series, analytics, assets drafts; see scripts/seed.js for canonical shapes.
- Server-only helpers in lib/posts.server.ts return Firestore documents with Date conversion; reuse shapes when adding new fetchers.
- Track view metrics via app/api/track-view/route.ts and client components like components/blog/ViewTracker.tsx.

**Auth & Middleware**
- Admin auth uses Firebase custom claims + session cookies (`session`); set via app/api/auth/session/route.ts and enforced in app/rubin-admin/layout.tsx.
- middleware.ts guards `/rubin-admin` paths; it currently logs cookies for debugging—keep this in mind when modifying auth flows.
- requireAdmin()/verifyAdmin() in lib/auth.ts read cookies with `await cookies()`; do the same in any new server action or route.

**Routing & Rendering**
- Public pages live under app/(site) and app/blog; admin dashboard lives under app/rubin-admin with force-dynamic pages to avoid caching stale Firestore data.
- API routes sit in app/api/**; use Response/NextResponse and stay on the Node runtime when calling firebase-admin.
- TipTap content is rendered via app/blog/[slug]/render.ts and components/blog/RenderPost.tsx; update both when adjusting rich content or adding footnotes/TOC support.

**Conventions & Gotchas**
- Align fetchers with API expectations: app/api/admin/posts/[slug]/route.ts accepts PATCH while editors currently `PUT`; fix both sides together.
- app/api/posts/route.ts expects `{ posts, nextCursor }` but lib/getPaginatedPosts currently returns an array—adjust helper or handler before relying on pagination.
- When incrementing metrics use `admin.firestore.FieldValue.increment` (see app/api/track-view/route.ts); always acquire Firestore via `getAdminDb()` from lib/firebase.admin to avoid build-time crashes.
- Several dynamic routes typed params as Promise (e.g. app/blog/[slug]/page.tsx); prefer `{ params: { slug } }` signature to match Next conventions.

**UI Patterns**
- Client interactivity components declare "use client" at the top; server components handle data fetching directly from Firestore.
- Admin editor pieces (components/editor/Editor.tsx, components/admin/PostEditor.tsx) are works-in-progress—double-check autosave flows, status handling, and API verbs before extending.
- Typography and theme toggles rely on cookies + localStorage (components/TypographyProvider.tsx and app/(site)/actions/typography.ts); reuse these helpers instead of duplicating state.

**Deployment**
- next.config.ts allows firebase-admin as an external for server components; avoid importing it client-side to keep the build happy.
- SITE_URL powers RSS/sitemap (app/rss.xml/route.ts, app/sitemap.ts); ensure it is set in production environments.
