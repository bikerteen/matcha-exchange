import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink text-matcha">
      <div className="stripes h-4" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr] md:px-8 md:py-16">
        <div>
          <p className="display text-[clamp(44px,11vw,120px)]">
            Shares possess absolutely no financial value.
          </p>
          <p className="display mt-4 text-[clamp(24px,5vw,44px)] text-matcha-light">
            Please do not contact the FCA.
          </p>
        </div>
        <div className="flex flex-col justify-end gap-6">
          <ul className="label grid gap-2 text-matcha-light">
            <li>Index figures are seeded demo data, not live prices.</li>
            <li>Venues listed are fictional demo cafés.</li>
            <li>Your logs are stored on this device only.</li>
            <li>Photos never leave your phone.</li>
            <li>Not affiliated with Transport for London.</li>
          </ul>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-matcha-deep pt-4">
            <p className="label">LMX · Est. London / 2026</p>
            <Link href="/about" className="label underline decoration-2 underline-offset-4 hover:text-matcha-light">
              About the exchange
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
