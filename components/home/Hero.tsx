"use client";

import { motion } from "motion/react";
import { MarketStatus } from "@/components/nav/MarketStatus";
import { PosterLink } from "@/components/ui/PosterLink";
import { WelcomeWindow } from "@/components/home/WelcomeWindow";

const WORDS = ["London", "Matcha", "Exchange"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-matcha" aria-labelledby="hero-heading">
      <div className="mx-auto max-w-[1440px] px-4 pt-5 pb-12 md:px-8 md:pt-8 md:pb-20">
        <div className="label flex items-center justify-between gap-4 border-b-2 border-ink pb-3">
          <span>Est. London / 2026</span>
          <span className="hidden md:inline">Index No. 001 · Zone 1–2</span>
          <MarketStatus className="sm:hidden" />
          <span className="hidden sm:inline">Demo index · not live</span>
        </div>

        <div className="relative mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end">
          <div className="@container">
            <motion.p
              className="display-wide inline-block bg-ink px-3 pt-2 pb-1 text-[clamp(48px,13vw,120px)] text-matcha"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
              aria-hidden="true"
            >
              LMX
            </motion.p>

            <h1 id="hero-heading" className="display mt-4 text-[clamp(64px,23.8cqw,340px)]">
              <span className="sr-only">LMX — The London Matcha Exchange</span>
              {WORDS.map((word, index) => (
                <span key={word} className="block overflow-hidden pb-[0.04em]" aria-hidden="true">
                  <motion.span
                    className="block"
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          <div className="hidden lg:block">
            <WelcomeWindow />
          </div>
        </div>

        <div className="mt-8 grid gap-8 border-t-[3px] border-ink pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="display text-[clamp(34px,8vw,64px)]">
            Tracking London&rsquo;s
            <br />
            green economy.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:flex lg:[&>a]:whitespace-nowrap">
            <PosterLink href="/log">Log a matcha</PosterLink>
            <PosterLink href="/line" tone="light">
              View the Matcha Line
            </PosterLink>
          </div>
        </div>
      </div>
    </section>
  );
}
