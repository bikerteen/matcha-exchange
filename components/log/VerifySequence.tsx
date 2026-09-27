"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "@/components/retro/ProgressBar";

const MESSAGES = [
  "VERIFYING GREEN LIQUID...",
  "CHECKING FOR WHISK MARKS...",
  "CONSULTING THE INDEX...",
  "ISSUING SHARE...",
];

/**
 * The comedic "verification" after logging. Nothing is actually verified —
 * the check-in has already been saved by the time this plays.
 */
export function VerifySequence({
  venueName,
  sharesInVenue,
  onLogAnother,
}: {
  venueName: string;
  sharesInVenue: number;
  onLogAnother: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const done = progress >= 100;
  const primaryRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (done) primaryRef.current?.focus();
  }, [done]);
  const message = MESSAGES[Math.min(MESSAGES.length - 1, Math.floor((progress / 100) * MESSAGES.length))];

  useEffect(() => {
    const total = reduceMotion ? 500 : 2600;
    const tick = 70;
    const start = performance.now();
    const timer = window.setInterval(() => {
      const elapsed = performance.now() - start;
      // Stutter a little around 60–75%, like any honest progress bar.
      const linear = Math.min(1, elapsed / total);
      const eased = linear < 0.6 ? linear : linear < 0.8 ? 0.6 + (linear - 0.6) * 0.4 : 0.68 + (linear - 0.8) * 1.6;
      setProgress(Math.min(100, Math.round(eased * 100)));
      if (linear >= 1) window.clearInterval(timer);
    }, tick);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <div className="font-system">
      <div aria-live="polite" className="sr-only">
        {done ? `Purchase logged. Plus one share acquired in ${venueName}.` : "Logging your matcha."}
      </div>

      {!done ? (
        <div className="py-2">
          <p className="font-mono text-[14px] font-semibold">{message}</p>
          <div className="mt-3">
            <ProgressBar value={progress} label="Verification progress" />
          </div>
          <p className="mt-2 text-right font-mono text-[14px] tabular">{progress}%</p>
        </div>
      ) : (
        <div>
          <ProgressBar value={100} label="Verification complete" />
          <p className="mt-2 text-right font-mono text-[14px]">100%</p>
          <p className="mt-3 font-mono text-[14px] font-semibold">PURCHASE LOGGED.</p>

          <motion.div
            className="relative mt-4 overflow-hidden border-[3px] border-ink bg-matcha px-4 py-6 text-center"
            initial={{ scale: 1.6, rotate: -8, opacity: 0 }}
            animate={{ scale: 1, rotate: -2, opacity: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 18 }}
          >
            <p className="display text-[clamp(64px,20vw,96px)] leading-[0.85]">+1 Share</p>
            <p className="display mt-1 text-[32px]">Acquired</p>
          </motion.div>

          <motion.p
            className="mt-4 text-[15px]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            You now hold <strong>{sharesInVenue}</strong> {sharesInVenue === 1 ? "share" : "shares"} in{" "}
            <strong>{venueName}</strong>.
          </motion.p>
          <p className="mt-2 text-[12px] text-ink/70">
            No liquid was actually verified. We took your word for it.
          </p>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <Link ref={primaryRef} href="/portfolio" className="btn98 btn98--primary">
              View portfolio
            </Link>
            <button type="button" className="btn98" onClick={onLogAnother}>
              Log another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
