# Skill: clear-components

**Trigger:** User says "clear components", "reset the page", "start fresh", "wipe the components", "delete all components", or similar.

## Purpose

Completely wipe all cloned components and reset both page files and the registry back to empty shells, ready for a new `clone-site` run.

---

## Step 1 — Confirm before deleting

Before doing anything destructive, confirm with the user:

> "This will permanently delete all components in `components/` (except `builder.tsx`), reset `app/page.tsx` back to the bare homepage shell (Builder content only, no header/footer), reset `app/showcase/page.tsx` back to the empty showcase shell, reset `app/home/page.tsx`, and reset `builder-registry.ts`. Are you sure?"

If the user confirms (yes, go ahead, do it, clear it, etc.), proceed. If they hesitate or say no, stop.

---

## Step 2 — Delete all component folders

Delete every subdirectory inside `components/` **except `builder.tsx`** (which is infrastructure, not a cloned component).

Run:
```bash
find components -mindepth 1 -maxdepth 1 -type d -exec rm -rf {} +
```

Then confirm what was deleted by listing what remains:
```bash
ls components/
```

Expected output: only `builder.tsx` remains.

---

## Step 3 — Reset app/page.tsx to the bare homepage shell

Overwrite `app/page.tsx` with the bare homepage shell. This removes any wired-in header/footer components while keeping the Builder content block intact:

```tsx
'use client';
import '@/builder-registry';
import { BuilderPageContent } from '@/components/builder';

export default function HomePage() {
  return (
    <>
      {/* Header slot — filled automatically when a NavBar/Header component is cloned */}
      <BuilderPageContent urlPath="/" />
      {/* Footer slot — filled automatically when a Footer component is cloned */}
    </>
  );
}
```

## Step 3b — Reset app/showcase/page.tsx to empty showcase shell

Overwrite `app/showcase/page.tsx` with the empty showcase shell. This removes all component imports and section blocks while keeping the showcase structure intact for the next clone run:

```tsx
import '@/builder-registry';
import styles from './showcase.module.css';

export default function ShowcasePage() {
  return (
    <main className={styles.showcaseMain}>
      <div className={styles.emptyState}>
        <p className={styles.emptyStateText}>
          No components yet — ask Fusion to clone a site.
        </p>
      </div>
    </main>
  );
}
```

---

## Step 4 — Reset app/home/page.tsx

Overwrite `app/home/page.tsx` with an empty shell that exports a valid default component. Do not leave broken imports:

```tsx
export default function ClonedHome() {
  return null;
}
```

---

## Step 5 — Reset builder-registry.ts

Overwrite `builder-registry.ts` keeping only the `builder.init` call. Remove all component imports and `Builder.registerComponent` calls:

```ts
"use client";
import { builder, Builder } from "@builder.io/react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);
```

---

## Step 6 — Verify

After all changes:

1. Check that `components/` only contains `builder.tsx`:
   ```bash
   ls components/
   ```
2. Confirm `app/page.tsx` shows the bare homepage shell (Builder content only, no header/footer import) with no broken imports.
3. Confirm `app/showcase/page.tsx` shows the empty showcase shell with no broken imports.
4. Confirm `app/home/page.tsx` has no broken imports.
5. Confirm `builder-registry.ts` has no references to deleted components.

Report:
```
✓ Deleted components: AnnouncementBar, NavBar, Hero, Carousel, FeatureCards, Testimonials, Footer (example)
✓ app/page.tsx — reset to bare homepage shell (no header/footer)
✓ app/showcase/page.tsx — reset to empty showcase shell
✓ app/home/page.tsx — reset to empty shell
✓ builder-registry.ts — reset to builder.init only
Ready for a new clone-site run.
```

---

## What is NEVER deleted

| File/folder | Reason |
|-------------|--------|
| `app/page.tsx` | Reset to bare homepage shell (Builder content only) — never fully deleted |
| `app/showcase/page.tsx` | Reset to empty showcase shell — never fully deleted |
| `app/home/page.tsx` | Reset to empty shell — never fully deleted |
| `components/builder.tsx` | Builder.io infrastructure |
| `app/[...page]/page.tsx` | Builder.io page routing (catch-all for all other URLs) |
| `app/layout.tsx` | App shell |
| `app/globals.css` | Global styles |
| `app/showcase/showcase.module.css` | Showcase page styles — always preserved |
| `builder-registry.ts` | Kept, but emptied back to `builder.init` only |
| `scripts/render-page.js` | Puppeteer render tool |
| `.builder/skills/` | All skills |
