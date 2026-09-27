import Link from "next/link";
import { MatchaLineMap } from "@/components/line/MatchaLineMap";
import { PosterLink } from "@/components/ui/PosterLink";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function LinePreview() {
  return (
    <section className="on-dark bg-matcha-dark text-cream" aria-labelledby="line-preview-heading">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 md:px-8 md:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div className="@container">
          <SectionLabel number="02" className="text-matcha-light">
            Network map
          </SectionLabel>
          <h2 id="line-preview-heading" className="display mt-8 text-[min(29cqw,230px)] text-matcha">
            The
            <br />
            Matcha
            <br />
            Line
          </h2>
          <p className="mt-6 max-w-md text-[18px] leading-snug">
            Twelve areas, three lines, one question: what does a matcha cost round here? A public-information diagram
            for the city&rsquo;s most important liquid.
          </p>
          <PosterLink href="/line" tone="matcha" className="mt-8 w-full sm:w-auto">
            View the Matcha Line
          </PosterLink>
        </div>

        <Link
          href="/line"
          aria-label="Open the Matcha Line map"
          className="group relative block aspect-[4/5] overflow-hidden border-[3px] border-ink bg-off-white shadow-[10px_10px_0_var(--ink)] md:aspect-auto"
        >
          <MatchaLineMap
            mode="preview"
            className="absolute top-[-6%] left-[-78%] w-[190%] max-w-none transition-transform duration-500 group-hover:scale-[1.02] md:static md:w-full"
          />
          <span className="label absolute right-3 bottom-3 bg-ink px-2 py-1 text-matcha">Tap to explore →</span>
        </Link>
      </div>
    </section>
  );
}
