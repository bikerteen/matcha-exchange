"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useDragScroll } from "@/hooks/useDragScroll";

/** null = responsive default: a pannable 900px map on phones, fitted on desktop. */
type Zoom = null | "fit" | 900 | 1300 | 1800;

const STEPS: Array<Exclude<Zoom, null>> = ["fit", 900, 1300, 1800];

/**
 * A deliberate map viewport: the diagram pans inside a framed window rather
 * than overflowing the page, with a small map-viewer toolbar.
 */
export function MapViewport({ children }: { children: (svgClassName: string) => ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pendingCentre = useRef<{ x: number; y: number } | null>(null);
  const [zoom, setZoom] = useState<Zoom>(null);
  useDragScroll(scrollRef);

  // On phones, open on the east side of the network — that's where the trading happens.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) * 0.65;
    el.scrollTop = (el.scrollHeight - el.clientHeight) * 0.2;
  }, []);

  // Keep the same point centred when zooming.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    const centre = pendingCentre.current;
    if (!el || !centre) return;
    el.scrollLeft = centre.x * el.scrollWidth - el.clientWidth / 2;
    el.scrollTop = centre.y * el.scrollHeight - el.clientHeight / 2;
    pendingCentre.current = null;
  }, [zoom]);

  function change(target: "in" | "out" | "fit") {
    const el = scrollRef.current;
    if (el) {
      pendingCentre.current = {
        x: (el.scrollLeft + el.clientWidth / 2) / el.scrollWidth,
        y: (el.scrollTop + el.clientHeight / 2) / el.scrollHeight,
      };
    }
    if (target === "fit") return setZoom("fit");
    const overflowing = el ? el.scrollWidth > el.clientWidth + 1 : false;
    const current = zoom === null ? (overflowing ? 1 : 0) : STEPS.indexOf(zoom);
    const next = Math.max(0, Math.min(STEPS.length - 1, current + (target === "in" ? 1 : -1)));
    setZoom(STEPS[next]);
  }

  const svgClassName =
    zoom === null
      ? "mx-auto h-auto w-[900px] max-w-none md:h-full md:w-full"
      : zoom === "fit"
        ? "h-full w-full"
        : "mx-auto h-auto max-w-none";

  return (
    <div className="flex h-full flex-col border-[3px] border-ink bg-off-white shadow-[var(--shadow-hard)]">
      <div className="flex items-center justify-between gap-2 border-b-[3px] border-ink bg-window px-2 py-1.5">
        <p className="label text-[11px]">
          <span className="hidden sm:inline">Map viewer · </span>Drag to pan · tap a station
        </p>
        <div className="flex gap-1" role="group" aria-label="Map zoom">
          <button type="button" className="btn98 min-h-9 min-w-10 px-2 text-base" onClick={() => change("out")} aria-label="Zoom out">
            −
          </button>
          <button type="button" className="btn98 min-h-9 min-w-10 px-2 text-base" onClick={() => change("in")} aria-label="Zoom in">
            +
          </button>
          <button type="button" className="btn98 min-h-9 px-3 text-xs" onClick={() => change("fit")}>
            Fit
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="relative h-[66svh] min-h-[420px] cursor-grab overflow-auto overscroll-contain data-[dragging=true]:cursor-grabbing md:h-[min(84svh,980px)] lg:h-auto lg:min-h-0 lg:flex-1"
      >
        <div style={typeof zoom === "number" ? { width: zoom } : undefined} className={typeof zoom === "number" ? "mx-auto" : "h-full"}>
          {children(typeof zoom === "number" ? `${svgClassName} w-full` : svgClassName)}
        </div>
      </div>
    </div>
  );
}
