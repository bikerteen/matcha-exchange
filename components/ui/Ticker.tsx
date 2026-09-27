"use client";

import { formatDelta, formatPence } from "@/lib/format";
import { useMarket } from "@/hooks/useMarket";

/** LED-style scrolling price strip. Decorative duplicate of data shown elsewhere. */
export function Ticker() {
  const market = useMarket();
  const items = [
    { key: "index", text: `LONDON INDEX ${formatPence(market.londonAveragePence)}` },
    ...market.areas.map((stats) => ({
      key: stats.area.slug,
      text: `${stats.area.name.toUpperCase()} ${formatPence(stats.averagePence)} ${
        stats.deltaPence >= 0 ? "▲" : "▼"
      } ${formatDelta(stats.deltaPence)}`,
    })),
    { key: "status", text: "WAITING FOR EAST LONDON TO REPORT" },
    { key: "demo", text: "DEMO INDEX — NOT LIVE PRICES" },
  ];

  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item.key} className="flex items-center whitespace-nowrap">
          <span className="px-5">{item.text}</span>
          <span aria-hidden="true" className="text-matcha-dark">●</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="on-dark overflow-hidden border-y-2 border-ink bg-ink py-3 text-matcha">
      <p className="sr-only">Demo price ticker for the London Matcha Index.</p>
      <div className="label flex w-max animate-ticker text-[13px] font-semibold" aria-hidden="true">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
