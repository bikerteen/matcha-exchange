"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { formatDelta, formatPence, padCount } from "@/lib/format";
import { useMarket } from "@/hooks/useMarket";
import { DemoSticker } from "@/components/ui/DemoSticker";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Split-flap style digits — each character on its own tile. */
function FlapDigits({ value }: { value: string }) {
  return (
    <span className="inline-flex gap-[0.06em]" aria-hidden="true">
      {value.split("").map((char, index) => (
        <span
          key={`${index}-${char}`}
          className="relative inline-block bg-ink px-[0.08em] pt-[0.1em] text-matcha after:absolute after:inset-x-0 after:top-1/2 after:h-[3px] after:bg-cream"
        >
          {char}
        </span>
      ))}
    </span>
  );
}

function Stat({
  number,
  label,
  value,
  srValue,
  footnote,
  className = "",
  delay = 0,
}: {
  number: string;
  label: string;
  value: ReactNode;
  srValue: string;
  footnote?: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`flex flex-col justify-between gap-6 border-ink p-5 md:p-8 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <dt className="label flex items-center justify-between gap-3">
        <span>{label}</span>
        <span className="font-semibold">{number}</span>
      </dt>
      <dd>
        <span className="sr-only">{srValue}</span>
        <span aria-hidden="true">{value}</span>
        {footnote ? <span className="label mt-3 block text-ink/70">{footnote}</span> : null}
      </dd>
    </motion.div>
  );
}

export function IndexBoard() {
  const market = useMarket();

  return (
    <section className="paper border-b-[3px] border-ink" aria-labelledby="index-heading">
      <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-8 md:py-20">
        <SectionLabel number="01" aside={<span className="hidden sm:inline">Updated when you log</span>}>
          The London Matcha Index
        </SectionLabel>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <h2 id="index-heading" className="display text-[clamp(56px,14vw,160px)]">
            The city&rsquo;s
            <br />
            green numbers.
          </h2>
          <DemoSticker rotate={3}>Demo index · not live data</DemoSticker>
        </div>

        <dl className="mt-10 grid border-[3px] border-ink bg-off-white md:grid-cols-2">
          <Stat
            number="A"
            label="London matcha average"
            srValue={formatPence(market.londonAveragePence)}
            value={
              <span className="display tabular block text-[clamp(96px,24vw,240px)] leading-[0.8]">
                {formatPence(market.londonAveragePence)}
              </span>
            }
            footnote="Per cup · weighted across all areas"
            className="border-b-[3px] md:col-span-2"
          />
          <Stat
            number="B"
            label="Matchas logged"
            srValue={String(market.totalLogs)}
            value={
              <span className="display tabular block text-[clamp(64px,10.5vw,150px)] leading-[0.9]">
                <FlapDigits value={padCount(market.totalLogs)} />
              </span>
            }
            footnote={
              market.includesUserData
                ? `Includes ${market.userLogs} from this device`
                : "Seeded demo logs · none from you yet"
            }
            className="border-b-[3px] md:border-r-[3px] md:border-b-0"
            delay={0.08}
          />
          <Stat
            number="C"
            label="Most active area"
            srValue={market.mostActiveArea.area.name}
            value={
              <span className="display block text-[clamp(56px,11vw,120px)] break-words">
                {market.mostActiveArea.area.name}
              </span>
            }
            footnote={`${market.mostActiveArea.logCount} logs · ${formatDelta(market.mostActiveArea.deltaPence)} vs index`}
            delay={0.16}
          />
        </dl>

        <div className="mt-6 grid gap-2 border-[3px] border-ink bg-matcha p-4 md:flex md:items-center md:justify-between md:px-6">
          <p className="label">Most logged café</p>
          <p className="display text-[36px] md:text-[44px]">
            {market.mostLoggedVenue.venue.name}
          </p>
          <p className="font-mono text-[16px] font-semibold md:text-right">
            {formatPence(market.mostLoggedVenue.averagePence)} avg · {market.mostLoggedVenue.logCount} logs
          </p>
        </div>

        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed">
          These figures are seeded demo values, blended with any matchas you log on this device. They are not live, not
          crowdsourced and not prices we have checked. The venues are fictional. The index will get real once London
          starts reporting.
        </p>
      </div>
    </section>
  );
}
