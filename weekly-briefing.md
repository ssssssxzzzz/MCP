---
name: weekly-briefing
description: Produce the Agile Lab Services ZoomInfo weekly (or on-demand) briefing for Slack.
---

# Weekly / on-demand ZoomInfo briefing

## When to use

User asks for a weekly brief, daily light brief, industry pulse, competitor pulse, or a scheduled run fires.

## Steps

1. Call `get_watchlist` first.
2. Call ZoomInfo `get_gtm_context` (free) to refresh ICP.
3. **Free scans only** unless the user explicitly says “go deep” / “account research” on a named company:
   - `search_scoops` — facilities expansion, hiring (Engineering/Operations), shutdown-adjacent language; geos NC/TX/CA and Fujifilm sites when relevant
   - `search_intent` — topic `Sterile/Aseptic Manufacturing` **with** pharmaceuticals industry filter
   - Competitor names: Curis, TOMI, SteraMist, Bioquell (scoops / news-style hits)
   - Priority watch: Fujifilm network sites, Alcami, Stallergenes Greer, customers-done for expansion signals
4. Drop noise per watchlist `noiseReject` (NASA, office-only, earnings spam, unrelated AI projects).
5. Output Slack-ready markdown:

### Format

```
*Agile Lab weekly ZoomInfo brief* — <date America/New_York>

*TL;DR*
1. …
2. …
3. … (max 3 act items)

*ICP / industry*
- …

*Competitors* (Curis / TOMI / Bioquell)
- …

*Watchlist*
- Fujifilm network / Alcami / others …

*Act cards*
For each of ≤3:
- *Why now*
- *Who to open* (titles from free contact search; no enrich unless asked)
- *Next step* (call / LinkedIn / wait / MSA angle)

*Credits*
- Free tools used: …
- AI credits: none | account_research on <name> (only if asked)
```

6. Prefer shutdown, move-in/out, cleanroom expansion, biologicals facilities, and competitor undercuts — that matches AHP decon / MSA revenue.
7. If the week is quiet, say so in one line; do not pad with junk.
