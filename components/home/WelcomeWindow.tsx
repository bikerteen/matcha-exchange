"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { RetroWindow } from "@/components/retro/RetroWindow";

export function WelcomeWindow() {
  const [open, setOpen] = useState(true);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.15 } }}
          transition={{ delay: 0.9, type: "spring", stiffness: 420, damping: 30 }}
          className="rotate-[1.5deg]"
        >
          <RetroWindow
            title="WELCOME.exe"
            onClose={() => setOpen(false)}
            status="1 new system notice"
            bodyClassName="p-4"
            className="shadow-[8px_8px_0_var(--ink)]"
          >
            <div className="flex gap-4">
              <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
                <circle cx="20" cy="20" r="18" fill="#83d46d" stroke="#151815" strokeWidth="3" />
                <rect x="18" y="9" width="4" height="14" fill="#151815" />
                <rect x="18" y="26" width="4" height="4" fill="#151815" />
              </svg>
              <div className="text-[14px] leading-snug">
                <p className="font-bold">London runs on green liquid.</p>
                <p className="mt-2">
                  The Exchange tracks what the city pays for it. Log a matcha, receive one share. The share is worth
                  nothing. That is the point.
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Link href="/about" className="btn98 min-w-[96px]">
                Explain
              </Link>
              <button type="button" className="btn98 min-w-[96px]" onClick={() => setOpen(false)}>
                OK
              </button>
            </div>
          </RetroWindow>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
