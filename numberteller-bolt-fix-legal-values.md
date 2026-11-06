# NumberTeller — legal page values (paste into Bolt)

Update the legal pages with the owner's confirmed details. Change nothing else.

## 1. Values in `src/config/site.ts` → `SITE.legal`

```ts
gstin: '27AAGCC9381F2ZD',
paymentProcessor: 'Cashfree Payments',
emailProvider: 'Resend',
aiProvider: '',            // no outside AI provider is used
```

Leave `cin`, `grievanceOfficerName` and `grievanceOfficerDesignation` as they are for now. The owner will send them.

## 2. Remove the AI-provider row and fix the AI wording

No outside AI provider is used. The features labelled "AI" run on NumberTeller's own rules-based engine. Apply these exact text edits to `src/content/legal/` (if the placeholder was already replaced, edit the equivalent rendered text):

### Edit 1 — `src/content/legal/terms-of-use.md`

**Find:**

````text
produced by automated systems, which may include rule-based algorithms and artificial-intelligence models.
````

**Replace with:**

````text
produced by automated, rules-based systems built into the Platform.
````

### Edit 2 — `src/content/legal/terms-of-use.md`

**Find:**

````text
3.3 Some features use third-party service providers, including hosting, database, email and (where applicable) artificial-intelligence providers.
````

**Replace with:**

````text
3.3 The Platform relies on third-party service providers for hosting, database, email and payments. Features labelled "AI" run on NumberTeller's own rules-based engine; no third-party artificial-intelligence provider is used.
````

### Edit 3 — `src/content/legal/terms-of-use.md`

**Find:**

````text
- are produced by automated calculation, rule-based logic and, for some features, artificial-intelligence models that can generate plausible but wrong text;
````

**Replace with:**

````text
- are produced by automated calculation and rules-based logic, including the features labelled "AI", and may contain errors;
````

### Edit 4 — `src/content/legal/privacy-policy.md`

**Find:**

````text
We do **not** sell or rent personal data. We do **not** use client data to train artificial-intelligence models, and we do not allow our providers to do so.
````

**Replace with:**

````text
We do **not** sell or rent personal data. We do **not** share client data with any artificial-intelligence provider. Features labelled "AI" run on NumberTeller's own rules-based engine.
````

### Edit 5 — `src/content/legal/privacy-policy.md`

**Find:**

````text
| {{AI_PROVIDER}} | Generating text for AI-assisted features such as name-correction narratives and tarot readings | Only the inputs needed for that request, which may include the client name and core numbers |
````

**Replace with:**

````text
(delete this table row entirely)
````

### Edit 6 — `src/content/legal/privacy-policy.md`

**Find:**

````text
| {{EMAIL_PROVIDER}} | Sending service emails | Name and email address |
````

**Replace with:**

````text
| Resend | Sending service emails | Name and email address |
````

### Edit 7 — `src/content/legal/privacy-policy.md`

**Find:**

````text
| {{PAYMENT_PROCESSOR}} | Processing payments | Billing data; card data goes to them directly |
````

**Replace with:**

````text
| Cashfree Payments | Processing payments | Billing data; card, UPI and bank details go to them directly |
````

### Edit 8 — `src/content/legal/billing-policy.md`

**Find:**

````text
{{PAYMENT_PROCESSOR}}
````

**Replace with:**

````text
Cashfree Payments
````

### Edit 9 — `src/content/legal/billing-policy.md`

**Find:**

````text
{{GSTIN}}
````

**Replace with:**

````text
27AAGCC9381F2ZD
````

## 3. "Last updated" shows twice

Each legal page shows "Last updated: 6 November 2026" twice: once in the page header and once from the markdown body. Keep the header version. Delete the `**Last updated:** …` line from the top of the body of all three markdown files, or skip rendering it.

## 4. Evidence

Paste the visible text of the Privacy Policy sharing table and the Billing Policy sections 3 and 4. Then confirm:

```bash
grep -rl "{{" dist/terms dist/privacy dist/billing-policy | wc -l    # expect 0
grep -ri "AI_PROVIDER\|artificial-intelligence provider" dist/privacy/index.html | head
```
