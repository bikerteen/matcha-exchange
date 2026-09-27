"use client";

import { useSyncExternalStore } from "react";
import { HOLDER_NAME_MAX, holderNameStore } from "@/lib/repositories/holder";

export function useHolderName() {
  const name = useSyncExternalStore(
    holderNameStore.subscribe,
    holderNameStore.getSnapshot,
    holderNameStore.getServerSnapshot,
  );
  const setName = (value: string) => holderNameStore.set(value.slice(0, HOLDER_NAME_MAX));
  return [name, setName] as const;
}
