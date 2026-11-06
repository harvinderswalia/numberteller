import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist');

function findHtmlFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...findHtmlFiles(full));
    } else if (entry.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const htmlFiles = findHtmlFiles(distDir);
let stripped = 0;
let boltFound = false;
const longTitles: string[] = [];

for (const file of htmlFiles) {
  let content = readFileSync(file, 'utf-8');
  const before = content;

  // Strip any bolt.new references from meta tags
  content = content.replace(
    /<meta[^>]*bolt\.new[^>]*>\s*/gi,
    ''
  );

  if (content !== before) {
    stripped++;
  }

  // Check for remaining bolt.new references
  if (/bolt\.new/i.test(content)) {
    boltFound = true;
    console.error(`FAIL: bolt.new still referenced in ${file}`);
  }

  // Check title length (decode HTML entities for accurate char count)
  const titleMatch = content.match(/<title[^>]*>([^<]*)<\/title>/i);
  if (titleMatch) {
    const title = titleMatch[1]
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&rsquo;/g, '\u2019')
      .replace(/&mdash;/g, '\u2014')
      .replace(/&ndash;/g, '\u2013')
      .replace(/&hellip;/g, '\u2026');
    if (title.length > 60) {
      longTitles.push(`  ${file.replace(distDir, '')}: "${title}" (${title.length} chars)`);
    }
  }

  writeFileSync(file, content);
}

if (boltFound) {
  console.error('\nBuild FAILED: bolt.new references found in built HTML files');
  process.exit(1);
}

if (longTitles.length > 0) {
  console.error('\nBuild FAILED: titles over 60 characters:');
  longTitles.forEach((t) => console.error(t));
  process.exit(1);
}

if (stripped > 0) {
  console.log(`Stripped ${stripped} bolt.new meta tag(s) from built HTML`);
}

console.log(`Post-build check passed: ${htmlFiles.length} HTML files, no bolt.new references, all titles <= 60 chars`);
