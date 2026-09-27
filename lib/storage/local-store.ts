/**
 * A tiny external store backed by localStorage, shaped for React's
 * useSyncExternalStore. Falls back to memory when storage is unavailable
 * (private browsing, blocked cookies, SSR) and syncs across tabs.
 */

type Listener = () => void;

export interface ExternalStore<T> {
  getSnapshot(): T;
  getServerSnapshot(): T;
  subscribe(listener: Listener): () => void;
  set(next: T | ((previous: T) => T)): void;
}

let storageProbe: Storage | null | undefined;

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  if (storageProbe !== undefined) return storageProbe;
  try {
    const storage = window.localStorage;
    const probeKey = "__lmx_probe__";
    storage.setItem(probeKey, "1");
    storage.removeItem(probeKey);
    storageProbe = storage;
  } catch {
    storageProbe = null;
  }
  return storageProbe;
}

export function isStorageAvailable(): boolean {
  return getStorage() !== null;
}

export function createLocalStore<T>(
  key: string,
  parse: (raw: unknown) => T,
  fallback: T,
): ExternalStore<T> {
  const listeners = new Set<Listener>();
  let cache: T | undefined;
  let memoryValue: T = fallback;

  function read(): T {
    const storage = getStorage();
    if (!storage) return memoryValue;
    try {
      const raw = storage.getItem(key);
      if (raw === null) return fallback;
      return parse(JSON.parse(raw));
    } catch {
      return fallback;
    }
  }

  function notify() {
    listeners.forEach((listener) => listener());
  }

  function onStorage(event: StorageEvent) {
    if (event.key !== null && event.key !== key) return;
    cache = read();
    notify();
  }

  return {
    getSnapshot() {
      if (cache === undefined) cache = read();
      return cache;
    },
    getServerSnapshot() {
      return fallback;
    },
    subscribe(listener) {
      listeners.add(listener);
      if (listeners.size === 1 && typeof window !== "undefined") {
        window.addEventListener("storage", onStorage);
      }
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0 && typeof window !== "undefined") {
          window.removeEventListener("storage", onStorage);
        }
      };
    },
    set(next) {
      const previous = cache === undefined ? read() : cache;
      const value = typeof next === "function" ? (next as (p: T) => T)(previous) : next;
      cache = value;
      const storage = getStorage();
      if (storage) {
        try {
          storage.setItem(key, JSON.stringify(value));
        } catch {
          // Quota exceeded or storage revoked mid-session: keep the in-memory value.
          memoryValue = value;
        }
      } else {
        memoryValue = value;
      }
      notify();
    },
  };
}
