import type { Venue } from "@/types";
import { SEED_VENUES } from "@/data/venues";
import { getArea } from "@/data/matcha-areas";

export function mergeVenues(customVenues: readonly Venue[]): Venue[] {
  return [...SEED_VENUES, ...customVenues];
}

export function indexVenues(venues: readonly Venue[]): Map<string, Venue> {
  return new Map(venues.map((venue) => [venue.id, venue]));
}

function normalise(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Matches on venue name or area name, e.g. "shor" finds everything in Shoreditch. */
export function searchVenues(venues: readonly Venue[], query: string, areaSlug?: string | null): Venue[] {
  const q = normalise(query);
  return venues
    .filter((venue) => !areaSlug || venue.areaSlug === areaSlug)
    .filter((venue) => {
      if (!q) return true;
      const areaName = getArea(venue.areaSlug)?.name ?? "";
      return normalise(venue.name).includes(q) || normalise(areaName).includes(q);
    })
    .sort((a, b) => {
      if (!q) return (b.isCustom ? 1 : 0) - (a.isCustom ? 1 : 0) || a.name.localeCompare(b.name);
      const aStarts = normalise(a.name).startsWith(q) ? 0 : 1;
      const bStarts = normalise(b.name).startsWith(q) ? 0 : 1;
      return aStarts - bStarts || a.name.localeCompare(b.name);
    });
}
