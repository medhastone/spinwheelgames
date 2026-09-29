# Cloudflare Worker CPU Limit Optimization & Performance Plan

Eliminate Cloudflare Worker **Error 1102 (exceeded CPU resource limits)** across `/fairness`, `/fair-randomness`, and all public tool routes by enforcing **SSG static pre-rendering (`force-static`)**, **ultra-fast edge redirects**, and **long-term Cloudflare CDN caching (`s-maxage=31536000`)**.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following strategies have been confirmed based on your requirements:

- **Confirmed Decision 1**: Pre-render all public tool and guide pages to static HTML (`export const dynamic = 'force-static'`) so Cloudflare Workers serve pre-built HTML assets instead of running heavy Next.js App Router SSR on every request.
- **Confirmed Decision 2**: Enforce long-term Cloudflare CDN Edge caching with `s-maxage=31536000, stale-while-revalidate=86400` in both `middleware.ts` and `next.config.ts`, ensuring Cloudflare's edge network serves responses in < 2ms without invoking Worker CPU.
- **Confirmed Decision 3**: Keep heavy Monte Carlo / Chi-Square randomness simulations purely client-side in browser Web Crypto (`crypto.getRandomValues()`), ensuring zero server-side computation cost.

---

## 1. Overview & Core Concept

- **Problem**: Cloudflare Workers on Free/Standard tiers enforce a **10ms CPU execution limit**. On-demand Next.js App Router server-side rendering (SSR) consumes 15–40ms CPU per request, triggering **Error 1102 (Worker exceeded resource limits)** on routes like `/fairness` or `/fair-randomness`.
- **Solution**: Shift all 40+ public routes to **100% Static Site Generation (SSG)** with explicit static export rules (`export const dynamic = 'force-static'`), zero-overhead edge middleware, and aggressive CDN cache headers.
- **Key Value**: 100% uptime, instant page loads (< 50ms TTFB worldwide via Cloudflare CDN), and zero Error 1102 CPU timeouts.

---

## 2. User Experience & Visual Design

- **Performance Experience**:
  - Instant response delivery directly from Cloudflare's global edge POPs.
  - Zero hydration layout shifts or server-side stalls.
- **Client-Side Interactive Simulation**:
  - On `/fairness`, the interactive Monte Carlo CSPRNG simulator runs entirely in the user's browser using `window.crypto.getRandomValues()` and offloads execution with non-blocking async loops.
- **Headers & Caching**:
  - `Cache-Control: public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400`
  - Instant 301 edge redirects for aliases like `/fair-randomness` $\to$ `/fairness`.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Full Static Pre-rendering (`force-static`) for all 40+ Routes**
  - *Chosen Approach*: Add `export const dynamic = 'force-static'` and `export const dynamicParams = false` across all static and dynamic slug routes (`app/[slug]`, `app/[slug]/[subslug]`, `app/fairness`, etc.).
  - *Why*: Reduces Worker CPU execution time per page request from ~30ms (SSR) down to 0ms (served directly as static edge assets).
- **Decision 2: Edge Caching Policy (`s-maxage=31536000`)**
  - *Chosen Approach*: Apply `s-maxage=31536000, stale-while-revalidate=86400` headers via `next.config.ts` and `middleware.ts`.
  - *Why*: Cloudflare CDN caches pages at edge nodes globally for up to 1 year, revalidating in the background. Subsequent requests never touch Worker CPU.
- **Decision 3: Optimized Edge Middleware Execution (< 0.2ms CPU)**
  - *Chosen Approach*: Optimize `middleware.ts` with O(1) Map lookups for redirects and early exit for static assets.
  - *Why*: Minimizes CPU ticks inside the Worker before any route handler is evaluated.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     Client Browser / Crawler Request                     │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      Cloudflare Global Edge CDN                         │
│   (Checks Cache: s-maxage=31536000, stale-while-revalidate=86400)      │
└──────────────────┬──────────────────────────────────┬───────────────────┘
                   │ Cache HIT (< 2ms)                │ Cache MISS
                   ▼                                  ▼
┌─────────────────────────────────────┐  ┌────────────────────────────────┐
│  Instant Edge Response (0ms CPU)    │  │  OpenNext Cloudflare Worker    │
│  Static HTML & Assets               │  │  Middleware (< 0.2ms CPU)     │
└─────────────────────────────────────┘  │  Serves Pre-rendered SSG HTML  │
                                         └────────────────────────────────┘
```

### Sub-Task Implementation Checklist

1. **Enforce `force-static` Across All Page Routes**:
   - Update all `app/**/page.tsx` files (including `app/fairness/page.tsx`, `app/[slug]/page.tsx`, `app/[slug]/[subslug]/page.tsx`, `app/dice/[slug]/page.tsx`, `app/category/[slug]/page.tsx`, etc.) to include:
     ```ts
     export const dynamic = 'force-static';
     export const dynamicParams = false;
     ```
2. **Optimize `middleware.ts` for Minimal CPU Overhead**:
   - Use fast O(1) set lookups for security filter blocks and redirect maps.
   - Attach explicit long-term CDN headers (`s-maxage=31536000, stale-while-revalidate=86400`).
3. **Configure `next.config.ts` Global Edge Cache Headers**:
   - Add security and caching header rules targeting `/:path*` with `s-maxage=31536000`.
4. **Build & Verify**:
   - Run `compile_applet` and `lint_applet` to confirm 100% clean SSG build and zero errors.
