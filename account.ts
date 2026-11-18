import { defineConnection } from "@grok/agent-sdk/connections";

/** Reuse Jacob's Cursor-connected ZoomInfo MCP (dashboard connector). */
export default defineConnection({
  cursorAccount: true,
  servers: ["Zoominfo"],
  advertiseTools: true,
});
