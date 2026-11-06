---
slug: "saved-client-charts"
seoTitle: "Save & Manage Client Numerology Charts | NumberTeller"
description: "Numerology client management software: unlimited saved charts, naming and renaming, secure storage and any-device access on every plan."
eyebrow: "All plans · Unlimited saved charts"
h1: "Saved client charts for a growing numerology practice"
heroSub: "Keep every client's chart in one secure place, open it on any device and build a history you can return to at each annual review."
primaryCta: { label: "Start 3-day free trial", href: "/app/signup" }
secondaryCta: { label: "See a sample report", href: "/sample-report" }
plan: "Silver · Gold · Platinum (all plans)"
mainKeyword: "numerology client management software"
secondaryKeywords: ["save numerology charts", "numerology client records", "annual numerology review", "DPDP for numerologists"]
related: ["/features/pdf-reports", "/features/transit-chart", "/learn/numerology-practice-technology"]
updated: 2026-11-06
---

Every returning client starts the same way: "Can you remind me what my numbers were?" If you have to recalculate from scratch, you lose time and risk a different answer. Numerology client management software keeps each chart saved and ready, so a returning client picks up exactly where you left off.

## The practitioner problem

A busy practice soon holds hundreds of charts. They live in notebooks, spreadsheets, phone notes and email attachments. Finding last year's reading for one client can take longer than the reading itself.

Recalculating is not a neutral fix. If you have refined your conventions since, a fresh calculation may differ from what you told the client before. The client then wonders which version was right.

There is also a duty of care. Client charts contain full names and dates of birth, sometimes of children. Scattered files on several devices are hard to secure and hard to delete when a client asks.

## What the numerology client management software does

- **Unlimited saved charts on every plan.** Silver, Gold and Platinum all include unlimited saved charts per account.
- **Load from the dashboard.** Open any saved chart from your dashboard and continue working.
- **Name and rename.** Give each chart a clear label and change it later as your system develops.
- **Any device.** Charts are stored in the cloud, so you can open them on your laptop, tablet or phone.
- **Encrypted at rest.** Charts are held in secure cloud storage (Supabase) and encrypted at rest.
- **Row-level security.** Each account sees only its own charts. Another practitioner's account cannot list or open yours.

## How it works

When you finish a chart, you save it to your account with a name. It then appears on your dashboard, where you can reopen it, rename it or export it as a [PDF report](/features/pdf-reports).

Because the chart is stored, you are not relying on memory or loose notes. You can open the same chart before every session and see the same numbers you discussed last time.

### Building a client history

A single saved chart is useful. A history is more useful still. Over several years, your saved charts let you:

- see which Personal Year the client was in when they made a major decision;
- compare a name before and after a correction;
- keep separate charts for a client's business, family members or partners;
- prepare an annual review in minutes rather than an hour.

The value comes from consistency. If every chart is named the same way and saved after every session, your records become a working tool. That is the real purpose of numerology client management software: not storage for its own sake, but continuity for the client.

### Keeping charts for related people

Families often consult together. A parent may ask for a child's chart, a couple for a compatibility reading, or a founder for a business name. Save each as its own chart, but use a shared prefix so they sit together on your dashboard. When one family member returns, you can see the related charts at once and avoid contradicting an earlier reading.

## Worked example: a naming convention and an annual review

### A simple naming convention

Choose one format and use it for every chart. Here is one that sorts well and stays readable:

`Surname, First name · DOB YYYY-MM-DD · Chart type · Note`

| Situation | Chart name |
|---|---|
| First reading | Sharma, Priya · 1990-08-15 · Core |
| Name correction option | Sharma, Priya · 1990-08-15 · Name option B |
| Annual forecast | Sharma, Priya · 1990-08-15 · Forecast 2027 |
| Couple reading | Sharma, Priya + partner · Compatibility |
| Client's business | Sharma, Priya · Business · Candidate name |

Putting the surname first groups families together. The ISO date (YYYY-MM-DD) avoids confusion between day-first and month-first formats. It also separates two clients with the same name.

Avoid putting sensitive notes in the chart name, such as health issues or relationship problems. Names are visible at a glance on your dashboard.

### An annual review workflow

Our fictional sample client, **Priya Sharma**, was born on 15 August 1990. She returns each December for a forecast of the coming year. Her Personal Year for 2027 was verified with a Python script.

