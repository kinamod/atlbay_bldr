# Skill: create-component

**Trigger:** User says "create a component", "build a component", "make a new component", or similar.

## Purpose

Scaffold a new React component that matches this project's existing conventions: TypeScript, CSS Modules, and default exports. Works for any project — reads the codebase first to discover conventions rather than assuming them.

---

## Step 0 — Read Before Writing

Before creating any files:

1. Read 1–2 existing components in `components/` to understand:
   - How the `interface` / props are named and typed
   - Whether `'use client'` is used and when
   - How CSS module imports are written (`import styles from './styles.module.css'`)
   - The default export pattern
2. Read the existing `styles.module.css` of one component to understand class naming conventions (descriptive, camelCase, context-relevant names — not `.div-1`, `.wrapper-3`).

---

## Step 1 — Determine Files to Create

Create two files:

```
components/{ComponentName}/index.tsx
components/{ComponentName}/styles.module.css
```

Where `{ComponentName}` is PascalCase and derived from the component's purpose.

---

## Step 2 — Write the Component (`index.tsx`)

Rules:
- Add `'use client'` **only** if the component uses browser APIs, event handlers, or React hooks (useState, useEffect, etc.). Omit it otherwise.
- Define a TypeScript `interface {ComponentName}Props` for all props.
- Provide sensible default values for every prop.
- Use `import styles from './styles.module.css'` — no inline styles.
- Export the component as the **default export**.
- All class names must come from `styles.{descriptiveName}` — never generic names like `styles.div1`.

### Image & Logo Rule (CRITICAL — violations are bugs)

If the component includes any image or logo:

1. **Use the exact `src` URL from the source HTML/design.** If the provided HTML has `<img src="https://...">` use that URL verbatim as the prop default. Never replace it.
2. **If no URL exists in the source**, use web search to find the official CDN or asset URL from the brand's own website. Use that URL as the default.
3. **If no URL can be found**, ask the user for the logo file or URL. Do not proceed with a placeholder or SVG approximation.

What is NEVER acceptable:
- A text/word mark styled to look like a logo
- An SVG drawn from scratch approximating the logo
- A placeholder image (via.placeholder.com, coloured div, etc.)
- An empty `src` string or `""`

---

## Step 3 — Write the CSS Module (`styles.module.css`)

Rules:
- One class per visual element — no nesting (CSS Modules don't support it natively).
- Class names are **descriptive and camelCase**: `.heroContainer`, `.logoImage`, `.navLink` — never `.div7`, `.wrapper`.
- Preserve all original CSS values exactly (colours, font-sizes, spacing). Do not normalise or approximate.
- Use CSS shorthand where applicable: `padding: 10px` not four separate `padding-*` declarations.
- Maintain any media queries from the source with the same breakpoints and values.

---

## Example Output Structure

```tsx
// components/MyCard/index.tsx
import styles from './styles.module.css';

interface MyCardProps {
  title?: string;
  imageUrl?: string;
  linkHref?: string;
}

export default function MyCard({
  title = 'Default Title',
  imageUrl = 'https://example.com/real-image.jpg',
  linkHref = '/',
}: MyCardProps) {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={title} className={styles.cardImage} />
      <h3 className={styles.cardTitle}>{title}</h3>
      <a href={linkHref} className={styles.cardLink}>Learn more</a>
    </div>
  );
}
```

```css
/* components/MyCard/styles.module.css */
.card {
  background-color: rgb(239, 241, 241);
  padding: 20px;
}

.cardImage {
  width: 100%;
  vertical-align: middle;
}

.cardTitle {
  color: rgb(0, 50, 83);
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
}

.cardLink {
  color: rgb(0, 110, 173);
  transition: color 0.35s;
}
```

---

## After Creating

Once both files are written, confirm:
- `components/{ComponentName}/index.tsx` ✓
- `components/{ComponentName}/styles.module.css` ✓

Then suggest running the `register-component` skill to register it with Builder.io, and `showcase-component` to add it to the demo page.
