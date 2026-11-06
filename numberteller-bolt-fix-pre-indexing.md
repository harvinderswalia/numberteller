# NumberTeller — pre-indexing fixes (paste into Bolt)

A live check of all 53 sitemap URLs found these issues. Fix them, rebuild, republish, and paste back the evidence in section 5.

## 1. Five feature pages are still the short round-1 versions

These pages render only ~600 words with the old template sections ("The problem it solves / What it calculates / Rules applied / Name correction FAQ"). Their full markdown files are already in `src/content/features/`:

- `/features/name-correction` → `name-correction.md`
- `/features/business-numerology` → `business-numerology.md`
- `/features/ai-tarot` → `ai-tarot.md`
- `/features/pdf-reports` → `pdf-reports.md`
- `/features/lo-shu-grid` → `lo-shu-grid.md`

Render all five from their markdown files with the same markdown feature-page component used for `/features/over-energy-analysis`: frontmatter hero, table of contents, mid-page CTA, FAQ schema, share bar and related cards. Delete the old hard-coded components for these five. Each should then show about 1,700 words. Keep the template only for `core-chart`, `compatibility`, `transit-chart`, `karmic-lessons` and `house-car-mobile`.

## 2. Remove the Bolt default image tag

Every page's `<head>` still contains:

```html
<meta name="twitter:image" content="https://bolt.new/static/og_default.png">
```

Remove it. It may be added by the template `index.html` or injected at publish time. Every page must have exactly one `og:image` and one `twitter:image`, both `https://www.numberteller.com/og/numberteller-og.png`.

If Bolt's publish step re-adds the tag, add a post-build step that strips any `bolt.new` meta tag from `dist/**/*.html`, and make the build fail if `bolt.new` appears in any built HTML.

## 3. Titles over 60 characters

Twenty-two article titles and `/features/karmic-lessons` exceed 60 characters because " | NumberTeller" is appended to titles that are already long. For example: "How to Calculate a Life Path Number: A Practitioner's Guide | NumberTeller" is 74 characters.

Rule for `<title>`, `og:title` and `twitter:title`:
- If the page title plus " | NumberTeller" is 60 characters or fewer, use that.
- Otherwise use the page title alone (or `seoTitle` from frontmatter if present), with no suffix.
- If that is still over 60, cut at a word boundary to 57 characters and add "…".
- The visible H1 stays unchanged.

The build must fail if any `<title>` is over 60 characters.

## 4. Do not change anything else

Leave the legal placeholders as they are; the owner will supply the values separately.

## 5. Evidence to paste back

```bash
grep -rl "bolt.new" dist --include=*.html | wc -l            # must be 0
for f in name-correction business-numerology ai-tarot pdf-reports lo-shu-grid; do
  echo $f $(sed -e 's/<[^>]*>/ /g' dist/features/$f/index.html | wc -w); done   # each ~1,800+
```

Also paste a table of every built page: path · `<title>` · character count. None over 60.
