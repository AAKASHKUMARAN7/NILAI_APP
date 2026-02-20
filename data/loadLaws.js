// Nilai — Markdown Law Loader
// Reads .md files from data/laws/ and parses them into the same format as constitution.js
// Drop any .md file into data/laws/ and it gets auto-loaded into the knowledge base

const fs = require('fs');
const path = require('path');

// Use process.cwd() instead of __dirname because Next.js Webpack bundles
// change __dirname to .next/server/ at runtime. process.cwd() always points
// to the project root where the data/ folder lives.
const LAWS_DIR = path.join(process.cwd(), 'data', 'laws');

/**
 * Parse a single markdown file containing one or more law entries.
 * 
 * Format per entry:
 * ---
 * id: unique-id
 * category: Category Name
 * title: Entry Title
 * part: Part or Chapter
 * keywords: keyword1, keyword2, keyword3
 * ---
 * 
 * Text content of the entry goes here...
 * 
 * Multiple entries in one file are separated by a blank line then ---
 */
function parseMdFile(content, filePath) {
  const entries = [];
  
  // Split the file into individual entries
  // Each entry starts with --- (frontmatter start) and has a second --- (frontmatter end)
  // Then text content follows until the next entry's --- or end of file
  
  // Strategy: split on lines that are exactly "---" 
  const lines = content.split('\n');
  const blocks = [];
  let current = [];
  let dashCount = 0;
  
  for (const line of lines) {
    if (line.trim() === '---') {
      dashCount++;
      if (dashCount % 2 === 1 && current.length > 0) {
        // This is a new frontmatter start — save previous block
        blocks.push(current.join('\n'));
        current = [];
      }
      current.push(line);
    } else {
      current.push(line);
    }
  }
  if (current.length > 0) {
    blocks.push(current.join('\n'));
  }

  // Now parse each block
  for (const block of blocks) {
    const entry = parseEntry(block.trim(), filePath);
    if (entry) {
      entries.push(entry);
    }
  }

  return entries;
}

/**
 * Parse a single entry block (frontmatter + text)
 */
function parseEntry(block, filePath) {
  if (!block || block.length < 10) return null;

  // Find frontmatter between --- markers
  const frontmatterMatch = block.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!frontmatterMatch) return null;

  const frontmatterStr = frontmatterMatch[1].trim();
  const textContent = frontmatterMatch[2].trim();

  if (!textContent) return null;

  // Parse frontmatter key-value pairs
  const frontmatter = {};
  for (const line of frontmatterStr.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.substring(0, colonIdx).trim().toLowerCase();
    const value = line.substring(colonIdx + 1).trim();
    frontmatter[key] = value;
  }

  // Validate required fields
  if (!frontmatter.id || !frontmatter.title) {
    console.warn(`[Nilai Law Loader] Skipping entry in ${filePath}: missing id or title`);
    return null;
  }

  // Parse keywords from comma-separated string to array
  const keywords = frontmatter.keywords
    ? frontmatter.keywords.split(',').map(k => k.trim()).filter(k => k.length > 0)
    : [];

  return {
    id: frontmatter.id,
    category: frontmatter.category || 'General Law',
    title: frontmatter.title,
    text: textContent,
    keywords: keywords,
    part: frontmatter.part || 'General',
    source: 'md-file'  // Tag so we know this came from an MD file
  };
}

/**
 * Load all .md law files from the data/laws/ directory.
 * Skips README.md. Returns array of law entries in constitution.js format.
 */
function loadLawsFromMarkdown() {
  const allEntries = [];

  // Check if laws directory exists
  if (!fs.existsSync(LAWS_DIR)) {
    console.log('[Nilai Law Loader] No data/laws/ directory found. Skipping MD law loading.');
    return allEntries;
  }

  // Read all .md files
  const files = fs.readdirSync(LAWS_DIR)
    .filter(f => f.endsWith('.md') && f.toLowerCase() !== 'readme.md');

  for (const file of files) {
    const filePath = path.join(LAWS_DIR, file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const entries = parseMdFile(content, file);
      allEntries.push(...entries);
      console.log(`[Nilai Law Loader] Loaded ${entries.length} entries from ${file}`);
    } catch (err) {
      console.error(`[Nilai Law Loader] Error reading ${file}:`, err.message);
    }
  }

  console.log(`[Nilai Law Loader] Total: ${allEntries.length} law entries loaded from ${files.length} MD files`);
  return allEntries;
}

module.exports = { loadLawsFromMarkdown };
