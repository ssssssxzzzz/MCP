# zoominfo-brief

Slack + ZoomInfo briefing agent for **Agile Lab Services** (AHP decontamination).

## What it does

- Plain-language ZoomInfo chat in Slack (drill-down + watchlist)
- Monday light + Friday weekly scheduled briefs (ICP, competitors, Fujifilm network / Alcami, act cards)
- Credit-aware: free scans by default; AI research only when asked

## Bring-up (on Jacob’s machine)

```bash
cd zoominfo-brief
npx @grok/agent-sdk@0.6.0 login
npx @grok/agent-sdk@0.6.0 slack create --dir . --name "ZoomInfo Brief"
npx @grok/agent-sdk@0.6.0 slack doctor --prefix ZOOMINFO_BRIEF
npx @grok/agent-sdk@0.6.0 serve --dir . --dev
# playground: http://127.0.0.1:3000/playground
```

Connect **ZoomInfo** under Deployed Agents / Cursor MCP if `servers: ["Zoominfo"]` does not resolve — match the dashboard connector name.

## Deploy

1. Push this folder to a git remote.
2. `npx @grok/agent-sdk@0.6.0" slack create --dir . --env prod --name "ZoomInfo Brief"`
3. `npx @grok/agent-sdk@0.6.0 deploy --dir . --dry-run` then `deploy` (save alias token).

## Watchlist

Seeded from Jacob’s 2026-11-18 intel in `bot/sandbox/workspace/gtm-watchlist.json`.
Slack: “watch Acme” / “add competitor X” → `update_watchlist`.
ZoomInfo GTM write (`update_gtm_context`) timed out during scaffold — retry from chat when ready (AI credits).
