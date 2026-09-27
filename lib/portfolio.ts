import type { AreaExposure, CheckIn, Classification, Holding, Portfolio, Venue } from "@/types";
import { getArea } from "@/data/matcha-areas";
import { formatShortDate, padCount } from "@/lib/format";
import { hashString } from "@/lib/id";
import { indexVenues } from "@/lib/venues";

/** One check-in = one share. Shares possess absolutely no financial value. */
export function classify(totalShares: number): Classification {
  if (totalShares <= 2) return "CASUAL WHISKER";
  if (totalShares <= 7) return "MATCHA CURIOUS";
  if (totalShares <= 15) return "HEAVILY EXPOSED";
  if (totalShares <= 30) return "GREEN PORTFOLIO";
  return "SYSTEMIC MATCHA RISK";
}

export const CLASSIFICATION_NOTES: Record<Classification, string> = {
  "CASUAL WHISKER": "Minimal exposure. Could stop any time.",
  "MATCHA CURIOUS": "Position building. Friends have started to notice.",
  "HEAVILY EXPOSED": "A significant holding. The barista knows your order.",
  "GREEN PORTFOLIO": "Diversified across the network. A serious operator.",
  "SYSTEMIC MATCHA RISK": "Too big to fail. The index is now partly you.",
};

export function computePortfolio(checkIns: readonly CheckIn[], venues: readonly Venue[]): Portfolio {
  const venueById = indexVenues(venues);
  const holdingsById = new Map<string, Holding>();
  const areasBySlug = new Map<string, AreaExposure>();
  let totalSpentPence = 0;

  for (const checkIn of checkIns) {
    totalSpentPence += checkIn.pricePence;
    const venue = venueById.get(checkIn.venueId);

    const holding = holdingsById.get(checkIn.venueId) ?? {
      venueId: checkIn.venueId,
      venueName: venue?.name ?? "Unlisted venue",
      areaSlug: venue?.areaSlug ?? null,
      shares: 0,
      spentPence: 0,
    };
    holding.shares++;
    holding.spentPence += checkIn.pricePence;
    holdingsById.set(checkIn.venueId, holding);

    const area = venue ? getArea(venue.areaSlug) : undefined;
    if (area) {
      const exposure = areasBySlug.get(area.slug) ?? {
        areaSlug: area.slug,
        areaName: area.name,
        shares: 0,
        spentPence: 0,
      };
      exposure.shares++;
      exposure.spentPence += checkIn.pricePence;
      areasBySlug.set(area.slug, exposure);
    }
  }

  const byShares = <T extends { shares: number; spentPence: number }>(a: T, b: T) =>
    b.shares - a.shares || b.spentPence - a.spentPence;
  const holdings = [...holdingsById.values()].sort(byShares);
  const areaExposure = [...areasBySlug.values()].sort(byShares);

  const totalShares = checkIns.length;
  const dates = checkIns.map((checkIn) => checkIn.createdAt).sort();
  const firstLoggedAt = dates[0] ?? null;
  const lastLoggedAt = dates[dates.length - 1] ?? null;

  return {
    totalShares,
    totalSpentPence,
    averagePricePence: totalShares > 0 ? Math.round(totalSpentPence / totalShares) : 0,
    cafesVisited: holdings.length,
    areasVisited: areaExposure.length,
    holdings,
    areaExposure,
    mostVisitedVenue: holdings[0] ?? null,
    mostVisitedArea: areaExposure[0] ?? null,
    classification: classify(totalShares),
    certificateNumber: certificateNumber(checkIns, lastLoggedAt),
    firstLoggedAt,
    lastLoggedAt,
  };
}

function certificateNumber(checkIns: readonly CheckIn[], lastLoggedAt: string | null): string {
  if (!lastLoggedAt) return "LMX/UNISSUED/000000";
  const serial = hashString(checkIns.map((checkIn) => checkIn.id).join("|")) % 1_000_000;
  return `LMX/${formatShortDate(lastLoggedAt)}/${padCount(serial, 6)}`;
}

/** Top holdings for the certificate, with the tail folded into "Other". */
export function certificateRows(holdings: Holding[], max = 5): Array<{ label: string; shares: number }> {
  if (holdings.length <= max) {
    return holdings.map((holding) => ({ label: holding.venueName, shares: holding.shares }));
  }
  const top = holdings.slice(0, max - 1);
  const rest = holdings.slice(max - 1).reduce((sum, holding) => sum + holding.shares, 0);
  return [
    ...top.map((holding) => ({ label: holding.venueName, shares: holding.shares })),
    { label: "Other", shares: rest },
  ];
}
