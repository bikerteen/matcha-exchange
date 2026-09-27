"use client";

import { useState } from "react";
import type { CheckIn, Portfolio } from "@/types";
import { getArea } from "@/data/matcha-areas";
import { formatPence, formatReceiptDate } from "@/lib/format";
import { CLASSIFICATION_NOTES } from "@/lib/portfolio";
import { useCheckIns } from "@/hooks/useCheckIns";
import { useVenues } from "@/hooks/useVenues";
import { RetroDialog } from "@/components/retro/RetroDialog";
import { SectionLabel } from "@/components/ui/SectionLabel";

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 bg-cream p-4 md:p-5">
      <dt className="label">{label}</dt>
      <dd className="display tabular mt-2 truncate text-[clamp(36px,9vw,64px)]">{value}</dd>
    </div>
  );
}

/** The paperwork behind the certificate. */
export function Ledger({ portfolio }: { portfolio: Portfolio }) {
  const { checkIns, removeCheckIn, clearCheckIns } = useCheckIns();
  const { venues } = useVenues();
  const [confirmReset, setConfirmReset] = useState(false);
  const venueById = new Map(venues.map((venue) => [venue.id, venue]));
  const maxAreaShares = portfolio.areaExposure[0]?.shares ?? 1;
  const history: CheckIn[] = [...checkIns].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="grid gap-16">
      {/* Figures */}
      <section aria-labelledby="figures-heading">
        <SectionLabel number="A">Account summary</SectionLabel>
        <h2 id="figures-heading" className="sr-only">
          Account summary
        </h2>
        <dl className="mt-6 grid grid-cols-2 gap-[3px] border-[3px] border-ink bg-ink md:grid-cols-3">
          <Figure label="Shares held" value={String(portfolio.totalShares)} />
          <Figure label="Total spent" value={formatPence(portfolio.totalSpentPence)} />
          <Figure label="Average paid" value={formatPence(portfolio.averagePricePence)} />
          <Figure label="Cafés visited" value={String(portfolio.cafesVisited)} />
          <Figure label="Areas visited" value={String(portfolio.areasVisited)} />
          <Figure label="Favourite area" value={portfolio.mostVisitedArea?.areaName ?? "—"} />
        </dl>
        <p className="mt-4 max-w-xl text-[16px]">
          <strong className="uppercase">{portfolio.classification}.</strong>{" "}
          {CLASSIFICATION_NOTES[portfolio.classification]}
        </p>
      </section>

      {/* Holdings */}
      <section aria-labelledby="holdings-heading">
        <SectionLabel number="B">Holdings</SectionLabel>
        <h2 id="holdings-heading" className="display mt-6 text-[clamp(48px,10vw,96px)]">
          Shares by café
        </h2>
        <div className="mt-6 overflow-x-auto border-[3px] border-ink bg-off-white">
          <table className="w-full min-w-[480px] font-mono text-[14px]">
            <caption className="sr-only">Shares and spend per café</caption>
            <thead className="bg-ink text-matcha">
              <tr className="label text-left text-[10px]">
                <th scope="col" className="px-4 py-3 font-medium">Café</th>
                <th scope="col" className="py-3 pr-4 font-medium">Area</th>
                <th scope="col" className="py-3 pr-4 text-right font-medium">Shares</th>
                <th scope="col" className="py-3 pr-4 text-right font-medium">Spent</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.holdings.map((holding) => (
                <tr key={holding.venueId} className="border-t-2 border-ink/15">
                  <th scope="row" className="px-4 py-3 text-left font-semibold uppercase">
                    {holding.venueName}
                  </th>
                  <td className="py-3 pr-4 uppercase">
                    {holding.areaSlug ? getArea(holding.areaSlug)?.name : "—"}
                  </td>
                  <td className="tabular py-3 pr-4 text-right text-[18px] font-semibold">{holding.shares}</td>
                  <td className="tabular py-3 pr-4 text-right">{formatPence(holding.spentPence)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Exposure */}
      <section aria-labelledby="exposure-heading">
        <SectionLabel number="C">Exposure</SectionLabel>
        <h2 id="exposure-heading" className="display mt-6 text-[clamp(48px,10vw,96px)]">
          Where you drink
        </h2>
        <ul className="mt-6 grid gap-2">
          {portfolio.areaExposure.map((area) => (
            <li key={area.areaSlug} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="relative h-12 border-[3px] border-ink bg-cream">
                <div
                  className="absolute inset-y-0 left-0 bg-ink"
                  style={{ width: `${Math.max(18, (area.shares / maxAreaShares) * 100)}%` }}
                  aria-hidden="true"
                />
                <span className="label absolute inset-y-0 left-3 flex items-center text-[12px] font-semibold text-matcha mix-blend-difference">
                  {area.areaName}
                </span>
              </div>
              <span className="font-mono tabular w-24 text-right text-[14px] font-semibold">
                {area.shares} · {formatPence(area.spentPence)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* History */}
      <section aria-labelledby="history-heading">
        <SectionLabel number="D">Transaction history</SectionLabel>
        <h2 id="history-heading" className="display mt-6 text-[clamp(48px,10vw,96px)]">
          Receipts
        </h2>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {history.map((checkIn) => {
            const venue = venueById.get(checkIn.venueId);
            const area = venue ? getArea(venue.areaSlug) : undefined;
            return (
              <li key={checkIn.id} className="receipt-edge-bottom bg-off-white px-4 pt-4 font-mono text-[13px]">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-semibold uppercase">{venue?.name ?? "Unlisted venue"}</p>
                    <p className="text-[11px] tracking-[0.1em] uppercase opacity-75">
                      {area?.name ?? "Unknown area"} · {formatReceiptDate(checkIn.createdAt)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCheckIn(checkIn.id)}
                    className="grid size-9 shrink-0 place-items-center border-2 border-ink hover:bg-warning"
                    aria-label={`Remove ${venue?.name ?? "this"} receipt from ${formatReceiptDate(checkIn.createdAt)}`}
                  >
                    ×
                  </button>
                </div>
                <div className="mt-3 flex items-end justify-between border-t-2 border-dashed border-ink pt-2">
                  <span className="truncate text-[12px] uppercase">{checkIn.drinkName ?? "Matcha"}</span>
                  <span className="text-[18px] font-semibold">{formatPence(checkIn.pricePence)}</span>
                </div>
              </li>
            );
          })}
        </ol>
        <button type="button" onClick={() => setConfirmReset(true)} className="btn98 mt-8">
          Liquidate portfolio…
        </button>
      </section>

      <RetroDialog open={confirmReset} title="LIQUIDATE.exe" onClose={() => setConfirmReset(false)}>
        <div className="flex gap-4 font-system">
          <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
            <path d="M20 3L38 36H2z" fill="#ffd84a" stroke="#151815" strokeWidth="3" strokeLinejoin="round" />
            <rect x="18" y="14" width="4" height="11" fill="#151815" />
            <rect x="18" y="28" width="4" height="4" fill="#151815" />
          </svg>
          <div>
            <p className="font-bold">Liquidate all {portfolio.totalShares} shares?</p>
            <p className="mt-2 text-[14px]">
              This deletes every log on this device. Your shares were worth nothing, so you will receive nothing.
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className="btn98 min-w-[100px]" onClick={() => setConfirmReset(false)} data-autofocus>
            Cancel
          </button>
          <button
            type="button"
            className="btn98 min-w-[100px]"
            onClick={async () => {
              await clearCheckIns();
              setConfirmReset(false);
            }}
          >
            Liquidate
          </button>
        </div>
      </RetroDialog>
    </div>
  );
}
