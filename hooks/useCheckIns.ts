"use client";

import { useSyncExternalStore } from "react";
import { checkInRepository } from "@/lib/repositories/checkins";

export function useCheckIns() {
  const checkIns = useSyncExternalStore(
    checkInRepository.subscribe,
    checkInRepository.getSnapshot,
    checkInRepository.getServerSnapshot,
  );
  return {
    checkIns,
    addCheckIn: checkInRepository.add,
    removeCheckIn: checkInRepository.remove,
    clearCheckIns: checkInRepository.clear,
  };
}
