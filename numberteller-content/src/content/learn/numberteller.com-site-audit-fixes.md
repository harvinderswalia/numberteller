# numberteller.com — Ahrefs Site Audit fixes (Bolt instructions)

**Apply every change exactly as written. Do not change anything not listed. Keep every page SSG so the fix is in the static HTML. Do not add copy of your own.**

Source: Ahrefs Site Audit project 10663824, crawl finished **2026-11-06 15:17 UTC**, health score **94**, 62 internal URLs crawled — 4 URLs with errors, 11 with warnings, 55 with notices. Live check 7 Nov: the sample PDF URL still fails.

Fact rules: NumberTeller is numerology software for practising numerologists (Pythagorean method and Lo Shu grid), sold by Confiex Data Room Private Limited; canonical host is **www.numberteller.com**. Never frame AI as a product feature.

---

## ERRORS

### 1. 404 page — 1 URL · Page has links to broken page — 1 URL
| 404 URL | Linked from | Anchor |
|---|---|---|
| https://www.numberteller.com/sample-reports/numberteller-sample-report.pdf | https://www.numberteller.com/sample-report | "Download sample PDF" (box "Download the full sample PDF") |

Fix: if the sample PDF exists in the project, place it at `public/sample-reports/numberteller-sample-report.pdf` so it is served at that exact URL. If no such PDF exists, remove the "Download the full sample PDF" box from /sample-report. Do not create a new PDF.

### 2. HTTPS page has internal links to HTTP — 2 URLs (reconstructed; these are the other 2 of the 4 URLs with errors)
| Page | Link now | Change to |
|---|---|---|
| https://www.numberteller.com/terms | `http://www.numberteller.com` (anchor "www.numberteller.com", clause 1.1) | `https://www.numberteller.com/` |
| https://www.numberteller.com/privacy | link to `http://www.numberteller.com` (308 redirect in crawl) | `https://www.numberteller.com/` |
Keep the visible anchor text unchanged.

---

## WARNINGS

### 3. Meta description too short — 7 URLs (under 100 characters)
Replace `<meta name="description">` (and `og:description`, `twitter:description`):

| Page | Current meta (crawl 6 Nov, chars) | New meta description (exact) | Chars |
|---|---|---|---|
| `/contact` | Reach the NumberTeller team on WhatsApp, phone or email for demos, plan activation and support. (95) | Contact the NumberTeller team on WhatsApp, phone or email to book a demo, activate your plan or get support with the numerology software you use. | 145 |
| `/terms` | The terms that govern use of NumberTeller, the professional numerology platform for practitioners. (98) | The terms of use that govern access to NumberTeller, the professional numerology software for practising numerologists, from Confiex Data Room Pvt Ltd. | 151 |
| `/billing-policy` | How NumberTeller plans are billed, activated, renewed, cancelled and refunded. (78) | How NumberTeller numerology software plans are billed, activated, renewed, cancelled and refunded. Read the billing policy before you choose a plan. | 148 |
| `/privacy` | How NumberTeller collects, uses and protects your data and your clients' chart data. (84) | How NumberTeller collects, uses and protects your personal data and your clients' chart data when you use the numerology software and this website. | 147 |
| `/learn/pythagorean-number-table` | The A=1 to Z=8 letter values, how to treat Y and how to check your calculations. (80) | The Pythagorean number table for numerologists: letter values from A=1 to Z=8, how to treat the letter Y, and how to check each calculation you make. | 149 |
| `/learn/when-to-stop-reducing-numbers` | A clear rule set for when a number is reduced, kept as a master number or flagged as karmic debt. (97) | A clear rule set for numerologists on when to stop reducing a number: when to reduce, when to keep a master number, and when to flag karmic debt. | 145 |
| `/learn/lo-shu-grid-zeros-and-repeats` | How to treat zeros and repeated digits when plotting and reading the Lo Shu grid. (81) | How to treat zeros and repeated digits when you plot and read a Lo Shu grid, so each client chart you prepare shows the right count in every box. | 145 |

### 4. Temporary redirect (307) on the apex domain — reconstructed
| URL | Status | Redirects to |
|---|---|---|
| https://numberteller.com/ | 307 | https://www.numberteller.com/ |
| http://numberteller.com/ | 308 → 307 | https://numberteller.com/ → https://www.numberteller.com/ |
| https://numberteller.com/robots.txt | 307 | https://www.numberteller.com/robots.txt |

Fix (Vercel dashboard, not code): Project → Settings → Domains → `numberteller.com` → Edit → "Redirect to" `www.numberteller.com` with status **308 Permanent Redirect** (it is currently 307 Temporary). www stays the primary domain.

---

## NOTICES

### 5. Organization schema missing or incomplete — 1 URL (https://www.numberteller.com/)
The site has no JSON-LD at all. Add to the homepage `<head>` (static HTML), using only facts already published on /terms and in the footer:
```json
{"@context":"https://schema.org","@type":"Organization","name":"NumberTeller","url":"https://www.numberteller.com/","logo":"<absolute URL of the logo image already used in the site header>","email":"support@numberteller.com","telephone":"+91 79000 75531","parentOrganization":{"@type":"Organization","name":"Confiex Data Room Private Limited"},"address":{"@type":"PostalAddress","streetAddress":"Unit 302, Bldg 2, New Sonal Industrial Estate, Kachpada, Link Road, Malad West","addressLocality":"Mumbai","postalCode":"400064","addressRegion":"Maharashtra","addressCountry":"IN"}}
```

### 6. Other notices (55 URLs with notices)
The Ahrefs API returned only the first 100 issue types, and only "Organization schema missing" (1 URL) appears among them. The other notice-level URLs are in categories the API did not return (Links, Redirects, Sitemaps, Social tags, Localization, Usability). One crawl finding that fits: on all 53 HTML pages, `og:image` and `twitter:card`/`twitter:image` are each output **twice** (once from the default tags in `index.html`, once from the page's own tags). Fix: delete the default `og:image`, `twitter:card` and `twitter:image` tags from `index.html` so each page outputs each tag once (keep the per-page tags). Then check All issues in the Ahrefs UI after the re-crawl and send whatever is left to the next weekly run.

---

## Not fixed in code — and why
Nothing excluded. Every issue found in the data is fixed above.

**Content flag for Harvinder (not an Ahrefs issue, not changed):** the site has pages `/features/ai-tarot` and `/features/ai-numerology`, which present AI as a product feature — this conflicts with the standing no-AI-feature rule. Decide whether to rename or remove them; this file does not touch them.

**Expected result:** health **100** after the PDF fix and the 2 http→https links; warnings 11 → 0 after the metas and the 308 change.
