import { defineTool } from "@grok/agent-sdk/tools";
import { prompt } from "@grok/agent-sdk";
import * as z from "zod/v4";
import { loadWatchlist, saveWatchlist } from "../lib/watchlist.js";

export default defineTool({
  description: prompt`
    Add or remove competitors or priority/tentative watch accounts.
    Use when the user says watch/unwatch an account or add/drop a competitor.
    Does not call ZoomInfo update_gtm_context (Jacob/admin only for that).
  `,
  effect: "write",
  inputSchema: z.object({
    action: z.enum(["add_competitor", "remove_competitor", "add_priority", "remove_priority"]),
    name: z.string().min(1),
    notes: z.string().optional(),
    sites: z.array(z.string()).optional(),
  }),
  async execute({ action, name, notes, sites }, ctx) {
    const watchlist = await loadWatchlist(ctx.host.kv, ctx.workspaceDir);
    const key = name.trim();

    if (action === "add_competitor") {
      if (!watchlist.competitors.some((c) => c.name.toLowerCase() === key.toLowerCase())) {
        watchlist.competitors.push({ name: key, notes: notes ?? "" });
      }
    } else if (action === "remove_competitor") {
      watchlist.competitors = watchlist.competitors.filter(
        (c) => c.name.toLowerCase() !== key.toLowerCase(),
      );
    } else if (action === "add_priority") {
      if (!watchlist.priorityWatch.some((p) => p.name.toLowerCase() === key.toLowerCase())) {
        watchlist.priorityWatch.push({
          name: key,
          notes: notes ?? "",
          ...(sites?.length ? { sites } : {}),
        });
      }
    } else if (action === "remove_priority") {
      watchlist.priorityWatch = watchlist.priorityWatch.filter(
        (p) => p.name.toLowerCase() !== key.toLowerCase(),
      );
    }

    await saveWatchlist(ctx.host.kv, watchlist);
    return { ok: true, action, name: key, watchlist };
  },
});