| Step | Working | Result |
|---|---|---|
| Birth month | August | 8 |
| Birth day | 15 → 1 + 5 | 6 |
| Calendar year | 2 + 0 + 2 + 7 = 11 | 11 (master, kept) |
| Total | 8 + 6 + 11 = 25 → 2 + 5 | **25/7** |

This uses the library convention: reduce each part separately and keep master numbers. Whatever convention you use, apply it to every client and every year.

Her review then follows a routine:

1. **Open her saved Core chart.** Confirm her name spelling and date of birth have not changed.
2. **Open last year's forecast.** Her 2026 Personal Year was 15/6. Note what she reported about that year.
3. **Create the new forecast.** Calculate the 2027 Personal Year of 25/7 in the [Transit Chart](/features/transit-chart), which shows the current year and the next two.
4. **Save it with the naming convention.** "Sharma, Priya · 1990-08-15 · Forecast 2027".
5. **Export and send the report.** Use the PDF level that matches your plan.
6. **Set a reminder for next year.** Book the next review before her 2028 cycle begins.

## Using it in a consultation

1. **Get consent before you save.** Tell the client you will store their name and date of birth to prepare their reading and future reviews.
2. **Calculate and check the chart.** Confirm spellings and dates with the client.
3. **Save with your naming convention.** Do this during or straight after the session.
4. **Link related charts by name.** Use the same surname and date prefix for business, name options and forecasts.
5. **Reopen before the next session.** Review the previous chart and your notes before the client arrives.
6. **Review and tidy each year.** Remove charts you no longer need and update names if your convention changes.

## Data protection for practitioners

In India, the Digital Personal Data Protection (DPDP) framework applies to personal data such as names and dates of birth. When you collect a client's data and decide how it is used, you act as the **Data Fiduciary** for that data. NumberTeller provides the storage; responsibility for how you collect and use client data rests with you.

Good practice that fits the DPDP approach:

- **Get consent.** Explain what you collect, why and how long you keep it. Record that the client agreed.
- **Parental consent for children.** If you prepare a chart for a child, get consent from a parent or guardian.
- **Collect only what you need.** A name and date of birth are usually enough. Do not store unrelated personal details.
- **Use it only for the agreed purpose.** Do not reuse client data for marketing without separate consent.
- **Delete on request.** If a client asks you to remove their data, delete their saved charts and any exported PDFs you hold.
- **Keep access to yourself.** Do not share your account login with assistants or family members.

This is general guidance, not legal advice. If your practice is large or handles sensitive cases, take advice from a qualified professional.

## Which plan includes it

Saved client charts are included on every plan:

- **Silver (₹991/mo):** unlimited saved charts with all calculators and numeric output.
- **Gold (₹1,299/mo):** unlimited saved charts plus written interpretations.
- **Platinum (₹1,499/mo):** unlimited saved charts plus the full advanced toolset.

The 3-day free trial includes the Silver tools, with no card required.

## Limits and responsible use

Saved charts store your calculations. This numerology client management software is not a full practice-management system with invoicing, appointments or messaging. Keep those in the tools you already use.

Security features protect stored charts, but you control your own devices and login. Use a strong password, sign out of shared computers and keep exported PDFs safe.

If you change a calculation convention, older saved charts may reflect the previous method. Note the change and recalculate active clients so their records stay consistent.

## Frequently asked questions

### Is there a limit on how many charts I can save?

No. Every plan includes unlimited saved charts per account.

### Can I open my charts on my phone?

Yes. Charts are stored in the cloud, so you can load them from your dashboard on any device.

### Can anyone else see my clients' charts?

Row-level security means each account sees only its own charts. Charts are also encrypted at rest.

### What should I do when a client asks me to delete their data?

Delete their saved charts from your dashboard and remove any exported PDFs or notes you hold elsewhere. Confirm to the client that you have done so.

### Can I rename a chart after saving it?

Yes. You can name and rename charts at any time, which helps when you adopt a new naming convention.

## Related tools and guides

- [PDF reports](/features/pdf-reports) for client-ready exports
- [Transit Chart](/features/transit-chart) for annual review forecasts
- [Personal Year numbers](/learn/personal-year-numbers)
- [Technology in numerology practice](/learn/numerology-practice-technology)
- [Common numerology calculation errors](/learn/common-numerology-calculation-errors)

---

**Share:** #Numerology #PythagoreanNumerology #Numerologist #NumerologyPractice #NumerologyClients #ClientRecords #PersonalYear #AnnualReview #DataProtection #DPDP #NumerologyForecast #NumberTeller
