# Skill: clone-site

**Trigger:** User says "clone this site: <url>", "clone <url>", "build components from <url>", or similar.

## Purpose

Extract fully JS-rendered HTML from a live website using Puppeteer, then build matching React components via the `component-from-html` skill. Never invent layouts. Never fall back to generic templates. If a section cannot be extracted, skip it or pick a real alternative section from the same page.

---

## Prerequisites

`scripts/render-page.js` connects to a **remote** browser via [browserless.io](https://www.browserless.io/) rather than launching a local Chromium instance.

- `PUPPETEER_BROWSER_WS_ENDPOINT` must be set (e.g. `wss://chrome.browserless.io?token=YOUR_API_KEY`).
- The script automatically retries up to 3 times on transient connection errors ("Target closed", "Protocol error") before failing — no manual retry needed.
- Before running a clone for the first time, verify connectivity with `npm run test-browserless`.

---

## Step 0 — Run the Puppeteer render script

```bash
node scripts/render-page.js <url>
```

This outputs a JSON object with keys:
- `announcementBar` — top promo strip (or null)
- `nav` — site header/navbar
- `hero` — main above-the-fold section
- `featureCards` — product/feature card grid
- `carousel` — image/content slider
- `testimonials` — reviews or quotes
- `footer` — site footer
- `_ctaButtonColor` — `{ background, color, borderColor }` of the first CTA button on the page

If the script fails (network error, bot block, timeout), fall back to `WebFetch` for server-rendered pages only. If both fail, ask the user to paste the HTML from browser DevTools.

---

## Step 1 — Audit what was found

For each of the 7 requested sections, check whether the extracted HTML is non-null and contains real content (not just a blank wrapper shell). Log:

```
✓ announcementBar  — found (N chars)
✓ nav              — found (N chars)
✓ hero             — found (N chars)
✗ carousel         — null → will use [alternative section name] instead
...
```

**If a section is null or empty:**
- Pick a different real section from the page that serves a similar visual role. For example: no carousel → grab a second content/promo section instead.
- Do NOT invent a layout. Do NOT use a generic template.
- Report what you substituted and why.

---

## Step 2 — Inspect CTA button color (CRITICAL)

Before writing any component, read `_ctaButtonColor` from the render output.

- Use the **exact `background` value** (e.g. `rgb(210, 0, 0)` for Bosch red) for all primary action buttons across every component.
- Never assume a button color. If `_ctaButtonColor` is null, look for `<button>` or `[class*="btn"]` elements in the extracted HTML and read their inline or class-based color from the source.
- A common mistake: using `#2563eb` (blue) when the site uses red. Inspect the actual value every time.

---

## Step 3 — Inspect logo/brand assets

Before writing any navbar or header component:

1. Scan the extracted `nav` HTML for `<img>` tags or `<svg>` elements.
2. If an `<img src="...">` exists, use that URL verbatim as the logo prop default.
3. If only an `<svg>` is present and it appears complete (has `<path>` elements), inline it.
4. If the SVG is truncated or empty (common when JS renders it client-side), do a targeted `WebFetch` on the brand's CDN or asset URL to find the real image file.
5. **Never** replace a logo with:
   - Styled text approximating the logo
   - A redrawn SVG
   - A placeholder image
   - An empty `src=""`

---

## Step 4 — Inspect navbar text color

The navbar text color must match the site. Common mistake: using black text when the site uses white (on a dark background) or using white text on a light background.

1. Read the extracted `nav` HTML.
2. Find the color of nav link text (look for `color:` in inline styles or infer from class names + the source CSS if available).
3. Use that exact color value in the CSS module.
4. Also check the navbar background color — use it exactly.

---

## Step 5 — Build each component

For every section with valid HTML (from Step 1), run the full `component-from-html` pipeline:

1. Pass the extracted HTML to the `component-from-html` skill as the source.
2. The skill handles: naming, prop extraction, JSX conversion, CSS module creation, Builder.io registration, and dual-page addition.
3. Apply the CTA button color from Step 2 to any button in the component.
4. Apply the logo from Step 3 to any navbar/header component.
5. Apply the correct navbar text + background color from Step 4 to the navbar component.

### Output — all relevant page files must be updated for every component:

| File | What goes here |
|------|---------------|
| `app/showcase/page.tsx` | A `<section>` block with the component name as `<h2>`, a one-sentence description, and the component rendered with real default props |
| `app/home/page.tsx` | The raw component tag only, in correct page order (navbar first, footer last), with no name/description wrappers |
| `app/page.tsx` | Only for the header/nav or footer component: wired into the homepage's header/footer slot around `<BuilderPageContent urlPath="/" />`. All other components are skipped here — they are Builder-managed content, not hardcoded. |

Do not skip the showcase or full-clone file. After all components are added, ensure `app/home/page.tsx` assembles into a coherent full-page clone, `app/showcase/page.tsx` shows each component in isolation, and `app/page.tsx` has exactly one header component and one footer component wired in (replacing any previous ones, never stacking).

---

## Output summary format

After all components are built:

```
Cloned from: https://example.com

Sections extracted:
✓ announcementBar → AnnouncementBar
✓ nav             → NavBar
✓ hero            → Hero
✓ featureCards    → FeatureCards
✓ carousel        → (not found — used ProductShowcase section instead) → ProductShowcase
✓ testimonials    → Testimonials
✓ footer          → Footer

CTA button color used: rgb(210, 0, 0)
Logo source: https://cdn.example.com/logo.svg

Components created: 7
All registered in builder-registry.ts ✓
All showcased in app/showcase/page.tsx (with name + description per section) ✓
All assembled in app/home/page.tsx (raw, full-page order) ✓
Homepage (app/page.tsx): NavBar wired into header slot, Footer wired into footer slot ✓
```

---

## Troubleshooting

**Connection timeouts / refusals:**
- Run `npm run test-browserless` to confirm `PUPPETEER_BROWSER_WS_ENDPOINT` is reachable and the API key is valid.
- Check that the endpoint URL and token haven't expired.

**"Target closed" / "Protocol error":**
- These are transient browserless.io connection drops. `render-page.js` retries automatically up to 3 times before surfacing an error — if it still fails after retries, re-run the command or check browserless.io's status.

**Bot detection / blocked pages:**
- Some sites detect and block headless browsers, returning empty or CAPTCHA-gated HTML.
- Fall back to `WebFetch` for server-rendered pages, or ask the user to paste the page's HTML directly from browser DevTools.
- Do not fabricate sections to work around a block — skip or substitute with a real alternative section instead.
