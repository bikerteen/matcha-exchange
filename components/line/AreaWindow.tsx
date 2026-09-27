"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { MATCHA_LINES } from "@/data/matcha-lines";
import { formatPence, padCount } from "@/lib/format";
import { venuesForArea } from "@/lib/market";
import { useCheckIns } from "@/hooks/useCheckIns";
import { useMarket } from "@/hooks/useMarket";
import { useVenues } from "@/hooks/useVenues";
import { RetroDialog } from "@/components/retro/RetroDialog";
import { describeDelta } from "@/components/line/StationNode";

export function exeName(name: string): string {
  return `${name.toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_|_$/g, "")}.exe`;
}

export function AreaWindow({ areaSlug, onClose }: { areaSlug: string | null; onClose: () => void }) {
  const market = useMarket();
  // Keep showing the last area while the window animates closed.
  const [shownSlug, setShownSlug] = useState(areaSlug);
  if (areaSlug !== null && areaSlug !== shownSlug) setShownSlug(areaSlug);
  const stats = market.areas.find((entry) => entry.area.slug === shownSlug) ?? null;

  return (
    <RetroDialog
      open={areaSlug !== null && stats !== null}
      title={stats ? exeName(stats.area.name) : ""}
      onClose={onClose}
      bodyClassName="p-0"
      status={
        stats
          ? stats.userLogCount > 0
            ? `Demo index + ${stats.userLogCount} of your logs`
            : "Demo index · seeded figures"
          : null
      }
    >
      {/* Key forces fresh "View cafés" state per area. */}
      {stats ? <AreaWindowBody key={stats.area.slug} areaSlug={stats.area.slug} /> : null}
    </RetroDialog>
  );
}

function AreaWindowBody({ areaSlug }: { areaSlug: string }) {
  const market = useMarket();
  const { checkIns } = useCheckIns();
  const { venues } = useVenues();
  const [showAll, setShowAll] = useState(false);
  const listId = useId();

  const stats = market.areas.find((entry) => entry.area.slug === areaSlug);
  if (!stats) return null;

  const { area, averagePence, deltaPence, logCount } = stats;
  const venueStats = venuesForArea(area.slug, checkIns, venues);
  const shown = showAll ? venueStats : venueStats.slice(0, 2);
  const lines = MATCHA_LINES.filter((line) => area.lines.includes(line.id));

  return (
    <div className="font-system">
      <div className="border-b-2 border-window-dark bg-matcha px-4 pt-4 pb-5">
        <p className="label text-[11px]">Area average</p>
        <p className="display tabular mt-1 text-[88px] leading-[0.8]">{formatPence(averagePence)}</p>
        <p className="mt-3 inline-block bg-ink px-2 py-1 text-[12px] font-bold tracking-[0.06em] text-matcha uppercase">
          {describeDelta(deltaPence)}
        </p>
      </div>

      <div className="grid gap-4 p-4">
        <p className="text-[14px] leading-snug">{area.report}</p>

        <dl className="grid grid-cols-2 gap-2">
          <div className="bevel-in bg-white px-3 py-2">
            <dt className="text-[11px] font-bold tracking-[0.08em] uppercase">Matchas logged</dt>
            <dd className="font-mono tabular text-[28px] font-semibold">{padCount(logCount, 3)}</dd>
          </div>
          <div className="bevel-in bg-white px-3 py-2">
            <dt className="text-[11px] font-bold tracking-[0.08em] uppercase">Lines</dt>
            <dd className="mt-1 grid gap-0.5 text-[13px] font-bold">
              {lines.map((line) => (
                <span key={line.id} className="flex items-center gap-2">
                  <LineSwatch style={line.style} />
                  {line.name}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <section aria-labelledby={`${listId}-heading`}>
          <h3 id={`${listId}-heading`} className="text-[11px] font-bold tracking-[0.1em] uppercase">
            {showAll ? `All cafés in ${area.name}` : "Popular here"}
          </h3>
          <ul id={listId} className="mt-2 grid gap-1">
            {shown.map(({ venue, averagePence: venuePrice, logCount: venueLogs }) => (
              <li key={venue.id} className="border-b border-dotted border-window-dark pb-1.5">
                <div className="leader text-[15px] font-bold uppercase">
                  <span className="truncate">{venue.name}</span>
                  <span className="font-mono tabular">{venueLogs > 0 ? formatPence(venuePrice) : "—"}</span>
                </div>
                {showAll ? (
                  <p className="text-[12px] text-ink/75">
                    {venue.isCustom ? "Added by you on this device." : venue.description}
                    {" "}
                    <span className="font-mono">({venueLogs} logged)</span>
                  </p>
                ) : null}
              </li>
            ))}
            {shown.length === 0 ? <li className="text-[13px]">No cafés listed yet. Be the first.</li> : null}
          </ul>
        </section>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="btn98"
            aria-expanded={showAll}
            aria-controls={listId}
            onClick={() => setShowAll((value) => !value)}
            data-autofocus
          >
            {showAll ? "Show less" : "View cafés"}
          </button>
          <Link href={`/log?area=${area.slug}`} className="btn98 btn98--primary">
            Log one here
          </Link>
        </div>
      </div>
    </div>
  );
}

export function LineSwatch({ style }: { style: "solid-ink" | "solid-dark" | "cased-matcha" }) {
  if (style === "cased-matcha") {
    return <span aria-hidden="true" className="inline-block h-2.5 w-6 border-[3px] border-ink bg-matcha" />;
  }
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2.5 w-6 ${style === "solid-ink" ? "bg-ink" : "bg-matcha-dark"}`}
    />
  );
}
