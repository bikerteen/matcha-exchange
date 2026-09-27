import type { MatchaLine } from "@/types";

/**
 * The fictional Matcha Line network. Paths are area slugs or [x, y] bend points,
 * drawn in order. Keep segments horizontal, vertical or 45° for the schematic look.
 */
export const MATCHA_LINES: MatchaLine[] = [
  {
    id: "ceremonial",
    name: "Ceremonial Line",
    style: "solid-ink",
    path: [
      "dalston",
      "london-fields",
      "shoreditch",
      "liverpool-street",
      [760, 680],
      "south-bank",
      "brixton",
    ],
  },
  {
    id: "oat",
    name: "Oat Line",
    style: "cased-matcha",
    path: [
      "kings-cross",
      "angel",
      [560, 360],
      "old-street",
      "shoreditch",
      [840, 480],
      "hackney-central",
    ],
  },
  {
    id: "usucha",
    name: "Usucha Line",
    style: "solid-dark",
    path: ["kings-cross", "soho", "covent-garden", "south-bank"],
  },
];

/** Diagram dimensions shared by the map and anything that overlays it. */
export const MAP_VIEWBOX = { width: 1100, height: 1140 } as const;

/** The river, drawn under the network. */
export const THAMES_PATH = "M -40 800 H 450 L 540 710 H 1140";
