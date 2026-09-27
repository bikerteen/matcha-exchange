/** All money is stored as integer pence to avoid floating point drift. */
export type Pence = number;

export type LineId = "ceremonial" | "oat" | "usucha";

export interface StationLabel {
  /** Offset of the name baseline from the station centre. */
  dx: number;
  dy: number;
  anchor: "start" | "middle" | "end";
}

export interface MatchaArea {
  slug: string;
  name: string;
  /** Schematic position on the Matcha Line diagram (SVG user units). */
  x: number;
  y: number;
  lines: LineId[];
  label: StationLabel;
  /** One-line area report shown in the area window. */
  report: string;
  /** Seeded demo baseline. Not real data. */
  demo: {
    averagePence: Pence;
    logCount: number;
  };
}

export interface MatchaLine {
  id: LineId;
  name: string;
  /** Ordered points the line passes through. Strings are area slugs, tuples are bend points. */
  path: Array<string | [number, number]>;
  style: "solid-ink" | "solid-dark" | "cased-matcha";
}

export interface Venue {
  id: string;
  name: string;
  areaSlug: string;
  description?: string;
  /** Seeded demo values. Not real prices. */
  demoAveragePence: Pence;
  demoLogCount: number;
  /** True for venues a user added on this device. */
  isCustom?: boolean;
}

export interface CheckIn {
  id: string;
  venueId: string;
  pricePence: Pence;
  drinkName?: string;
  createdAt: string;
}

export type NewCheckIn = Omit<CheckIn, "id" | "createdAt">;

export interface CustomVenueInput {
  name: string;
  areaSlug: string;
}

export interface AreaStats {
  area: MatchaArea;
  averagePence: Pence;
  logCount: number;
  userLogCount: number;
  /** Difference from the London index, in pence. */
  deltaPence: Pence;
}

export interface VenueStats {
  venue: Venue;
  averagePence: Pence;
  logCount: number;
}

export interface MarketSnapshot {
  londonAveragePence: Pence;
  totalLogs: number;
  userLogs: number;
  mostActiveArea: AreaStats;
  mostLoggedVenue: VenueStats;
  areas: AreaStats[];
  /** Whether the user's own logs are blended into the figures. */
  includesUserData: boolean;
}

export type Classification =
  | "CASUAL WHISKER"
  | "MATCHA CURIOUS"
  | "HEAVILY EXPOSED"
  | "GREEN PORTFOLIO"
  | "SYSTEMIC MATCHA RISK";

export interface Holding {
  venueId: string;
  venueName: string;
  areaSlug: string | null;
  shares: number;
  spentPence: Pence;
}

export interface AreaExposure {
  areaSlug: string;
  areaName: string;
  shares: number;
  spentPence: Pence;
}

export interface Portfolio {
  totalShares: number;
  totalSpentPence: Pence;
  averagePricePence: Pence;
  cafesVisited: number;
  areasVisited: number;
  holdings: Holding[];
  areaExposure: AreaExposure[];
  mostVisitedVenue: Holding | null;
  mostVisitedArea: AreaExposure | null;
  classification: Classification;
  certificateNumber: string;
  firstLoggedAt: string | null;
  lastLoggedAt: string | null;
}
