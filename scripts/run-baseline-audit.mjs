import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function findChrome() {
  const possiblePaths = [
    '/app/applet/chrome/linux-155.0.8059.79/chrome-linux64/chrome',
    './chrome/linux-155.0.8059.79/chrome-linux64/chrome',
  ];
  for (const p of possiblePaths) {
    const resolved = path.resolve(p);
    if (fs.existsSync(resolved)) return resolved;
  }
  // Recursive find inside ./chrome or /root
  if (fs.existsSync('./chrome')) {
    const files = [];
    function scan(dir) {
      for (const item of fs.readdirSync(dir)) {
        const full = path.join(dir, item);
        if (fs.statSync(full).isDirectory()) scan(full);
        else if (item === 'chrome') files.push(full);
      }
    }
    scan('./chrome');
    if (files.length > 0) return path.resolve(files[0]);
  }
  return null;
}

const baseUrl = 'http://127.0.0.1:3000';

const routes = [
  '/',
  '/dice/d10',
  '/dice-roller',
  '/roll-4d6',
  '/number-wheel',
  '/food-wheel'
];

async function run() {
  const chromePath = findChrome();
  console.log('Found Chrome path:', chromePath);
  if (!chromePath) {
    console.error('Chrome executable not found!');
    process.exit(1);
  }

  const results = [];
  console.log('Starting baseline measurement...');

  for (const route of routes) {
    const url = `${baseUrl}${route}`;
    const slug = route === '/' ? 'home' : route.replace(/[^a-zA-Z0-9]/g, '_');
    const outputPath = `baseline_${slug}.json`;

    console.log(`Running Lighthouse for ${route}...`);
    try {
      execSync(
        `CHROME_PATH="${chromePath}" npx lighthouse "${url}" ` +
        `--chrome-flags="--headless --no-sandbox --disable-dev-shm-usage --disable-gpu" ` +
        `--output=json --output-path="${outputPath}" ` +
        `--only-categories=performance --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate`,
        { stdio: 'inherit' }
      );

      if (fs.existsSync(outputPath)) {
        const data = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
        const audits = data.audits || {};
        
        const score = data.categories?.performance?.score != null ? Math.round(data.categories.performance.score * 100) : 'N/A';
        const lcp = audits['largest-contentful-paint']?.displayValue || 'N/A';
        const tbt = audits['total-blocking-time']?.displayValue || 'N/A';
        const cls = audits['cumulative-layout-shift']?.displayValue || 'N/A';
        const inp = audits['interaction-to-next-paint']?.displayValue || 'N/A';
        
        const lcpElem = audits['largest-contentful-paint-element']?.details?.items?.[0]?.node?.snippet || 
                        audits['largest-contentful-paint-element']?.details?.items?.[0]?.node?.nodeLabel || 'N/A';

        const scriptSummary = audits['resource-summary']?.details?.items?.find(i => i.resourceType === 'script');
        const totalJS = scriptSummary ? `${Math.round(scriptSummary.transferSize / 1024)} KB` : 'N/A';
        
        const unusedJSBytes = audits['unused-javascript']?.details?.overallSavingsBytes || 0;
        const unusedJS = `${Math.round(unusedJSBytes / 1024)} KB`;

        results.push({
          route,
          score,
          lcp,
          tbt,
          inp,
          cls,
          totalJS,
          unusedJS,
          lcpElem: lcpElem.length > 60 ? lcpElem.substring(0, 57) + '...' : lcpElem
        });
        console.log(`Completed ${route}: Score=${score}, LCP=${lcp}, TBT=${tbt}, CLS=${cls}, JS=${totalJS}`);
      }
    } catch (err) {
      console.error(`Error auditing ${route}:`, err.message);
    }
  }

  fs.writeFileSync('baseline-results.json', JSON.stringify(results, null, 2));
  console.log('Baseline measurement complete!');
  console.log(JSON.stringify(results, null, 2));
}

run();
