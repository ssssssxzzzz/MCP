import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { HostKvApi } from "@grok/agent-sdk";

export type Watchlist = {
  company: {
    name: string;
    offering: string;
    winThemes: string[];
    deconTrigger: string;
  };
  competitors: { name: string; notes: string }[];
  customersDone: string[];
  priorityWatch: { name: string; sites?: string[]; notes: string }[];
  signalsToWatch: string[];
  personas: string[];
  noiseReject: string[];
};

const KV_KEY = "gtm/watchlist";

/** Fallback when sandbox file is missing on a fresh host. */
export const DEFAULT_WATCHLIST: Watchlist = {
  company: {
    name: "Agile Lab Services",
    offering:
      "AHP (accelerated hydrogen peroxide) decontamination for GMP/sterile and biological-use facilities. Validated 6-log kill with biological indicators when customer requires. Core motion: large shutdown jobs; goal is master service agreements with ~10 billion-dollar companies — locked lower rates vs emergency pricing, mobilize to site within 24 hours.",
    winThemes: [
      "Faster response time than equipment-heavy competitors",
      "Better pricing vs equipment/service-contract lean",
      "Validated kill with BIs when asked",
    ],
    deconTrigger:
      "Typically required where biologicals were in use; also facility move-in/move-out and shutdown windows.",
  },
  competitors: [
    {
      name: "Curis",
      notes:
        "Equipment-heavy; leans service contracts. Beat us once on price at Stallergenes Greer (lost tentative).",
    },
    {
      name: "TOMI / SteraMist",
      notes: "Equipment-heavy competitor space; service-contract lean.",
    },
    {
      name: "Bioquell",
      notes: "Loose/indirect competitor — include in pulse but weight lower.",
    },
  ],
  customersDone: [
    "Biogen",
    "Catalent",
    "Amgen",
    "FUJIFILM Biotechnologies (Morrisville)",
    "Exela",
    "Nighthawk (RTP — past decon)",
  ],
  priorityWatch: [
    {
      name: "Fujifilm network",
      sites: ["Morrisville", "College Station", "Holly Springs"],
      notes:
        "Strategic: contacts exist; large cubic footage; uphill battle to establish deeply.",
    },
    {
      name: "Alcami",
      notes: "Explicit tentative customer (Wilmington / NC CDMO).",
    },
    {
      name: "Stallergenes Greer",
      notes: "Lost to Curis — watch for re-entry / shutdown windows.",
    },
  ],
  signalsToWatch: [
    "Facility shutdown / turnaround / planned outage",
    "Cleanroom or manufacturing suite expansion / commissioning",
    "Lab / manufacturing move-in or move-out (esp. Alexandria / Longfellow and similar lab RE)",
    "Biologicals / aseptic / sterile manufacturing sites",
    "Engineering, facilities, validation, sterility, micro hiring spikes",
    "Competitor Curis / TOMI / Bioquell wins, losses, or facility work",
  ],
  personas: [
    "Facilities / Plant Engineering",
    "Sterility Assurance / Microbiology",
    "Validation",
    "Quality Assurance",
    "EHS",
    "Site / Ops leadership",
  ],
  noiseReject: [
    "Unrelated industries (e.g. NASA, airlines, retail)",
    "Office-only moves with no biological / GMP manufacturing footprint",
    "Earnings spam without facilities/shutdown signal",
    "Generic AI/data projects at pharma companies",
  ],
};

export function seedWatchlistFromSandbox(cwd: string): Watchlist {
  try {
    const path = join(cwd, "gtm-watchlist.json");
    const raw = readFileSync(path, "utf8");
    return JSON.parse(raw) as Watchlist;
  } catch {
    return structuredClone(DEFAULT_WATCHLIST);
  }
}

export async function loadWatchlist(kv: HostKvApi, cwd: string): Promise<Watchlist> {
  const existing = (await kv.get(KV_KEY)) as Watchlist | null;
  if (existing && Array.isArray(existing.competitors)) {
    return existing;
  }
  const seeded = seedWatchlistFromSandbox(cwd);
  await kv.put(KV_KEY, seeded);
  return seeded;
}

export async function saveWatchlist(kv: HostKvApi, watchlist: Watchlist): Promise<void> {
  await kv.put(KV_KEY, watchlist);
}

export { KV_KEY };
