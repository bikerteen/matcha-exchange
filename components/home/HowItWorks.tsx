import { SectionLabel } from "@/components/ui/SectionLabel";

const STEPS = [
  {
    number: "01",
    title: "Buy a matcha",
    body: "Anywhere in London, at whatever price they've decided on today.",
    stub: "ADMIT ONE CUP",
  },
  {
    number: "02",
    title: "Log it",
    body: "Pick the café, show us the goods, tell us how much they robbed you.",
    stub: "PHOTO · PRICE · PLACE",
  },
  {
    number: "03",
    title: "+1 Share",
    body: "One share in that café, added to your portfolio. Worth exactly nothing.",
    stub: "NO FINANCIAL VALUE",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-matcha" aria-labelledby="how-heading">
      <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-8 md:py-20">
        <SectionLabel number="03">How the exchange works</SectionLabel>
        <h2 id="how-heading" className="display mt-8 text-[clamp(56px,13vw,150px)]">
          One cup.
          <br />
          One share.
        </h2>

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li
              key={step.number}
              className="flex border-[3px] border-ink bg-cream shadow-[var(--shadow-hard)]"
              style={{ transform: `rotate(${[-1, 0.6, -0.4][index]}deg)` }}
            >
              <div className="flex-1 p-5">
                <p className="display text-[72px] leading-none text-matcha-dark">{step.number}</p>
                <h3 className="display mt-3 text-[40px]">{step.title}</h3>
                <p className="mt-3 text-[16px] leading-snug">{step.body}</p>
              </div>
              <div className="relative w-12 shrink-0 border-l-[3px] border-dashed border-ink bg-ink">
                <p className="label absolute top-1/2 left-1/2 w-max -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-matcha">
                  {step.stub}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
