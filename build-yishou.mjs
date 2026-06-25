import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const cwd = process.cwd();

// Build yishou-app as IIFE
console.log('Building yishou-app as IIFE...');
execSync('npx vite build', {
  cwd,
  env: { ...process.env, ENTRY_KEY: 'prototypes/yishou-app' },
  stdio: 'inherit',
});

// Check dist
const distDir = join(cwd, 'dist');
const distFile = join(distDir, 'yishou-app.js');
if (!existsSync(distFile)) {
  // Check other possible locations
  console.log('Checking dist contents:');
  function findJs(dir, depth) {
    if (depth > 3) return;
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = join(dir, e.name);
      if (e.isFile() && e.name.endsWith('.js')) {
        console.log('  Found:', p);
      } else if (e.isDirectory()) {
        findJs(p, depth + 1);
      }
    }
  }
  findJs(distDir, 0);
} else {
  console.log('Build successful!');
  const stat = statSync(distFile);
  console.log('yishou-app.js size:', (stat.size / 1024).toFixed(1) + 'KB');
}
