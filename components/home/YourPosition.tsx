"use client";

import Link from "next/link";
import { formatPence } from "@/lib/format";
import { useHydrated } from "@/hooks/useHydrated";
import { usePortfolio } from "@/hooks/useMarket";
import { RetroWindow } from "@/components/retro/RetroWindow";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function YourPosition() {
  const hydrated = useHydrated();
  const portfolio = usePortfolio();
  const empty = portfolio.totalShares === 0;

  return (
    <section className="grid-paper border-t-[3px] border-ink" aria-labelledby="position-heading">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 lg:grid-cols-2 lg:items-center md:px-8 md:py-20">
        <div className="@container">
          <SectionLabel number="04">Your account</SectionLabel>
          <h2 id="position-heading" className="display mt-8 text-[min(21cqw,190px)]">
            Your
            <br />
            position.
          </h2>
        </div>

        <RetroWindow
          title="PORTFOLIO_STATUS.exe"
          bodyClassName="p-5"
          status={hydrated ? (empty ? "No holdings on record" : `Holder classification: ${portfolio.classification}`) : "Loading…"}
          className="shadow-[8px_8px_0_var(--ink)]"
        >
          <div aria-live="polite">
            {!hydrated ? (
              <p className="h-[148px] font-system text-[14px]">Checking your holdings…</p>
            ) : empty ? (
              <div className="font-system">
                <p className="text-[12px] font-bold tracking-[0.1em] uppercase">Shares held</p>
                <p className="display text-[96px] leading-[0.85]">0</p>
                <p className="mt-3 text-[14px]">
                  No matchas on record from this device. Your first log issues your first share and your certificate.
                </p>
                <Link href="/log" className="btn98 btn98--primary mt-4 w-full sm:w-auto">
                  Log your first matcha
                </Link>
              </div>
            ) : (
              <div className="font-system">
                <dl className="grid grid-cols-3 gap-2">
                  <div className="bevel-in bg-white p-2">
                    <dt className="text-[11px] font-bold tracking-[0.08em] uppercase">Shares</dt>
                    <dd className="display text-[48px] leading-none">{portfolio.totalShares}</dd>
                  </div>
                  <div className="bevel-in bg-white p-2">
                    <dt className="text-[11px] font-bold tracking-[0.08em] uppercase">Cafés</dt>
                    <dd className="display text-[48px] leading-none">{portfolio.cafesVisited}</dd>
                  </div>
                  <div className="bevel-in bg-white p-2">
                    <dt className="text-[11px] font-bold tracking-[0.08em] uppercase">Spent</dt>
                    <dd className="font-mono tabular pt-3 text-[18px] font-semibold">
                      {formatPence(portfolio.totalSpentPence)}
                    </dd>
                  </div>
                </dl>
                <p className="mt-4 text-[14px]">
                  Largest holding: <strong>{portfolio.mostVisitedVenue?.venueName}</strong> (
                  {portfolio.mostVisitedVenue?.shares} shares).
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href="/portfolio" className="btn98 btn98--primary">
                    View certificate
                  </Link>
                  <Link href="/log" className="btn98">
                    Log another
                  </Link>
                </div>
              </div>
            )}
          </div>
        </RetroWindow>
      </div>
    </section>
  );
}
