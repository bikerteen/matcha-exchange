"use client";

import { useMemo } from "react";
import { computeMarket } from "@/lib/market";
import { computePortfolio } from "@/lib/portfolio";
import { useCheckIns } from "@/hooks/useCheckIns";
import { useVenues } from "@/hooks/useVenues";

export function useMarket() {
  const { checkIns } = useCheckIns();
  const { venues } = useVenues();
  return useMemo(() => computeMarket(checkIns, venues), [checkIns, venues]);
}

export function usePortfolio() {
  const { checkIns } = useCheckIns();
  const { venues } = useVenues();
  return useMemo(() => computePortfolio(checkIns, venues), [checkIns, venues]);
}
