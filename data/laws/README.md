# How to Add New Laws to ARAM

Drop `.md` files into this folder (`data/laws/`) and ARAM will automatically load them into its knowledge base.

## File Format

Each `.md` file should use this structure:

```markdown
---
id: unique-id-here
category: Category Name
title: Full Title of the Law
part: Part or Section
keywords: keyword1, keyword2, keyword3
---

The full text of the law goes here. You can write as much as you want.

Multiple paragraphs are supported.

---

You can add MULTIPLE entries in a single file by separating them with `---` (three dashes on their own line).

---
id: another-entry
category: Same or Different Category
title: Another Section Title
part: Part X
keywords: word1, word2
---

Text for the second entry goes here.
```

## Rules

1. **id** — A unique identifier (use lowercase, hyphens). Example: `bnss-sec-1`, `bns-sec-103`
2. **category** — Group name. Examples: `Bharatiya Nyaya Sanhita`, `New Criminal Law`, `Digital Personal Data Protection`
3. **title** — Human-readable title that appears in responses
4. **part** — Optional grouping. Examples: `Chapter I`, `Part III`
5. **keywords** — Comma-separated words that help the search engine find this entry
6. **Text** — Everything after the second `---` until the next entry

## Examples

See the sample files in this folder for reference:
- `sample_bns.md` — Bharatiya Nyaya Sanhita (BNS) sample entries
- `sample_dpdp.md` — Digital Personal Data Protection Act sample

## Tips

- Use lots of **keywords** — include everyday language people would use, not just legal terms
- Write **text** in plain, accessible language
- You can split a large law across multiple files or put everything in one file
- Changes are picked up on server restart (restart `npm run dev`)
