---
slug: "harmony-analysis"
seoTitle: "Numerology Harmony Analysis: Friendly Numbers | NumberTeller"
description: "Numerology harmony analysis for practitioners: Perfect, Friendly and Neutral pairs across LP, EX, SU and BD, plus a transparent 0–100 compatibility score."
eyebrow: "Silver (scores) · Gold (interpretation) · Platinum (Name Correction)"
h1: "Numerology Harmony Analysis with Friendly Number Groups"
heroSub: "Compare a client's core numbers, or two people's charts, with one documented friendship table and a scoring formula you can check by hand."
primaryCta: { label: "Start 3-day free trial", href: "/app/signup" }
secondaryCta: { label: "See a sample report", href: "/sample-report" }
plan: "Silver (scores) · Gold (interpretation) · Platinum (in Name Correction)"
mainKeyword: "numerology harmony analysis"
secondaryKeywords: ["friendly numbers in numerology", "numerology compatibility score", "number friendship table", "life path and expression harmony"]
related: ["/features/compatibility", "/features/name-correction", "/learn/friendly-numbers-number-harmony"]
updated: 2026-11-06
---

Numerology harmony analysis asks a practical question: do a client's core numbers support one another, or pull in different directions? The same question sits behind every compatibility reading and every name correction. This page sets out the exact rules NumberTeller uses, so you can check any result by hand.

## The practitioner problem

Harmony is where readings most often contradict each other. One practitioner calls 4 and 5 friendly; another calls them opposed. Both may be following a published table. The client, comparing notes, concludes that numerology is arbitrary.

The real issue is inconsistency, not disagreement. Schools publish different friendship tables, and none of them is the single correct one. What matters is that you choose one table, write it down and apply it to every client.

Numerology harmony analysis also scales badly by hand. A name correction session might test fifteen spellings. Each needs Expression and Soul Urge recalculated and then compared with the Life Path and Birthday. A clear, repeatable method saves time and prevents arithmetic slips.

## What it does

- **Pair-by-pair harmony labels using friendly numbers in numerology.** Each pair of numbers is labelled Perfect, Friendly or Neutral, with a matching value.
- **Internal chart harmony.** For one client, the app compares the pairs LP–EX, LP–SU and EX–SU. In name correction it adds the Birthday (BD) to those comparisons.
- **Two-person compatibility score.** For two people, Life Path, Expression and Soul Urge are compared and combined into a 0–100 score, with strengths and friction points. See the [compatibility feature](/features/compatibility) for romantic, business and family report types.
- **Interpretation (Gold and above).** Gold adds written interpretation of each pairing.
- **Harmony-driven name correction (Platinum).** [AI Name Correction](/features/name-correction) uses harmony-weighted scoring to rank spelling variants.

## How numerology harmony analysis works

### Step 1: compare by root

Each number is reduced to its root for the comparison. Master numbers are compared by root: 11/2 is treated as 2, 22/4 as 4 and 33/6 as 6. The master number is still displayed and preserved in the chart; only the harmony comparison uses the root.

### Step 2: label the pair

| Result | Rule | Value |
|---|---|---|
| Perfect | Both roots are the same number | 1.0 |
| Friendly | The two numbers are in each other's friendly group | 0.8 |
| Neutral | Anything else | 0.5 |

### Step 3: the friendly groups NumberTeller uses (its number friendship table)

| Number | Friendly group |
|---|---|
| 1 | 1, 2, 3, 5, 7 |
| 2 | 1, 2, 3, 4, 6, 8, 9 |
| 3 | 1, 2, 3, 5, 6, 9 |
| 4 | 2, 4, 6, 7, 8 |
| 5 | 1, 3, 5, 7 |
| 6 | 2, 3, 4, 6, 8, 9 |
| 7 | 1, 4, 5, 7 |
| 8 | 2, 4, 6, 8 |
| 9 | 2, 3, 6, 9 |

Different schools publish different friendship tables, some based on planetary rulers and some on odd–even groupings. If your table differs, read the app's labels as one consistent reference point and apply your own interpretation on top.

### Step 4: the numerology compatibility score

For two people, the app compares each dimension and weights it:

- Life Path: 40%
- Expression: 30%
- Soul Urge: 30%

Score = (weighted harmony − 0.5) × 2 × 100, clamped to 0–100.

Because Neutral is 0.5, the formula sets an all-Neutral pairing at 0. The anchor points are:

| All three dimensions | Weighted harmony | Score |
|---|---|---|
| Neutral | 0.5 | 0 |
| Friendly | 0.8 | 60 |
| Perfect | 1.0 | 100 |

The score is therefore a measure of harmony above neutral, not a percentage chance of success.

### Step 5: harmony in name correction

In name correction, the BD, LP, EX and SU pairs are scored the same way, with one adjustment. Where a pair is affected by over-energy (the same root in two or more core positions), its harmony is down-weighted to 0.4. That prevents a variant from scoring well just by duplicating a number. The [over-energy analysis page](/features/over-energy-analysis) explains the rule.

## Worked example

Both clients are fictional. Every figure was checked in Python, using this library's conventions: Life Path components reduced separately; each name part reduced separately (keeping master numbers), then added and reduced; Y treated as a consonant here.

### Part 1: one person's internal harmony

**Rohan Kapoor, born 7 June 1998.**

| Number | Working | Result |
|---|---|---|
| BD | 7 | **7** |
| LP | Day 7; month 6; year 1+9+9+8 = 27 → 9; 7 + 6 + 9 = 22 | **22/4** |
| EX | ROHAN 9+6+8+1+5 = 29 → 11; KAPOOR 2+1+7+6+6+9 = 31 → 4; 11 + 4 = 15 | **15/6** |
| SU | ROHAN O+A = 7; KAPOOR A+O+O = 13 → 13/4; 7 + 4 = 11 | **11/2** |

