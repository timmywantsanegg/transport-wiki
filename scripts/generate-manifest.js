const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'public', 'content');
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'manifest.json');

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const fm = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Handle array syntax: tags: [LNER, steam, A1]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map(v => v.trim())
        .filter(Boolean);
    }

    fm[key] = value;
  }

  return fm;
}

function generateManifest() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const categories = fs.readdirSync(CONTENT_DIR).filter(name =>
    fs.statSync(path.join(CONTENT_DIR, name)).isDirectory()
  );

  const manifest = [];

  for (const category of categories) {
    const categoryDir = path.join(CONTENT_DIR, category);
    const files = fs.readdirSync(categoryDir).filter(f => f.endsWith('.md'));

    for (const file of files) {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(categoryDir, file), 'utf-8');
      const fm = parseFrontmatter(raw);

      manifest.push({
        slug: `${category}/${slug}`,
        title: fm.title || slug,
        category: fm.category || category,
        tags: fm.tags || [],
        excerpt: fm.excerpt || '',
        status: fm.status || 'complete',
      });
    }
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(manifest, null, 2));
  console.log(`Manifest generated: ${manifest.length} article(s) found.`);
}

generateManifest();