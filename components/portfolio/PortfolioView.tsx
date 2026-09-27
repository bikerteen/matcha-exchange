"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { useHolderName } from "@/hooks/useHolderName";
import { useHydrated } from "@/hooks/useHydrated";
import { usePortfolio } from "@/hooks/useMarket";
import { Certificate } from "@/components/portfolio/Certificate";
import { CertificateControls } from "@/components/portfolio/CertificateControls";
import { Ledger } from "@/components/portfolio/Ledger";
import { PosterLink } from "@/components/ui/PosterLink";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function PortfolioView() {
  const hydrated = useHydrated();
  const portfolio = usePortfolio();
  const [holderName] = useHolderName();
  const certificateRef = useRef<HTMLDivElement>(null);
  const empty = portfolio.totalShares === 0;

  return (
    <div className="mx-auto max-w-[1440px] px-4 pt-8 pb-16 md:px-8 md:pt-12">
      <SectionLabel number="04" aside={<span className="hidden sm:inline">Holder records · this device</span>}>
        Ownership
      </SectionLabel>

      <div className="mt-6 grid gap-10 lg:mt-10 lg:grid-cols-[minmax(0,600px)_minmax(0,1fr)] lg:gap-x-14">
        <div className="@container lg:col-start-2 lg:row-start-1">
          <h1 className="display text-[min(22cqw,200px)]">
            Your
            <br />
            matcha
            <br />
            portfolio
          </h1>
        </div>

        <div className="mx-auto w-full max-w-[600px] lg:col-start-1 lg:row-span-2 lg:row-start-1">
          {hydrated ? (
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: -0.6 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              className="shadow-[12px_12px_0_var(--ink)]"
            >
              <Certificate ref={certificateRef} portfolio={portfolio} holderName={holderName} />
            </motion.div>
          ) : (
            <div className="aspect-[4/5] w-full border-[3px] border-dashed border-ink" aria-hidden="true" />
          )}
        </div>

        <div className="grid content-start gap-6 lg:col-start-2">
          <CertificateControls
            certificateRef={certificateRef}
            disabled={!hydrated || empty}
            certificateNumber={portfolio.certificateNumber}
          />
          {hydrated && empty ? (
            <div className="border-[3px] border-ink bg-cream p-5">
              <p className="display text-[44px]">No holdings yet.</p>
              <p className="mt-3 text-[17px] leading-snug">
                Every matcha you log issues one share in that café. Your first share issues your certificate.
              </p>
              <PosterLink href="/log" className="mt-6 w-full">
                Log a matcha
              </PosterLink>
            </div>
          ) : (
            <PosterLink href="/log" tone="matcha" className="w-full">
              Log another matcha
            </PosterLink>
          )}
          <p className="label">
            Shares are counted from matchas logged on this device. They are not transferable, redeemable or real.
          </p>
        </div>
      </div>

      {hydrated && !empty ? (
        <div className="mt-20">
          <Ledger portfolio={portfolio} />
        </div>
      ) : null}
    </div>
  );
}
