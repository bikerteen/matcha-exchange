"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import { CertificateIcon, CupIcon, LineIcon, PlusIcon } from "@/components/icons";
import { NAV_ITEMS, isActivePath, type NavItem } from "@/components/nav/nav-items";

const ICONS: Record<NavItem["icon"], ComponentType<{ size?: number }>> = {
  home: CupIcon,
  line: LineIcon,
  log: PlusIcon,
  portfolio: CertificateIcon,
};

/** Persistent mobile navigation — a ticket-machine keypad pinned to the bottom. */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="on-dark fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-ink pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid h-[var(--nav-height)] grid-cols-4">
        {NAV_ITEMS.map((item) => {
          const active = isActivePath(pathname, item.href);
          const Icon = ICONS[item.icon];

          if (item.icon === "log") {
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  aria-label={item.label}
                  className={`absolute inset-x-1.5 -top-4 bottom-2 flex flex-col items-center justify-center gap-0.5 border-2 border-ink text-ink shadow-[0_0_0_2px_var(--matcha)] transition-transform active:translate-y-0.5 ${
                    active ? "bg-matcha-light" : "bg-matcha"
                  }`}
                >
                  <Icon size={24} />
                  <span className="label text-[10px] font-semibold tracking-[0.1em]">{item.shortLabel}</span>
                </Link>
              </li>
            );
          }

          return (
            <li key={item.href} className="border-r border-matcha-deep last:border-r-0">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex h-full flex-col items-center justify-center gap-1 transition-colors ${
                  active ? "bg-matcha-deep text-matcha" : "text-matcha-light/80 hover:text-matcha"
                }`}
              >
                <Icon size={22} />
                <span className="label text-[10px] tracking-[0.1em]">{item.shortLabel}</span>
                <span
                  aria-hidden="true"
                  className={`h-[3px] w-6 ${active ? "bg-matcha" : "bg-transparent"}`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
