import type { AreaStats, CheckIn, MarketSnapshot, Venue, VenueStats } from "@/types";
import { MATCHA_AREAS } from "@/data/matcha-areas";
import { indexVenues } from "@/lib/venues";

/**
 * The London Matcha Index. Blends the seeded DEMO baseline with the current
 * person's local check-ins. Nothing here is crowdsourced yet.
 */
export function computeMarket(checkIns: readonly CheckIn[], venues: readonly Venue[]): MarketSnapshot {
  const venueById = indexVenues(venues);

  const userByArea = new Map<string, { count: number; totalPence: number }>();
  let userLogs = 0;
  for (const checkIn of checkIns) {
    const venue = venueById.get(checkIn.venueId);
    if (!venue) continue;
    userLogs++;
    const entry = userByArea.get(venue.areaSlug) ?? { count: 0, totalPence: 0 };
    entry.count++;
    entry.totalPence += checkIn.pricePence;
    userByArea.set(venue.areaSlug, entry);
  }

  let totalLogs = 0;
  let totalPence = 0;
  const partial = MATCHA_AREAS.map((area) => {
    const user = userByArea.get(area.slug) ?? { count: 0, totalPence: 0 };
    const logCount = area.demo.logCount + user.count;
    const spend = area.demo.averagePence * area.demo.logCount + user.totalPence;
    totalLogs += logCount;
    totalPence += spend;
    return {
      area,
      logCount,
      userLogCount: user.count,
      averagePence: logCount > 0 ? Math.round(spend / logCount) : area.demo.averagePence,
    };
  });

  const londonAveragePence = totalLogs > 0 ? Math.round(totalPence / totalLogs) : 0;
  const areas: AreaStats[] = partial.map((stats) => ({
    ...stats,
    deltaPence: stats.averagePence - londonAveragePence,
  }));

  const mostActiveArea = areas.reduce((best, current) =>
    current.logCount > best.logCount ? current : best,
  );

  const venueStats = computeVenueStats(checkIns, venues);
  const mostLoggedVenue = venueStats.reduce((best, current) =>
    current.logCount > best.logCount ? current : best,
  );

  return {
    londonAveragePence,
    totalLogs,
    userLogs,
    mostActiveArea,
    mostLoggedVenue,
    areas,
    includesUserData: userLogs > 0,
  };
}

export function computeVenueStats(checkIns: readonly CheckIn[], venues: readonly Venue[]): VenueStats[] {
  const userByVenue = new Map<string, { count: number; totalPence: number }>();
  for (const checkIn of checkIns) {
    const entry = userByVenue.get(checkIn.venueId) ?? { count: 0, totalPence: 0 };
    entry.count++;
    entry.totalPence += checkIn.pricePence;
    userByVenue.set(checkIn.venueId, entry);
  }

  return venues.map((venue) => {
    const user = userByVenue.get(venue.id) ?? { count: 0, totalPence: 0 };
    const logCount = venue.demoLogCount + user.count;
    const spend = venue.demoAveragePence * venue.demoLogCount + user.totalPence;
    return {
      venue,
      logCount,
      averagePence: logCount > 0 ? Math.round(spend / logCount) : 0,
    };
  });
}

/** Venues in an area, most logged first. */
export function venuesForArea(
  areaSlug: string,
  checkIns: readonly CheckIn[],
  venues: readonly Venue[],
): VenueStats[] {
  return computeVenueStats(
    checkIns,
    venues.filter((venue) => venue.areaSlug === areaSlug),
  ).sort((a, b) => b.logCount - a.logCount || a.venue.name.localeCompare(b.venue.name));
}
