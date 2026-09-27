import type { Ref } from "react";
import type { Portfolio } from "@/types";
import { formatPence } from "@/lib/format";
import { certificateRows } from "@/lib/portfolio";

/**
 * The official certificate. Every dimension is in container-query units so it
 * renders identically at any width — and exports cleanly at 1080 × 1350.
 */
export function Certificate({
  portfolio,
  holderName,
  ref,
}: {
  portfolio: Portfolio;
  holderName: string;
  ref?: Ref<HTMLDivElement>;
}) {
    const empty = portfolio.totalShares === 0;
    const rows = certificateRows(portfolio.holdings);
    const holder = holderName.trim() || "The Bearer";

    return (
      <div
        ref={ref}
        className="@container relative aspect-[4/5] w-full overflow-hidden bg-matcha text-ink"
        role="img"
        aria-label={
          empty
            ? "Specimen certificate of matcha ownership. No shares held yet."
            : `Certificate of matcha ownership: ${holder} holds ${portfolio.totalShares} shares. Total acquisition ${formatPence(portfolio.totalSpentPence)}. Classification ${portfolio.classification}.`
        }
      >
        <Guilloche />

        <div className="absolute inset-[2.6cqw] flex flex-col border-[0.8cqw] border-ink p-[0.8cqw]">
          <div className="flex flex-1 flex-col border-[0.3cqw] border-ink px-[4cqw] pt-[3cqw] pb-[2.4cqw]">
            {/* Header */}
            <div className="flex items-start justify-between gap-[2cqw] border-b-[0.5cqw] border-ink pb-[1.6cqw]">
              <p className="font-mono text-[1.9cqw] leading-[1.35] font-semibold tracking-[0.16em] uppercase">
                The London
                <br />
                Matcha Exchange
              </p>
              <p className="font-mono text-[1.9cqw] leading-[1.35] tracking-[0.12em] uppercase text-right">
                Est. London
                <br />
                2026
              </p>
              <p className="display-wide bg-ink px-[1.2cqw] pt-[0.6cqw] text-[5.2cqw] leading-none text-matcha">LMX</p>
            </div>

            {/* Title */}
            <h2 className="display mt-[2.4cqw] text-[7.4cqw]">Certificate of</h2>
            <p className="display text-[11.4cqw] leading-[0.82]">Matcha ownership</p>

            {/* Holder */}
            <p className="mt-[3cqw] font-mono text-[1.9cqw] tracking-[0.16em] uppercase">This is to certify that</p>
            <p className="display mt-[0.6cqw] truncate border-b-[0.35cqw] border-ink pb-[0.6cqw] text-[6.6cqw]">
              {holder}
            </p>
            <p className="mt-[1.6cqw] font-mono text-[1.9cqw] tracking-[0.16em] uppercase">
              Is currently in possession of
            </p>

            {/* Shares + holdings */}
            <div className="mt-[1cqw] grid flex-1 grid-cols-[auto_1fr] items-start gap-[3.5cqw]">
              <div>
                <p className="display tabular text-[25cqw] leading-[0.78]">{portfolio.totalShares}</p>
                <p className="display mt-[0.6cqw] text-[6.2cqw]">{portfolio.totalShares === 1 ? "Share" : "Shares"}</p>
              </div>
              <div className="pt-[1cqw]">
                {empty ? (
                  <p className="font-mono text-[2.3cqw] leading-snug uppercase">
                    No holdings on record.
                    <br />
                    Log a matcha to be issued your first share.
                  </p>
                ) : (
                  <ul className="grid gap-[0.9cqw]">
                    {rows.map((row) => (
                      <li
                        key={row.label}
                        className="leader font-mono text-[2.6cqw] leading-none font-semibold uppercase"
                      >
                        <span className="max-w-[28cqw] truncate">{row.label}</span>
                        <span className="tabular">{row.shares}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Figures */}
            <dl className="mt-[2cqw] grid grid-cols-3 border-y-[0.5cqw] border-ink">
              <div className="border-r-[0.3cqw] border-ink py-[1.4cqw] pr-[1.6cqw]">
                <dt className="font-mono text-[1.6cqw] tracking-[0.14em] uppercase">Total acquisition</dt>
                <dd className="display tabular mt-[0.6cqw] text-[5.2cqw]">{formatPence(portfolio.totalSpentPence)}</dd>
              </div>
              <div className="border-r-[0.3cqw] border-ink px-[1.6cqw] py-[1.4cqw]">
                <dt className="font-mono text-[1.6cqw] tracking-[0.14em] uppercase">Most exposed area</dt>
                <dd className="display mt-[0.6cqw] text-[3.9cqw] leading-[0.9] break-words">
                  {portfolio.mostVisitedArea?.areaName ?? "None yet"}
                </dd>
              </div>
              <div className="py-[1.4cqw] pl-[1.6cqw]">
                <dt className="font-mono text-[1.6cqw] tracking-[0.14em] uppercase">Classification</dt>
                <dd className="display mt-[0.6cqw] text-[3.6cqw] leading-[0.9]">{portfolio.classification}</dd>
              </div>
            </dl>

            {/* Seal, signature, number */}
            <div className="mt-[2.4cqw] flex items-end justify-between gap-[3cqw]">
              <Seal />
              <div className="flex-1">
                <Signature />
                <p className="border-t-[0.3cqw] border-ink pt-[0.6cqw] font-mono text-[1.6cqw] tracking-[0.14em] uppercase">
                  Registrar of Green Liquid
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[1.5cqw] tracking-[0.14em] uppercase">Certificate no.</p>
                <p className="font-mono tabular text-[2.3cqw] font-semibold">{portfolio.certificateNumber}</p>
              </div>
            </div>

            <p className="mt-[2cqw] text-center font-mono text-[1.45cqw] leading-[1.4] font-semibold tracking-[0.06em] uppercase">
              Shares possess absolutely no financial value. Please do not contact the FCA.
            </p>
          </div>
        </div>

        {empty ? (
          <p
            aria-hidden="true"
            className="display pointer-events-none absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[18deg] border-[1.2cqw] border-matcha-dark px-[3cqw] pt-[1.4cqw] text-[14cqw] text-matcha-dark opacity-80"
          >
            Specimen
          </p>
        ) : null}
      </div>
    );
}

/** Engraved-banknote background linework. */
function Guilloche() {
  const rings = Array.from({ length: 22 }, (_, i) => i);
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="none" stroke="#245d36" strokeWidth="0.6" opacity="0.28">
        {rings.map((i) => (
          <ellipse
            key={i}
            cx="310"
            cy="250"
            rx={40 + i * 9}
            ry={24 + i * 13}
            transform={`rotate(${i * 8.2} 310 250)`}
          />
        ))}
      </g>
    </svg>
  );
}

function Seal() {
  const text = "OFFICIAL SEAL · LONDON MATCHA EXCHANGE · ";
  return (
    <svg viewBox="0 0 120 120" className="w-[15cqw] shrink-0 -rotate-12" aria-hidden="true">
      <defs>
        <path id="seal-circle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
      </defs>
      <circle cx="60" cy="60" r="57" fill="#151815" />
      <circle cx="60" cy="60" r="53" fill="none" stroke="#83d46d" strokeWidth="1.5" strokeDasharray="2 3" />
      <text fill="#83d46d" fontSize="9.6" fontFamily="var(--font-mono)" fontWeight="600">
        <textPath href="#seal-circle" textLength="274" lengthAdjust="spacingAndGlyphs">
          {text}
        </textPath>
      </text>
      <circle cx="60" cy="60" r="31" fill="#83d46d" />
      <text
        x="60"
        y="69"
        textAnchor="middle"
        fill="#151815"
        fontSize="26"
        fontWeight="900"
        fontFamily="var(--font-display)"
        style={{ fontStretch: "110%" }}
      >
        LMX
      </text>
    </svg>
  );
}

function Signature() {
  return (
    <svg viewBox="0 0 220 50" className="h-[6cqw] w-auto" aria-hidden="true">
      <path
        d="M4 38c14-24 22-30 26-22s-8 22-2 20 16-30 24-28-6 26 2 24 12-18 18-16-2 14 4 13 10-10 16-9 2 8 8 7 20-8 34-8 40 2 52-4"
        fill="none"
        stroke="#151815"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
