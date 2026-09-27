import type { Metadata } from "next";
import { LineExplorer } from "@/components/line/LineExplorer";
import { DemoSticker } from "@/components/ui/DemoSticker";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "The Matcha Line",
  description: "A schematic map of average matcha prices across London. Demo index values.",
};

export default function LinePage() {
  return (
    <div className="grid-paper">
      <div className="mx-auto max-w-[1440px] px-4 pt-8 pb-16 md:px-8 md:pt-12">
        <SectionLabel number="02" aside="Network map">
          Public information
        </SectionLabel>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h1 className="display text-[clamp(72px,19vw,220px)]">
            The
            <br />
            Matcha
            <br />
            Line
          </h1>
          <div className="max-w-sm pb-2">
            <p className="text-[18px] leading-snug font-medium">
              Average matcha prices across the network. Tap any station for the area report.
            </p>
            <DemoSticker className="mt-4" />
          </div>
        </div>
        <div className="mt-10">
          <LineExplorer />
        </div>
      </div>
    </div>
  );
}
