# Skill: register-component

**Trigger:** User says "register this component", "add to builder", "register with Builder.io", or similar. Also called automatically as Step 2 of the `component-from-html` pipeline.

## Purpose

Register an existing component in the Builder.io registry file with a complete, correctly typed `inputs` array. Works generically — detects the registry file by content rather than assuming a filename.

---

## Step 0 — Find the Registry File

Look for a file that:
- Contains `builder.init(` and `Builder.registerComponent(`
- Is typically named `builder-registry.ts` at the project root, but may differ

Read the file to understand the existing import style and registration pattern before making changes.

---

## Step 1 — Read the Component

Read `components/{ComponentName}/index.tsx` to identify:
- Every prop in the `interface {ComponentName}Props`
- Each prop's TypeScript type
- Each prop's default value (from the destructured defaults)

---

## Step 2 — Map Props to Builder Input Types

| TypeScript type | Builder input type | Notes |
|---|---|---|
| `string` (short label/title) | `"string"` | |
| `string` (paragraph/body text) | `"longText"` | Use when the prop name contains: description, body, text, content, copy |
| `string` (a URL) | `"url"` | Use when the prop name contains: link, href, url, src (non-image) |
| `string` (an image URL) | `"file"` with `allowedFileTypes: ["jpeg","png","webp","svg"]` | Use when the prop name contains: imageUrl, logoSrc, backgroundImage, photoUrl |
| `boolean` | `"boolean"` | |
| `number` | `"number"` | |
| Union string literals (`'a' \| 'b' \| 'c'`) | `"string"` with `enum: ["a", "b", "c"]` | |

For every input, include `defaultValue` drawn from the component's existing prop defaults.

---

## Step 3 — Append to the Registry File

Add:
1. An import at the top of the file with the other imports:
   ```ts
   import {ComponentName} from './components/{ComponentName}';
   // or
   import {ComponentName} from './components/{ComponentName}/index';
   ```
   Match the import style (default vs named) used by other components in that file.

2. A `Builder.registerComponent()` call after the existing registrations:

```ts
Builder.registerComponent({ComponentName}, {
  name: '{ComponentName}',
  inputs: [
    {
      name: 'propName',
      type: 'string',
      defaultValue: 'Default text here',
    },
    {
      name: 'imageUrl',
      type: 'file',
      allowedFileTypes: ['jpeg', 'png', 'webp', 'svg'],
      defaultValue: 'https://real-image-url.com/image.jpg',
    },
    {
      name: 'ctaLink',
      type: 'url',
      defaultValue: 'https://example.com',
    },
    {
      name: 'isVisible',
      type: 'boolean',
      defaultValue: true,
    },
  ],
});
```

---

## Step 4 — Verify

After editing the registry file:
- Confirm no TypeScript errors (check that the import resolves correctly)
- Confirm the `inputs` array covers every prop in the component interface
- Confirm every `defaultValue` matches what the component actually uses

---

## After Registering

Confirm:
- Import added ✓
- `Builder.registerComponent()` call added with N inputs ✓

Then suggest running the `showcase-component` skill to add the component to the demo page.
