# Implementation Plan: Cloudflare Pages SSR / Edge Worker Deployment

## 1. Objective
Ensure the Next.js 15 App Router codebase builds and deploys seamlessly on **Cloudflare Pages with Next.js SSR / Edge Worker** (`.open-next/worker.js` / `.next`).

---

## 2. Technical Strategy & Fixes

### A. Cloudflare OpenNext & Worker Configuration
1. **`open-next.config.ts`**:
   - Use `@opennextjs/cloudflare` configuration with `defineCloudflareConfig()`.
2. **`wrangler.jsonc`**:
   - Set `"main": ".open-next/worker.js"` with `"nodejs_compat"` flag and `"compatibility_date": "2024-09-23"` (or latest).
   - Configure asset binding for static files (`.open-next/assets`).

### B. Next.js App Router Edge & Server Compatibility
1. **API Routes (`app/api/*`)**:
   - Ensure `app/api/contact/route.ts`, `app/api/share/route.ts`, and `app/api/share/[id]/route.ts` are fully Web-Standard compliant (standard `Request` and `NextResponse.json`).
   - Add explicit dynamic configuration where appropriate so prerendering does not fail.
2. **Dynamic Route Redirects (`app/w/[id]`)**:
   - Ensure dynamic params use Next.js 15 async promise resolution cleanly.

### C. Build Command & Verification
- Test Next.js build locally (`npm run build`) to ensure all 220 routes compile cleanly.
- Provide step-by-step instructions for Cloudflare Pages dashboard build settings.

---

## 3. Verification Plan
- Run `compile_applet` and `lint_applet` to confirm 0 compilation errors across all 220 routes.
