import type { MatchaArea } from "@/types";

/**
 * The areas served by the Matcha Line.
 *
 * x / y are positions on the schematic diagram (viewBox 1100 × 1140). The map is
 * deliberately not to scale — move stations around freely.
 *
 * `demo` values are SEEDED DEMO FIGURES. They are not measured prices.
 */
export const MATCHA_AREAS: MatchaArea[] = [
  {
    slug: "dalston",
    name: "Dalston",
    x: 760,
    y: 120,
    lines: ["ceremonial"],
    label: { dx: 26, dy: -2, anchor: "start" },
    report: "Early adopters. Claims to have been drinking it before it was a thing.",
    demo: { averagePence: 540, logCount: 14 },
  },
  {
    slug: "hackney-central",
    name: "Hackney Central",
    x: 960,
    y: 360,
    lines: ["oat"],
    label: { dx: 0, dy: -54, anchor: "middle" },
    report: "Quietly accumulating. Mostly oat, occasionally ceremonial.",
    demo: { averagePence: 555, logCount: 11 },
  },
  {
    slug: "london-fields",
    name: "London Fields",
    x: 760,
    y: 300,
    lines: ["ceremonial"],
    label: { dx: -26, dy: -2, anchor: "end" },
    report: "Picnic-grade matcha. Prices rise sharply when the sun comes out.",
    demo: { averagePence: 570, logCount: 18 },
  },
  {
    slug: "shoreditch",
    name: "Shoreditch",
    x: 760,
    y: 480,
    lines: ["ceremonial", "oat"],
    label: { dx: -26, dy: 48, anchor: "end" },
    report: "The trading floor. Prices set by whoever has the longest queue.",
    demo: { averagePence: 624, logCount: 27 },
  },
  {
    slug: "old-street",
    name: "Old Street",
    x: 560,
    y: 480,
    lines: ["oat"],
    label: { dx: -26, dy: -2, anchor: "end" },
    report: "Fuelling the roundabout since the second oat milk shortage.",
    demo: { averagePence: 595, logCount: 13 },
  },
  {
    slug: "liverpool-street",
    name: "Liverpool Street",
    x: 760,
    y: 640,
    lines: ["ceremonial"],
    label: { dx: 26, dy: -2, anchor: "start" },
    report: "Commuter volume. Ordered on the move, drunk on the platform.",
    demo: { averagePence: 610, logCount: 12 },
  },
  {
    slug: "angel",
    name: "Angel",
    x: 440,
    y: 240,
    lines: ["oat"],
    label: { dx: 0, dy: -54, anchor: "middle" },
    report: "Steady market. Nobody panics in Angel.",
    demo: { averagePence: 585, logCount: 12 },
  },
  {
    slug: "kings-cross",
    name: "King's Cross",
    x: 260,
    y: 240,
    lines: ["oat", "usucha"],
    label: { dx: -30, dy: -2, anchor: "end" },
    report: "Gateway market. Most matchas here are bought by people with luggage.",
    demo: { averagePence: 600, logCount: 16 },
  },
  {
    slug: "soho",
    name: "Soho",
    x: 260,
    y: 580,
    lines: ["usucha"],
    label: { dx: -26, dy: -2, anchor: "end" },
    report: "High volume, higher prices. Strawberry cold foam is standard issue.",
    demo: { averagePence: 650, logCount: 22 },
  },
  {
    slug: "covent-garden",
    name: "Covent Garden",
    x: 400,
    y: 720,
    lines: ["usucha"],
    label: { dx: 22, dy: -44, anchor: "start" },
    report: "Tourist premium applies. Whisking performed in full view.",
    demo: { averagePence: 665, logCount: 17 },
  },
  {
    slug: "south-bank",
    name: "South Bank",
    x: 560,
    y: 880,
    lines: ["ceremonial", "usucha"],
    label: { dx: 30, dy: 16, anchor: "start" },
    report: "Riverside premium, brutalist discount.",
    demo: { averagePence: 575, logCount: 10 },
  },
  {
    slug: "brixton",
    name: "Brixton",
    x: 560,
    y: 1060,
    lines: ["ceremonial"],
    label: { dx: 26, dy: -2, anchor: "start" },
    report: "Best value on the network. Waiting for the rest of London to notice.",
    demo: { averagePence: 520, logCount: 12 },
  },
];

const AREA_BY_SLUG = new Map(MATCHA_AREAS.map((area) => [area.slug, area]));

export function getArea(slug: string): MatchaArea | undefined {
  return AREA_BY_SLUG.get(slug);
}

export function isAreaSlug(slug: string): boolean {
  return AREA_BY_SLUG.has(slug);
}
