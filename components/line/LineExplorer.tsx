"use client";

import { useState } from "react";
import { MATCHA_LINES } from "@/data/matcha-lines";
import { AreaWindow, LineSwatch } from "@/components/line/AreaWindow";
import { MapViewport } from "@/components/line/MapViewport";
import { MatchaLineMap } from "@/components/line/MatchaLineMap";
import { StationBoard } from "@/components/line/StationBoard";

export function LineExplorer() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(340px,1fr)] lg:items-start">
        <div className="min-w-0 lg:sticky lg:top-24 lg:h-[min(84svh,980px)]">
          <MapViewport>
            {(svgClassName) => (
              <MatchaLineMap
                mode="full"
                className={svgClassName}
                selectedSlug={selected}
                onSelect={setSelected}
              />
            )}
          </MapViewport>
          <ul className="label mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] lg:hidden" aria-label="Line key">
            {MATCHA_LINES.map((line) => (
              <li key={line.id} className="flex items-center gap-2">
                <LineSwatch style={line.style} />
                {line.name}
              </li>
            ))}
          </ul>
        </div>

        <StationBoard onSelect={setSelected} />
      </div>

      <AreaWindow areaSlug={selected} onClose={() => setSelected(null)} />
    </>
  );
}
