import { chromium } from '/root/.bun/install/global/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'http://localhost:3000';
const PUB_DIR = '/app/applet/public/audit-screenshots';
const ART_DIR = '/.aistudio/artifacts/brain/5ab8a356-5583-4a64-9af4-6017ea5157f3';

try { fs.mkdirSync(PUB_DIR, { recursive: true }); } catch (e) {}
try { fs.mkdirSync(ART_DIR, { recursive: true }); } catch (e) {}

async function main() {
  const t0 = Date.now();
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    // Abort external network calls (like fonts.googleapis.com) in headless sandbox
    await context.route('https://**', (route) => route.abort());

    const page = await context.newPage();

    // 1. Navigate to /wheel-of-names?stream=1 and verify transparency + chrome hiding
    await page.goto(`${BASE_URL}/wheel-of-names?stream=1&theme=dark&size=lg&labels=outline&history=1`, {
      waitUntil: 'domcontentloaded'
    });
    await page.waitForTimeout(500);

    const domCheck = await page.evaluate(() => {
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      const nav = document.querySelector('nav');
      const htmlBg = window.getComputedStyle(document.documentElement).backgroundColor;
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content');
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      return {
        headerDisplay: header ? window.getComputedStyle(header).display : 'none',
        footerDisplay: footer ? window.getComputedStyle(footer).display : 'none',
        navDisplay: nav ? window.getComputedStyle(nav).display : 'none',
        htmlBg,
        bodyBg,
        robots,
        canonical
      };
    });

    // Save transparent PNG screenshot of wheel overlay
    const wheelPath = path.join(PUB_DIR, 'magenta-transparency-wheel.png');
    await page.screenshot({ path: wheelPath, omitBackground: true });
    try { fs.copyFileSync(wheelPath, path.join(ART_DIR, 'magenta-transparency-wheel.png')); } catch (e) {}

    // 2. Navigate to /dice/d20?stream=1&quality=low and capture transparent PNG screenshot
    await page.goto(`${BASE_URL}/dice/d20?stream=1&quality=low`, {
      waitUntil: 'domcontentloaded'
    });
    await page.waitForTimeout(500);
    const dicePath = path.join(PUB_DIR, 'magenta-transparency-dice.png');
    await page.screenshot({ path: dicePath, omitBackground: true });
    try { fs.copyFileSync(dicePath, path.join(ART_DIR, 'magenta-transparency-dice.png')); } catch (e) {}

    // 3. Test Remote Control API Latency
    const sessionId = `audit-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const tLat0 = performance.now();
    await fetch(`${BASE_URL}/api/stream-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: sessionId, action: 'spin' })
    });
    const getRes = await fetch(`${BASE_URL}/api/stream-session?id=${sessionId}`);
    const getJson = await getRes.json();
    const apiLatencyMs = Math.round(performance.now() - tLat0);

    console.log('=== PLAYWRIGHT AUDIT COMPLETE ===');
    console.log('Elapsed:', Date.now() - t0, 'ms');
    console.log('DOM Check:', JSON.stringify(domCheck));
    console.log('Remote API Sync Latency:', apiLatencyMs, 'ms | LastCommand:', getJson?.session?.lastCommand?.action);
    console.log('Screenshots saved:', fs.existsSync(wheelPath), fs.existsSync(dicePath));

    await context.close();
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
