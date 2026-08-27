# Skill: component-from-html

**Trigger:** User pastes raw HTML/CSS from a design handoff, browser export, or screenshot tool (e.g. Builder.io Smart Export). Also triggered by phrases like "convert this HTML", "turn this into a component", "build from this markup".

## Purpose

Full pipeline: analyse pasted HTML → create a TypeScript + CSS Module component → register it with Builder.io → add it to the showcase page and the full clone page → verify.

This skill composes the three atomic skills (`create-component`, `register-component`, `showcase-component`) into a single automated flow.

---

## Step 0 — Analyse the HTML

Before writing any code:

### 0a — Name the component
Determine a clear PascalCase name from the HTML's apparent purpose. Examples:
- A `<header>` with nav links → `SiteHeader`
- A `<section>` with a large image and headline → `HeroBanner`
- A `<footer>` with links → `SiteFooter`
- A grid of service cards → `ServicesGrid`

### 0b — Extract all image and logo URLs (CRITICAL — do this first)

Scan the entire HTML for every `<img src="...">` and CSS `background-image: url(...)`. List them all **before writing any JSX**. These URLs are not optional — they are part of the faithful reproduction requirement.

Follow the `create-component` skill's image/logo rule for priority order and unacceptable substitutes (no placeholders, no redrawn SVGs, no text standing in for a logo).

### 0c — Identify props
Every hardcoded value that should be editable in Builder.io becomes a prop:
- Text strings (headings, body copy, button labels, taglines)
- Image URLs and alt text
- Link hrefs
- Boolean flags (e.g. `showSearch`, `isFixed`)

Do not turn CSS values into props — those stay in the CSS module.

### 0d — Identify interactivity
Note any click handlers, toggle state, or browser APIs. These require `'use client'`.

---

## Step 1 — Create the Component

Follow the `create-component` skill rules exactly (props, CSS module conventions, image/logo rule).

Additional HTML → JSX conversion rules specific to pasted markup:
- Change `class=` to `className=`
- Self-close void elements: `<img />`, `<input />`, `<br />`
- Replace all inline `style="..."` attributes with CSS module classes
- Convert every hardcoded content value to a `{prop}` expression, using the original value as the default
- Preserve HTML structure faithfully — do not simplify or reorganise the layout
- The `defaultValue` of any image prop must be the exact URL extracted in Step 0b

---

## Step 2 — Register with Builder.io

Follow the `register-component` skill rules exactly (find the registry file, map props to input types, append the import + `Builder.registerComponent()` call with a `defaultValue` on every input).

---

## Step 3 — Add to both page files

This step updates **two** files:

### 3a — Component showcase (`app/showcase/page.tsx`)

`app/showcase/page.tsx` (served at `/showcase`) is the component showcase. Each component gets its own `<section>` block so it can be viewed in isolation.

1. Add the import at the top alongside other component imports.
2. Add a `<section className={styles.showcaseSection}>` block in logical page order (header → hero → content → footer). Append at the bottom if order is unclear.
3. The section must contain:
   - `<div className={styles.showcaseSectionHeader}>` with an `<h2>` (component name, human-readable) and a `<p className={styles.showcaseSectionDescription}>` (one sentence describing what it does)
   - `<div className={styles.showcaseComponentWrapper}>` wrapping the component rendered with its **real default props** (never empty strings or placeholders)

Example section shape:
```tsx
<section className={styles.showcaseSection}>
  <div className={styles.showcaseSectionHeader}>
    <h2>Nav Bar</h2>
    <p className={styles.showcaseSectionDescription}>Top navigation with logo, links, and CTA button.</p>
  </div>
  <div className={styles.showcaseComponentWrapper}>
    <NavBar />
  </div>
</section>
```

Also ensure the `emptyState` div is removed from `app/showcase/page.tsx` once the first component is added — do not leave the "No components yet" message alongside real components.

### 3b — Full clone page (`app/home/page.tsx`)

`app/home/page.tsx` is the full assembled page clone. Components go here **without** name/description wrappers — just the raw component in page order.

1. Add the import.
2. Render the component directly inside the page's return, in the correct position (navbar first, footer last).
3. No `<section>` wrappers, no headings, no descriptions — just the component tag.

Example:
```tsx
export default function ClonedHome() {
  return (
    <>
      <NavBar />
      <Hero />
      <Footer />
    </>
  );
}
```

---

## Step 4 — Wire header/footer into the homepage (`app/page.tsx`)

`app/page.tsx` (served at `/`) is the homepage: a hardcoded header at the top, Builder Publish content (`<BuilderPageContent urlPath="/" />`) in the middle, and a hardcoded footer at the bottom. It is **not** the showcase and must never receive arbitrary components.

Detection rule, by naming convention:
- Component name contains `Header` or `NavBar` → header slot
- Component name contains `Footer` → footer slot
- Anything else → Builder-managed content; do **not** hardcode it into `app/page.tsx`

Each slot holds exactly one component. If a header or footer is already wired in, **replace** its import/render rather than stacking a second one. Import the component and render it immediately before (header) or after (footer) `<BuilderPageContent urlPath="/" />` — never remove or reorder the Builder content block itself.

If the component is neither a header nor a footer, skip this step entirely.

---

## Step 5 — Verify

After all steps:

1. Check the component file for TypeScript errors:
   - All props in the interface are used in JSX
   - No missing imports
   - JSX is valid (no unclosed tags, no `class=` instead of `className=`)

2. Check the registry file:
   - Import resolves to the correct file
   - `inputs` array covers every prop

3. Check all page files:
   - `app/showcase/page.tsx`: import added, section block renders the component with real props
   - `app/home/page.tsx`: import added, raw component rendered in page order
   - `app/page.tsx`: only updated if the component is a header/nav or footer, wired into the correct slot

4. **Summarise** what was created:
   ```
   ✓ Created: components/{ComponentName}/index.tsx
   ✓ Created: components/{ComponentName}/styles.module.css
   ✓ Registered: builder-registry.ts — N inputs
   ✓ Showcased: app/showcase/page.tsx — section added
   ✓ Full page: app/home/page.tsx — component added
   ✓ Homepage: app/page.tsx — header/footer slot updated (or: not applicable)
   ```

5. Confirm every `<img src>` from the original HTML is preserved verbatim in the component's prop default and actually appears in the generated file — fix before reporting completion if not.