Now compare by root (LP 4, EX 6, SU 2, BD 7):

| Pair | Roots | Label | Value |
|---|---|---|---|
| LP–EX | 4 and 6 | Friendly | 0.8 |
| LP–SU | 4 and 2 | Friendly | 0.8 |
| EX–SU | 6 and 2 | Friendly | 0.8 |
| BD–LP | 7 and 4 | Friendly | 0.8 |
| BD–EX | 7 and 6 | Neutral | 0.5 |
| BD–SU | 7 and 2 | Neutral | 0.5 |

No root repeats, so there is no over-energy. Life Path and Expression harmony is good: the name sits well with the Life Path. The only Neutral pairs involve the Birthday 7, which is a point to discuss rather than a problem to fix.

### Part 2: a two-person compatibility score

**Ananya Iyer, born 7 September 1990.**

| Number | Working | Result |
|---|---|---|
| LP | Day 7; month 9; year 1990 → 19 → 1; 7 + 9 + 1 = 17 | **17/8** |
| EX | ANANYA 1+5+1+5+7+1 = 20 → 2; IYER 9+7+5+9 = 30 → 3; 2 + 3 = 5 | **5** |
| SU | ANANYA A+A+A = 3; IYER I+E = 14 → 14/5; 3 + 5 = 8 | **8** |

| Dimension | Rohan | Ananya | Label | Value | Weight | Weighted |
|---|---|---|---|---|---|---|
| LP | 22/4 | 17/8 | Friendly | 0.8 | 0.4 | 0.32 |
| EX | 15/6 | 5 | Neutral | 0.5 | 0.3 | 0.15 |
| SU | 11/2 | 8 | Friendly | 0.8 | 0.3 | 0.24 |
| **Total** | | | | | | **0.71** |

Score = (0.71 − 0.5) × 2 × 100 = **42**.

A 42 says the Life Paths and inner motivations sit comfortably together, while the way each expresses themselves (6 and 5) is neutral. In the reading you would explore how a responsibility-minded 6 and a freedom-minded 5 share daily life.

## Using it in a consultation

1. **Confirm your table.** Tell the client which friendship table you use, briefly. It frames everything that follows.
2. **Check the inputs.** Verify the spelling the client actually uses and their date of birth.
3. **Read the internal harmony first.** For couples, look at each person's own chart before comparing them.
4. **Present each dimension, not just the score.** Say which areas are Perfect, Friendly or Neutral and why.
5. **Explain what the number means.** Make clear that 42 measures harmony above neutral, not a pass mark.
6. **Turn friction into conversation.** Neutral pairs point to areas needing understanding, not incompatibility.
7. **Use name options carefully.** In name correction, compare variant scores alongside your own reading of each name.

## Which plan includes it

- **Silver (₹991/mo):** harmony and compatibility scores, with numeric output and numbers-only PDFs.
- **Gold (₹1,299/mo):** adds full written interpretation of harmony and compatibility, plus PDFs with interpretation text.
- **Platinum (₹1,499/mo):** adds AI Name Correction, a rules-based engine that applies this harmony scoring to rank the top 8 spelling variants with alignment percentages. You stay in control of which, if any, to recommend.

The 3-day free trial includes the Silver tools, with no card needed.

## Limits and responsible use

Numerology harmony analysis is an interpretive aid within numerology's own frame. A score does not predict whether a relationship or partnership will succeed. Never use it to tell a client to end a relationship or reject a partner.

The friendly groups are the ones NumberTeller uses. Other schools differ, and your own table may give different labels for the same pair. Comparing by root also simplifies master numbers; you may still wish to discuss the 11 or 22 tone in your interpretation.

Treat the score as a structure for the reading. Your knowledge of the client should always take priority.

## Frequently asked questions

### Which numbers are compared in a single chart?

Life Path with Expression, Life Path with Soul Urge, and Expression with Soul Urge. In name correction the Birthday is compared with each of these as well.

### How are master numbers handled?

They are compared by their root, so 11/2 counts as 2 and 22/4 as 4. The master number itself remains in the chart and in your interpretation.

### Why is an all-Neutral pairing scored 0?

The formula subtracts 0.5, the Neutral value, before scaling. So the score measures how far the pairing rises above neutral, from 0 up to 100.

### Can I use my own friendship table?

The app applies the friendly groups shown above. If you follow a different table, use the labels as a consistent reference and adjust your interpretation accordingly.

### Does a high score mean a name is correct?

No. A high score shows strong harmony under these rules. Whether a name suits the client also depends on their goals, their culture and your judgement.

## Related tools and guides

- [Compatibility](/features/compatibility): romantic, business and family compatibility reports.
- [AI Name Correction](/features/name-correction): harmony-weighted variant ranking.
- [Over-energy analysis](/features/over-energy-analysis): when repeated numbers lower a pair's weight.
- [Friendly numbers and number harmony](/learn/friendly-numbers-number-harmony): friendship tables across schools.
- [Numerology compatibility readings](/learn/numerology-compatibility-readings): structuring a relationship reading.
- [Y as vowel or consonant](/learn/y-vowel-or-consonant-numerology): why the Y convention changes Soul Urge.

---

**Share:** #Numerology #PythagoreanNumerology #Numerologist #NumerologyHarmony #FriendlyNumbers #NumerologyCompatibility #LifePathNumber #ExpressionNumber #SoulUrge #NameCorrection #MasterNumbers #NumberTeller
