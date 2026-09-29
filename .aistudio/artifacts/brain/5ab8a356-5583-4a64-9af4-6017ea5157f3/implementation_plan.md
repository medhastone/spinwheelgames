# Production SEO & Technical QA Audit Plan

## Executive Summary
This plan details a complete technical QA and SEO audit of **SpinWheelGames.org**. We will run an automated audit script against the dev server to verify HTTP status codes, canonical headers, titles, H1s, meta descriptions, robots directives, JSON-LD schemas, and sitemap consistency across all primary canonical endpoints and redirected variants.

---

## 1. Audit Scope & Target URLs

### A. Core Target Pages & Redirect Verification
- **Homepage**: `/`
- **Primary Dice Engine**: `/dice-roller`
- **Single/Specialized Dice Landing Pages**: `/roll-1d4`, `/roll-4d6`, `/dnd-stat-roller`, `/dice-average-calculator`, `/unusual-dice`
- **301 Redirected Dice Variants**: `/roll-3d6`, `/roll-5d6`, `/roll-d3`, `/roll-2d12`
- **Flagship Wheel Tools**: `/wheel-of-names`, `/random-object-generator`
- **Crawl & Index Directives**: `/robots.txt`, `/sitemap.xml`, `/sitemaps/tools.xml`, `/sitemaps/categories.xml`, `/sitemaps/guides.xml`

### B. Audit Criteria
1. **HTTP Status**: 200 OK for canonicals; 301 Moved Permanently for redirected variants.
2. **Metadata**: Non-empty `<title>`, `<meta name="description">`, `<h1>`, `<link rel="canonical">`.
3. **Structured Data**: Valid JSON-LD scripts (`WebSite`, `WebApplication`, `BreadcrumbList`, `FAQPage`).
4. **Directives**: `index, follow` on canonicals; no accidental `noindex` or `disallow`.
5. **Sitemaps**: Exclusion of redirected/non-canonical URLs; inclusion of all indexable pages.

---

## 2. Execution Steps

1. **Audit Script Execution**:
   - Run a Node.js verification script against `http://localhost:3000` to fetch and audit all target URLs, headers, canonical tags, and JSON-LD payloads.

2. **Robots & Sitemap Feed Audit**:
   - Inspect `/robots.txt` and sitemap XML files to ensure only 200 OK indexable canonical URLs are present.

3. **Codebase Remediation**:
   - Fix any broken internal links, canonical header mismatches, missing schema fields, or sitemap discrepancies identified by the audit script.

4. **Build & Type Safety Verification**:
   - Run `npx tsc --noEmit` and `lint_applet` to confirm 0 compilation or linting errors.

5. **Generate Final Audit Report**:
   - Present the required 6-part report detailing:
     1. Issues found
     2. Issues fixed
     3. URLs redirected
     4. URLs removed/noindexed
     5. Remaining issues
     6. Performance improvements
