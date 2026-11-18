import { slackChannel } from "@grok/agent-sdk/channels/slack";

export default slackChannel({
  envPrefix: "ZOOMINFO_BRIEF",
  suggestedPrompts: [
    {
      title: "Weekly brief",
      message:
        "Run this week's ZoomInfo briefing: ICP signals, competitors, watchlist, and 3 act cards.",
    },
    {
      title: "Watch Fujifilm network",
      message:
        "What should we watch this week across Fujifilm Morrisville, College Station, and Holly Springs?",
    },
    {
      title: "Prep an account",
      message: "Prep me on Alcami for a facilities / decontamination conversation.",
    },
    {
      title: "Competitor pulse",
      message: "Any scoops or hiring moves on Curis, TOMI/SteraMist, or Bioquell?",
    },
  ],
  reply: {
    mode: "post",
    status: {
      reasoning: true,
      tools: true,
      idle: [
        "Scanning ZoomInfo…",
        "Filtering to sterile / decon ICP…",
        "Building act cards…",
      ],
    },
  },
});
