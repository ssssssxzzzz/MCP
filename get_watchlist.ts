import { defineTool } from "@grok/agent-sdk/tools";
import { prompt } from "@grok/agent-sdk";
import * as z from "zod/v4";
import { loadWatchlist } from "../lib/watchlist.js";

export default defineTool({
  description: prompt`
    Load Agile Lab Services GTM watchlist: competitors, customers done,
    priority/tentative accounts, personas, and signal filters.
    Call this before briefings or when the user asks who we watch.
  `,
  effect: "read",
  inputSchema: z.object({}),
  async execute(_input, ctx) {
    const watchlist = await loadWatchlist(ctx.host.kv, ctx.workspaceDir);
    return { watchlist };
  },
});
