# numberteller.com — Site Audit fixes, round 2

**Apply every change exactly as written. Do not change anything not listed. Keep every page SSG so the fix is in the static HTML. Do not add copy of your own.**

Live check 7 Nov 2026 after round 1. **Already live — do not redo:** "Download the full sample PDF" box removed from /sample-report; /terms and /privacy links now `https://www.numberteller.com/`; new metas on /terms, /privacy, /learn/pythagorean-number-table.

## 1. URGENT (Vercel, not Bolt) — check the apex domain redirect
Live 7 Nov, fetching `https://numberteller.com/` returned a page (not a redirect to www), and that page's canonical was `https://numberteller.com/` — the wrong host (canonical host is www.numberteller.com). `https://numberteller.com/pricing` also returned a page (its canonical correctly says www). My fetch tool does not show status codes, so please confirm:
1. Vercel → Project → Settings → Domains → `numberteller.com` must show **Redirect to `www.numberteller.com` — 308 Permanent Redirect**. If it is set to serve the project instead, change it to the redirect.
2. `www.numberteller.com` stays the primary domain.
3. In the code, the homepage canonical must be hard-coded to `https://www.numberteller.com/` (not built from the request host). Same rule for every page: canonical and og:url always use `https://www.numberteller.com`.
4. Test: open `https://numberteller.com/pricing` in a private window — the address bar must end on `https://www.numberteller.com/pricing`.

## 2. Confirm the rest of round 1 (fix any that are missing)
**2a. Meta descriptions** — must be exactly:

| Page | Current meta (crawl 6 Nov, chars) | New meta description (exact) | Chars |
|---|---|---|---|
| `/contact` | Reach the NumberTeller team on WhatsApp, phone or email for demos, plan activation and support. (95) | Contact the NumberTeller team on WhatsApp, phone or email to book a demo, activate your plan or get support with the numerology software you use. | 145 |
| `/billing-policy` | How NumberTeller plans are billed, activated, renewed, cancelled and refunded. (78) | How NumberTeller numerology software plans are billed, activated, renewed, cancelled and refunded. Read the billing policy before you choose a plan. | 148 |
| `/learn/when-to-stop-reducing-numbers` | A clear rule set for when a number is reduced, kept as a master number or flagged as karmic debt. (97) | A clear rule set for numerologists on when to stop reducing a number: when to reduce, when to keep a master number, and when to flag karmic debt. | 145 |
| `/learn/lo-shu-grid-zeros-and-repeats` | How to treat zeros and repeated digits when plotting and reading the Lo Shu grid. (81) | How to treat zeros and repeated digits when you plot and read a Lo Shu grid, so each client chart you prepare shows the right count in every box. | 145 |

**2b. Organization JSON-LD on the homepage** — exactly the block in round-1 section 5 (name NumberTeller, url `https://www.numberteller.com/`, the header logo URL, support@numberteller.com, +91 79000 75531, parentOrganization Confiex Data Room Private Limited, the Malad West address).
**2c. Duplicate social tags** — each page outputs `og:image`, `twitter:card` and `twitter:image` once (default copies removed from index.html).

Then re-run Ahrefs Site Audit. Expected health: **100**.

Content flag (unchanged, not part of this file): /features/ai-tarot and /features/ai-numerology present AI as a product feature, against the standing rule.
