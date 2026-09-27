"use client";

import { useMemo, useSyncExternalStore } from "react";
import { customVenueRepository } from "@/lib/repositories/custom-venues";
import { mergeVenues } from "@/lib/venues";

/** Seeded venues plus anything added on this device. */
export function useVenues() {
  const customVenues = useSyncExternalStore(
    customVenueRepository.subscribe,
    customVenueRepository.getSnapshot,
    customVenueRepository.getServerSnapshot,
  );
  const venues = useMemo(() => mergeVenues(customVenues), [customVenues]);
  return { venues, customVenues, addVenue: customVenueRepository.add };
}
