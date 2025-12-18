import fs from 'node:fs/promises';
import path from 'node:path';

// Copy your existing static homepage/assets into dist/ after Astro builds.
// This avoids relying on shell-based file copying (which can be brittle across environments).

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function copyFile(src, dest) {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(src, dest);
}

async function copyDir(srcDir, destDir) {
  await fs.mkdir(destDir, { recursive: true });
  const entries = await fs.readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const src = path.join(srcDir, entry.name);
    const dest = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      await copyDir(src, dest);
      continue;
    }

    if (entry.isFile()) {
      await copyFile(src, dest);
    }
  }
}

const COPY_PLAN = [
  // Homepage + its static dependencies
  { type: 'file', src: 'index.html', dest: 'index.html' },
  { type: 'file', src: 'styles.css', dest: 'styles.css' },
  { type: 'file', src: 'main.js', dest: 'main.js' },

  // SEO/crawl files
  { type: 'file', src: 'robots.txt', dest: 'robots.txt' },
  { type: 'file', src: 'sitemap.xml', dest: 'sitemap.xml' },

  // Static assets
  { type: 'dir', src: 'images', dest: 'images' },
];

if (!(await exists(DIST_DIR))) {
  throw new Error('dist/ was not found. Run `astro build` before running this script.');
}

for (const item of COPY_PLAN) {
  const srcPath = path.join(ROOT_DIR, item.src);
  const destPath = path.join(DIST_DIR, item.dest);

  if (!(await exists(srcPath))) {
    throw new Error(`Expected to copy missing path: ${item.src}`);
  }

  if (item.type === 'file') {
    await copyFile(srcPath, destPath);
    continue;
  }

  if (item.type === 'dir') {
    await copyDir(srcPath, destPath);
    continue;
  }

  throw new Error(`Unknown copy plan item type: ${item.type}`);
}

console.log('Copied existing static site files into dist/ successfully.');
