"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MarketStatus } from "@/components/nav/MarketStatus";
import { NAV_ITEMS, isActivePath } from "@/components/nav/nav-items";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="on-dark sticky top-0 z-40 bg-ink text-matcha">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-4 md:h-16 md:px-8">
        <Link
          href="/"
          className="flex items-baseline gap-3"
          aria-label="LMX — The London Matcha Exchange, home"
        >
          <span className="display-wide text-[28px] md:text-[32px]">LMX</span>
          <span className="label hidden text-matcha-light lg:inline">The London Matcha Exchange</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`label block px-3 py-2 text-[12px] transition-colors ${
                      active
                        ? "bg-matcha text-ink"
                        : "text-matcha hover:bg-matcha-deep"
                    } ${item.icon === "log" && !active ? "outline-2 outline-matcha -outline-offset-2" : ""}`}
                  >
                    {item.shortLabel}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <MarketStatus className="hidden text-matcha-light sm:flex" />
          <Link
            href="/about"
            aria-current={isActivePath(pathname, "/about") ? "page" : undefined}
            className={`label px-2 py-2 text-[12px] ${
              isActivePath(pathname, "/about") ? "bg-matcha text-ink" : "text-matcha hover:bg-matcha-deep"
            }`}
          >
            About
          </Link>
        </div>
      </div>
    </header>
  );
}
