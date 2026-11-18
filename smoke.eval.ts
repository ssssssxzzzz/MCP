import { defineEval } from "@grok/agent-sdk/evals";

export default defineEval({
  tags: ["smoke"],
  description: "Loads the Agile Lab GTM watchlist via get_watchlist.",
  async test(t) {
    await t.send(
      "Call get_watchlist and tell me our top competitor and one priority account. Do not call ZoomInfo enrich or account_research.",
    );
    t.succeeded();
    t.calledTool("get_watchlist");
  },
});
