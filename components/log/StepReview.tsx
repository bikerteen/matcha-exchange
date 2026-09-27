"use client";

import type { AreaStats, Venue } from "@/types";
import { formatDelta, formatPence, formatReceiptDate } from "@/lib/format";
import { PosterButton } from "@/components/ui/PosterLink";
import type { SessionPhoto } from "@/components/log/StepPhoto";

function Row({ label, value, onEdit }: { label: string; value: string; onEdit?: () => void }) {
  return (
    <div className="grid grid-cols-[88px_1fr_auto] items-baseline gap-3 py-1.5">
      <dt className="text-[12px] tracking-[0.1em] uppercase">{label}</dt>
      <dd className="min-w-0 text-[16px] font-semibold uppercase break-words">{value}</dd>
      {onEdit ? (
        <button
          type="button"
          onClick={onEdit}
          className="min-h-9 px-1 text-[11px] tracking-[0.1em] uppercase underline underline-offset-2 hover:bg-matcha-light"
          aria-label={`Change ${label.toLowerCase()}`}
        >
          Edit
        </button>
      ) : (
        <span />
      )}
    </div>
  );
}

/** The check-in as a thermal receipt, before it is committed. */
export function StepReview({
  venue,
  areaStats,
  pricePence,
  drinkName,
  photo,
  printedAt,
  submitting,
  error,
  onEdit,
  onSubmit,
}: {
  venue: Venue;
  areaStats: AreaStats | undefined;
  pricePence: number;
  drinkName: string;
  photo: SessionPhoto | null;
  printedAt: string;
  submitting: boolean;
  error: string | null;
  onEdit: (step: number) => void;
  onSubmit: () => void;
}) {
  const delta = areaStats ? pricePence - areaStats.averagePence : null;

  return (
    <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,420px)_1fr] md:items-start">
      <div className="receipt-edge-top receipt-edge-bottom mx-auto w-full max-w-[420px] rotate-[-1deg] bg-off-white px-6 font-mono text-ink shadow-[0_18px_30px_-12px_rgba(21,24,21,0.45)]">
        <div className="text-center">
          <p className="display-wide text-[44px]">LMX</p>
          <p className="text-[11px] tracking-[0.18em] uppercase">The London Matcha Exchange</p>
          <p className="mt-1 text-[11px] tracking-[0.12em] uppercase">{formatReceiptDate(printedAt)}</p>
        </div>

        <div className="my-4 border-t-2 border-dashed border-ink" />

        {photo ? (
          <div className="bg-matcha p-1">
            {/* eslint-disable-next-line @next/next/no-img-element -- local object URL */}
            <img
              src={photo.url}
              alt="Your matcha, printed on the receipt"
              className="aspect-square w-full object-cover mix-blend-multiply grayscale contrast-125"
            />
          </div>
        ) : (
          <p className="border-2 border-dashed border-ink py-6 text-center text-[12px] tracking-[0.12em] uppercase">
            No photographic evidence
            <br />
            submitted
          </p>
        )}
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={() => onEdit(1)}
            className="min-h-9 px-1 text-[11px] tracking-[0.1em] uppercase underline underline-offset-2 hover:bg-matcha-light"
          >
            {photo ? "Change photo" : "Add photo"}
          </button>
        </div>

        <div className="my-3 border-t-2 border-dashed border-ink" />

        <dl>
          <Row label="Café" value={venue.name} onEdit={() => onEdit(0)} />
          <Row label="Area" value={areaStats?.area.name ?? "—"} />
          <Row label="Drink" value={drinkName.trim() || "Unspecified matcha"} onEdit={() => onEdit(2)} />
        </dl>

        <div className="my-3 border-t-2 border-dashed border-ink" />

        <div className="flex items-end justify-between">
          <p className="text-[12px] tracking-[0.1em] uppercase">Total</p>
          <p className="display tabular text-[64px] leading-none">{formatPence(pricePence)}</p>
        </div>
        {delta !== null ? (
          <p className="mt-1 text-right text-[11px] tracking-[0.1em] uppercase">
            {formatDelta(delta)} vs area avg
          </p>
        ) : null}

        <div className="my-3 border-t-2 border-dashed border-ink" />

        <div className="flex items-center justify-between text-[14px] font-semibold uppercase">
          <span>Shares to be issued</span>
          <span>1</span>
        </div>
        <p className="mt-4 text-center text-[10px] tracking-[0.12em] uppercase">
          Shares possess absolutely no financial value
          <br />
          ** Customer copy **
        </p>
        <svg className="mx-auto mt-3 h-10 w-full" viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
          {Array.from({ length: 48 }, (_, i) => (
            <rect key={i} x={i * 4.1} y={0} width={(i * 7) % 3 === 0 ? 2.6 : 1.2} height={40} fill="#151815" />
          ))}
        </svg>
      </div>

      <div className="md:pt-6">
        <p className="text-[20px] leading-snug font-medium md:text-[24px]">
          Check the receipt. Once it&rsquo;s logged, one share in <strong>{venue.name}</strong> is issued to your
          portfolio.
        </p>
        {error ? (
          <p role="alert" className="mt-4 border-[3px] border-ink bg-warning px-3 py-2 font-medium">
            {error}
          </p>
        ) : null}
        <PosterButton onClick={onSubmit} disabled={submitting} className="mt-8 w-full md:w-auto md:min-w-[360px]">
          {submitting ? "Logging…" : "Log matcha"}
        </PosterButton>
      </div>
    </div>
  );
}
