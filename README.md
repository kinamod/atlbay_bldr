# Builder.io Component Demo

This app demonstrates the **Fusion → Builder Publish workflow**: create custom React components using Fusion (Builder.io's AI assistant), then use them as drag-and-drop blocks in Builder's visual editor.

**Perfect for demos showing:**
- AI-generated custom components (Fusion)
- No-code page building (Builder Publish)
- Developer + marketer collaboration

## ⚠️ Prerequisites

### 1. Deploy to a Public URL (Required)
Builder.io's visual editor requires a **publicly accessible URL** to preview and edit your pages. Localhost won't work for Builder.io integration.

**Recommended hosting platforms** (all have free tiers):
- ✅ **Vercel** - Best for Next.js, one-click deploy
- **Netlify** - Great alternative
- **Railway, Render, Fly.io** - Other options

**Why?** Builder.io needs to:
- Fetch your app's content for preview
- Enable real-time editing in the visual editor
- Publish live pages accessible to end users

### 2. Builder.io API Key
Get your API key from [Builder.io Account Settings](https://builder.io/account/organization)

## 🚀 Quick Deploy

### Deploy to Vercel (Recommended)

**Option A: One-Click Deploy**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kinamod/f2p&env=NEXT_PUBLIC_BUILDER_API_KEY&envDescription=Builder.io%20API%20Key&envLink=https://builder.io/account/organization)

**Option B: CLI**
```bash
npm i -g vercel
vercel
# Follow prompts, then set environment variable in Vercel dashboard
```

**Set Environment Variable:**
1. Go to your Vercel project → Settings → Environment Variables
2. Add: `NEXT_PUBLIC_BUILDER_API_KEY` = `your_api_key_here`
3. Redeploy to apply changes

### Alternative Platforms

**Netlify:**
```bash
npm i -g netlify-cli
netlify deploy --prod
# Set NEXT_PUBLIC_BUILDER_API_KEY in Netlify dashboard
```

**Railway / Render:**
- Connect your GitHub repo
- Set `NEXT_PUBLIC_BUILDER_API_KEY` environment variable
- Deploy automatically

## 📋 Demo Flow

### Step 0: One-Time Setup (5 min)
1. Deploy this app to Vercel (or your preferred platform) using the deploy button above
2. Set `NEXT_PUBLIC_BUILDER_API_KEY` environment variable in your hosting dashboard
3. Note your deployed URL (e.g., `https://your-app.vercel.app`)

### Step 1: Create Components in Fusion
- Use Fusion to generate custom React components
- Components are automatically created in `components/` directory
- Styled with CSS Modules (`styles.module.css`)

### Step 2: Auto-Registration
- Components are registered in `builder-registry.ts`
- They become available in Builder.io's component library

### Step 3: Open in Builder.io Editor
- Go to [Builder.io Content](https://builder.io/content)
- Create new page content
- Set URL path (e.g., `/demo`)
- Builder loads your deployed app's components

### Step 4: Drag & Drop
- Find your custom components in the left panel
- Drag them onto the canvas
- Edit props in the right sidebar
- See live preview

### Step 5: Publish
- Click "Publish" in Builder.io
- Visit `https://your-app.vercel.app/demo` (or your URL + path)
- Your page is live with custom components!

**This demo showcases:**
- How developers build custom components once (Fusion)
- How marketers drag-and-drop those components to build pages (Builder Publish)
- The power of AI + no-code publishing

## 💻 Local Development

For development and testing locally (note: Builder.io integration requires deployed app):

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the homepage, or [http://localhost:3000/showcase](http://localhost:3000/showcase) to see the component showcase.

**⚠️ Note:** Builder.io's visual editor won't work with localhost. Deploy to a public URL for full functionality.

You can start editing the homepage by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 🌐 Quick Start: Cloning a Website

Fusion can clone a live website's sections into Builder components using a remote headless browser (via [browserless.io](https://www.browserless.io/)).

### 1. Get a browserless.io API key

Sign up at [browserless.io](https://www.browserless.io/) and copy your API key/token from the dashboard.

### 2. Set the environment variables

Add these to your Builder.io project settings:

```
PUPPETEER_BROWSER_WS_ENDPOINT=wss://chrome.browserless.io?token=YOUR_API_KEY
NEXT_PUBLIC_BUILDER_API_KEY=your-builder-api-key
```

### 3. Verify your setup

```bash
npm run test-browserless
```

This checks the WebSocket connection, validates your API key, and confirms page creation/navigation work before you attempt a clone.

### 4. Clone a site

```bash
npm run clone -- https://example.com
```

Or ask Fusion directly: "clone this site: https://example.com".

### Troubleshooting

**Connection timeouts:**
- Confirm `PUPPETEER_BROWSER_WS_ENDPOINT` is correct and reachable from your network.
- Run `npm run test-browserless` to isolate the failure.

**"Target closed" / "Protocol error":**
- These are transient browserless connection errors. `scripts/render-page.js` automatically retries up to 3 times before failing.

**Authorization failures (401/403):**
- Your browserless.io token is invalid, expired, or missing from the endpoint URL.

**Network unreachable:**
- Check DNS resolution and outbound network access to the browserless.io host.

**Bot detection / blocked pages:**
- Some sites block headless browsers. If cloning fails, try again later, or paste the page's HTML directly (from browser DevTools) for Fusion to work from instead.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 📚 Learn More

To learn more about Next.js and Builder.io:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Builder.io Documentation](https://www.builder.io/c/docs/developers) - Builder.io developer guides
- [Custom Components Guide](https://www.builder.io/c/docs/custom-components) - How to register components

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🏗️ Project Structure

```
├── app/
│   ├── page.tsx              # Homepage (/): hardcoded header + Builder Publish content + hardcoded footer
│   ├── showcase/
│   │   └── page.tsx          # Component showcase (/showcase)
│   ├── home/
│   │   └── page.tsx          # Full static page clone (/home)
│   └── [...page]/
│       └── page.tsx          # Catch-all for all other Builder.io pages
├── components/
│   └── builder.tsx           # Builder.io rendering (RenderBuilderContent, BuilderPageContent)
├── builder-registry.ts       # Component registration
└── .builderrules            # Project conventions
```

## 🎨 Creating New Components

Follow these steps to add components that appear in Builder.io:

1. Create component in `components/YourComponent/YourComponent.tsx`
2. Add styles in `components/YourComponent/styles.module.css`
3. Register in `builder-registry.ts` with `Builder.registerComponent()`
4. Component automatically available in Builder.io editor

See `.builderrules` for detailed component creation guidelines.

## 🔧 Troubleshooting

**Builder.io editor shows 404 or can't load components:**
- Ensure your app is deployed to a public URL (not localhost)
- Verify `NEXT_PUBLIC_BUILDER_API_KEY` is set in your hosting platform
- Check that you've created content in Builder.io with the correct URL path

**Components not appearing in Builder.io:**
- Confirm components are registered in `builder-registry.ts`
- Check that the file is imported in your page routes
- Redeploy after adding new components

**Environment variable not working:**
- Ensure the variable name is exactly `NEXT_PUBLIC_BUILDER_API_KEY`
- Redeploy after adding/changing environment variables
- Check that the API key is correct in Builder.io account settings

## 📞 Support

- **Builder.io Documentation**: https://www.builder.io/c/docs/help
- **Next.js Deployment Docs**: https://nextjs.org/docs/app/building-your-application/deploying

---

**Built with:** Next.js 16, React 19, TypeScript, Builder.io SDK  
**Node Version:** 18+
