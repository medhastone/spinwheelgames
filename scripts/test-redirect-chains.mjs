import fs from 'fs';

const middlewareCode = fs.readFileSync('middleware.ts', 'utf8');

// Extract REDIRECT_MAP
const mapMatch = middlewareCode.match(/const REDIRECT_MAP:\s*Record<string,\s*string>\s*=\s*({[\s\S]*?});/);
if (!mapMatch) {
  console.error('Could not extract REDIRECT_MAP');
  process.exit(1);
}

const mapStr = mapMatch[1];
const REDIRECT_MAP = eval('(' + mapStr + ')');

console.log('Testing', Object.keys(REDIRECT_MAP).length, 'redirect entries for chains or loops...');

let issuesFound = 0;

for (const [source, destination] of Object.entries(REDIRECT_MAP)) {
  // Check if destination is in REDIRECT_MAP (Chain)
  if (REDIRECT_MAP[destination]) {
    console.error(`CHAIN DETECTED: ${source} -> ${destination} -> ${REDIRECT_MAP[destination]}`);
    issuesFound++;
  }
  // Check if destination loops back to source
  if (REDIRECT_MAP[destination] === source) {
    console.error(`LOOP DETECTED: ${source} <-> ${destination}`);
    issuesFound++;
  }
}

if (issuesFound === 0) {
  console.log('SUCCESS: No redirect chains or loops found in REDIRECT_MAP!');
} else {
  console.error(`FAILURE: Found ${issuesFound} issues.`);
  process.exit(1);
}
