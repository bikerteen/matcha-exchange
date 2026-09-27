import type { Metadata } from "next";
import { PosterLink } from "@/components/ui/PosterLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RetroWindow } from "@/components/retro/RetroWindow";

export const metadata: Metadata = {
  title: "About the Exchange",
  description: "What LMX is, what it isn't, and what happens to your data.",
};

const NOTICES = [
  {
    q: "What is this?",
    a: "London now drinks enough matcha to need its own infrastructure. LMX is that infrastructure: a map of what it costs, a place to log what you paid, and a portfolio of everything you've bought.",
  },
  {
    q: "What is a share?",
    a: "Every matcha you log earns you one share in the café you bought it from. Five matchas at one café, five shares. Shares cannot be sold, traded, redeemed or taxed. They are a count of cups with ideas above their station.",
  },
  {
    q: "Are the prices real?",
    a: "Not yet. The index, the area averages and the venues on this version are seeded demo data. Nothing is live and nothing is crowdsourced. When you log a matcha it is blended into the figures you see, on your device only.",
  },
  {
    q: "Where does my data go?",
    a: "Nowhere. Your logs and any cafés you add are saved in your browser's local storage. Your photos are never uploaded or saved — they exist only until you leave the page.",
  },
  {
    q: "Is the Matcha Line a Tube map?",
    a: "No. It is a fictional transport-style diagram of our own invention. It is not affiliated with, or endorsed by, Transport for London.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-matcha">
      <div className="mx-auto max-w-[1440px] px-4 pt-8 pb-16 md:px-8 md:pt-12">
        <SectionLabel number="05" aside="Public notice">
          About
        </SectionLabel>
        <h1 className="display mt-6 text-[clamp(72px,19vw,220px)]">
          London
          <br />
          runs on
          <br />
          green liquid.
        </h1>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px]">
          <dl className="border-t-[3px] border-ink">
            {NOTICES.map((notice, index) => (
              <div key={notice.q} className="grid gap-3 border-b-[3px] border-ink py-8 md:grid-cols-[80px_minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-8">
                <span className="label font-semibold" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <dt className="display text-[clamp(40px,7vw,64px)]">{notice.q}</dt>
                <dd className="text-[18px] leading-relaxed">{notice.a}</dd>
              </div>
            ))}
          </dl>

          <div className="grid content-start gap-8">
            <RetroWindow title="SYSTEM_INFO.exe" bodyClassName="p-4" status="All systems whisking">
              <dl className="grid gap-2 font-system text-[14px]">
                {[
                  ["Exchange", "LMX"],
                  ["Version", "1.0 (front-end only)"],
                  ["Data", "Seeded demo index"],
                  ["Storage", "This device"],
                  ["Photos", "Not stored"],
                  ["Shares", "Worthless"],
                ].map(([key, value]) => (
                  <div key={key} className="leader">
                    <dt className="font-bold uppercase">{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </RetroWindow>

            <div className="on-dark bg-ink p-6 text-matcha">
              <p className="display text-[48px]">Please do not contact the FCA.</p>
              <p className="mt-4 text-[16px] text-matcha-light">
                LMX is a cultural project, not a financial product. Nothing here is investment advice, except perhaps
                &ldquo;bring a reusable cup&rdquo;.
              </p>
            </div>

            <PosterLink href="/log">Log a matcha</PosterLink>
          </div>
        </div>
      </div>
    </div>
  );
}
