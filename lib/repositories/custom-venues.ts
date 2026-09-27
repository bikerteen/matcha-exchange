import type { CustomVenueInput, Venue } from "@/types";
import { isAreaSlug } from "@/data/matcha-areas";
import { createId } from "@/lib/id";
import { createLocalStore } from "@/lib/storage/local-store";

/** Venues a person has added on this device. Same swap-for-a-server contract as check-ins. */
export interface CustomVenueRepository {
  getSnapshot(): readonly Venue[];
  getServerSnapshot(): readonly Venue[];
  subscribe(listener: () => void): () => void;
  add(input: CustomVenueInput): Promise<Venue>;
}

const STORAGE_KEY = "lmx:custom-venues:v1";
const EMPTY: readonly Venue[] = Object.freeze([]);

export const VENUE_NAME_MAX = 40;

function isStoredVenue(value: unknown): value is Venue {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    v.name.trim().length > 0 &&
    typeof v.areaSlug === "string" &&
    isAreaSlug(v.areaSlug)
  );
}

function parseVenues(raw: unknown): readonly Venue[] {
  if (!Array.isArray(raw)) return EMPTY;
  return raw.filter(isStoredVenue).map((venue) => ({
    ...venue,
    demoAveragePence: 0,
    demoLogCount: 0,
    isCustom: true,
  }));
}

function createLocalCustomVenueRepository(): CustomVenueRepository {
  const store = createLocalStore<readonly Venue[]>(STORAGE_KEY, parseVenues, EMPTY);

  return {
    getSnapshot: store.getSnapshot,
    getServerSnapshot: store.getServerSnapshot,
    subscribe: store.subscribe,
    async add(input) {
      const name = input.name.trim().replace(/\s+/g, " ").slice(0, VENUE_NAME_MAX);
      if (!name) throw new Error("Venue needs a name");
      if (!isAreaSlug(input.areaSlug)) throw new Error("Unknown area");
      const venue: Venue = {
        id: `custom-${createId()}`,
        name,
        areaSlug: input.areaSlug,
        demoAveragePence: 0,
        demoLogCount: 0,
        isCustom: true,
      };
      store.set((previous) => [...previous, venue]);
      return venue;
    },
  };
}

export const customVenueRepository: CustomVenueRepository = createLocalCustomVenueRepository();
