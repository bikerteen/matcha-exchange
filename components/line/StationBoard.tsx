"use client";

import { useState } from "react";
import type { AreaStats } from "@/types";
import { formatDelta, formatPence, padCount } from "@/lib/format";
import { useMarket } from "@/hooks/useMarket";

type SortKey = "price" | "activity" | "name";

const SORTS: Array<{ key: SortKey; label: string }> = [
  { key: "price", label: "Price" },
  { key: "activity", label: "Activity" },
  { key: "name", label: "A–Z" },
];

function sortAreas(areas: AreaStats[], key: SortKey): AreaStats[] {
  const copy = [...areas];
  if (key === "price") return copy.sort((a, b) => b.averagePence - a.averagePence);
  if (key === "activity") return copy.sort((a, b) => b.logCount - a.logCount);
  return copy.sort((a, b) => a.area.name.localeCompare(b.area.name));
}

/**
 * Departure-board list of every station. Doubles as the accessible,
 * non-spatial way to browse the Matcha Line.
 */
export function StationBoard({ onSelect }: { onSelect: (slug: string) => void }) {
  const market = useMarket();
  const [sort, setSort] = useState<SortKey>("price");
  const rows = sortAreas(market.areas, sort);

  return (
    <section aria-labelledby="board-heading" className="on-dark border-[3px] border-ink bg-ink text-matcha shadow-[var(--shadow-hard)]">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-matcha-deep px-4 pt-4 pb-3">
        <div>
          <p className="label text-matcha-light">Now showing</p>
          <h2 id="board-heading" className="display text-[40px]">All stations</h2>
        </div>
        <div className="flex gap-1" role="group" aria-label="Sort stations">
          {SORTS.map((option) => (
            <button
              key={option.key}
              type="button"
              aria-pressed={sort === option.key}
              onClick={() => setSort(option.key)}
              className={`label min-h-9 border-2 px-2.5 text-[11px] ${
                sort === option.key
                  ? "border-matcha bg-matcha text-ink"
                  : "border-matcha-deep text-matcha hover:border-matcha"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <table className="w-full font-mono text-[14px]">
        <caption className="sr-only">Demo average matcha price and number of logs for each area</caption>
        <thead>
          <tr className="label text-left text-[10px] text-matcha-light">
            <th scope="col" className="px-4 py-2 font-medium">Station</th>
            <th scope="col" className="py-2 pr-3 text-right font-medium">Avg</th>
            <th scope="col" className="hidden py-2 pr-3 text-right font-medium sm:table-cell">vs index</th>
            <th scope="col" className="py-2 pr-4 text-right font-medium">Logs</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((stats) => (
            <tr key={stats.area.slug} className="border-t border-matcha-deep">
              <th scope="row" className="p-0 text-left font-normal">
                <button
                  type="button"
                  onClick={() => onSelect(stats.area.slug)}
                  aria-haspopup="dialog"
                  className="flex min-h-12 w-full items-center gap-2 px-4 text-left font-semibold tracking-[0.04em] uppercase hover:bg-matcha-deep"
                >
                  <span aria-hidden="true" className={stats.deltaPence > 0 ? "text-matcha" : "text-matcha-light/60"}>
                    {stats.deltaPence > 0 ? "▲" : "▼"}
                  </span>
                  {stats.area.name}
                </button>
              </th>
              <td className="tabular py-2 pr-3 text-right font-semibold">{formatPence(stats.averagePence)}</td>
              <td className="tabular hidden py-2 pr-3 text-right text-matcha-light sm:table-cell">
                {formatDelta(stats.deltaPence)}
              </td>
              <td className="tabular py-2 pr-4 text-right text-matcha-light">{padCount(stats.logCount, 3)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="label border-t-2 border-matcha-deep px-4 py-3 text-[10px] text-matcha-light">
        London index {formatPence(market.londonAveragePence)} · demo figures
        {market.includesUserData ? ` + ${market.userLogs} of your logs` : " · not live"}
      </p>
    </section>
  );
}
