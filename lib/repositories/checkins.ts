import type { CheckIn, NewCheckIn } from "@/types";
import { createId } from "@/lib/id";
import { MAX_PRICE_PENCE, MIN_PRICE_PENCE } from "@/lib/format";
import { createLocalStore } from "@/lib/storage/local-store";

/**
 * Check-in persistence. Components only talk to this interface, so the
 * localStorage implementation below can later be swapped for one that syncs
 * to a server (keep a local snapshot, resolve writes when the server confirms).
 */
export interface CheckInRepository {
  getSnapshot(): readonly CheckIn[];
  getServerSnapshot(): readonly CheckIn[];
  subscribe(listener: () => void): () => void;
  add(input: NewCheckIn): Promise<CheckIn>;
  remove(id: string): Promise<void>;
  clear(): Promise<void>;
}

const STORAGE_KEY = "lmx:checkins:v1";
const EMPTY: readonly CheckIn[] = Object.freeze([]);

function isCheckIn(value: unknown): value is CheckIn {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.venueId === "string" &&
    typeof v.pricePence === "number" &&
    Number.isInteger(v.pricePence) &&
    v.pricePence >= MIN_PRICE_PENCE &&
    v.pricePence <= MAX_PRICE_PENCE &&
    typeof v.createdAt === "string" &&
    (v.drinkName === undefined || typeof v.drinkName === "string")
  );
}

function parseCheckIns(raw: unknown): readonly CheckIn[] {
  if (!Array.isArray(raw)) return EMPTY;
  return raw.filter(isCheckIn);
}

function createLocalCheckInRepository(): CheckInRepository {
  const store = createLocalStore<readonly CheckIn[]>(STORAGE_KEY, parseCheckIns, EMPTY);

  return {
    getSnapshot: store.getSnapshot,
    getServerSnapshot: store.getServerSnapshot,
    subscribe: store.subscribe,
    async add(input) {
      const drinkName = input.drinkName?.trim();
      const checkIn: CheckIn = {
        id: createId(),
        venueId: input.venueId,
        pricePence: input.pricePence,
        ...(drinkName ? { drinkName: drinkName.slice(0, 60) } : {}),
        createdAt: new Date().toISOString(),
      };
      if (!isCheckIn(checkIn)) throw new Error("Invalid check-in");
      store.set((previous) => [...previous, checkIn]);
      return checkIn;
    },
    async remove(id) {
      store.set((previous) => previous.filter((checkIn) => checkIn.id !== id));
    },
    async clear() {
      store.set(EMPTY);
    },
  };
}

export const checkInRepository: CheckInRepository = createLocalCheckInRepository();
