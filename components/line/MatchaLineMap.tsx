"use client";

import { motion, type Variants } from "motion/react";
import { useId } from "react";
import type { MatchaLine } from "@/types";
import { MAP_VIEWBOX, MATCHA_LINES, THAMES_PATH } from "@/data/matcha-lines";
import { formatPence } from "@/lib/format";
import { resolveLinePoints, toPathD } from "@/lib/matcha-line";
import { useMarket } from "@/hooks/useMarket";
import { StationNode } from "@/components/line/StationNode";

export interface MatchaLineMapProps {
  mode?: "full" | "preview";
  selectedSlug?: string | null;
  onSelect?: (slug: string) => void;
  className?: string;
}

const LINE_DRAW: Variants = {
  hidden: { pathLength: 0 },
  visible: (index: number) => ({
    pathLength: 1,
    transition: { delay: 0.15 + index * 0.35, duration: 1.4, ease: [0.65, 0, 0.35, 1] },
  }),
};

const FADE: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({ opacity: 1, transition: { delay, duration: 0.5 } }),
};

export function MatchaLineMap({ mode = "full", selectedSlug, onSelect, className = "" }: MatchaLineMapProps) {
  const market = useMarket();
  const titleId = useId();
  const interactive = mode === "full" && Boolean(onSelect);

  const summary = market.areas
    .map((stats) => `${stats.area.name} ${formatPence(stats.averagePence)}`)
    .join(", ");

  const animationProps =
    mode === "full"
      ? { initial: "hidden", animate: "visible" }
      : { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.25 } };

  return (
    <motion.svg
      viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
      className={`block h-auto select-none ${className}`}
      role={interactive ? "group" : "img"}
      aria-labelledby={titleId}
      {...animationProps}
    >
      <title id={titleId}>
        {`The Matcha Line: a schematic map of demo average matcha prices by London area. ${summary}.`}
      </title>

      <defs>
        <pattern id="map-dots" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1.6" fill="#151815" opacity="0.16" />
        </pattern>
      </defs>

      <rect width={MAP_VIEWBOX.width} height={MAP_VIEWBOX.height} fill="#f7f7ef" />
      <rect width={MAP_VIEWBOX.width} height={MAP_VIEWBOX.height} fill="url(#map-dots)" />

      {/* River */}
      <motion.g variants={FADE} custom={0}>
        <path d={THAMES_PATH} fill="none" stroke="#c7efb4" strokeWidth={46} strokeLinejoin="round" />
        <text className="map-small" x={70} y={806} fill="#245d36">
          RIVER THAMES · UNSWEETENED
        </text>
      </motion.g>

      <MapTitlePlate />

      {/* Lines */}
      {MATCHA_LINES.map((line, index) => (
        <LinePath key={line.id} line={line} index={index} />
      ))}

      {/* Stations */}
      <g aria-hidden={interactive ? undefined : true}>
        {market.areas.map((stats, index) => (
          <StationNode
            key={stats.area.slug}
            stats={stats}
            order={index}
            selected={selectedSlug === stats.area.slug}
            onSelect={interactive ? onSelect : undefined}
          />
        ))}
      </g>

      <MapLegend />
    </motion.svg>
  );
}

function LinePath({ line, index }: { line: MatchaLine; index: number }) {
  const d = toPathD(resolveLinePoints(line));
  const common = {
    d,
    fill: "none",
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
    variants: LINE_DRAW,
    custom: index,
  };

  if (line.style === "cased-matcha") {
    return (
      <g>
        <motion.path {...common} stroke="#151815" strokeWidth={20} />
        <motion.path {...common} stroke="#83d46d" strokeWidth={10} />
      </g>
    );
  }

  return (
    <motion.path
      {...common}
      stroke={line.style === "solid-ink" ? "#151815" : "#245d36"}
      strokeWidth={16}
    />
  );
}

function MapTitlePlate() {
  return (
    <motion.g variants={FADE} custom={0.2}>
      <rect x={40} y={40} width={360} height={128} fill="#151815" />
      <text className="map-title" x={58} y={96} fill="#83d46d">
        THE MATCHA
      </text>
      <text className="map-title" x={58} y={140} fill="#83d46d">
        LINE
      </text>
      <text className="map-small" x={196} y={124} fill="#c7efb4">
        SCHEMATIC.
      </text>
      <text className="map-small" x={196} y={144} fill="#c7efb4">
        NOT TO SCALE.
      </text>
      <rect x={40} y={168} width={360} height={30} fill="#ffd84a" stroke="#151815" strokeWidth={3} />
      <text className="map-small" x={54} y={189} fill="#151815">
        ▲ DEMO INDEX VALUES · NOT LIVE
      </text>
    </motion.g>
  );
}

function MapLegend() {
  return (
    <motion.g variants={FADE} custom={1.6}>
      <rect x={40} y={930} width={380} height={172} fill="#f7f7ef" stroke="#151815" strokeWidth={3} />
      <text className="map-small" x={58} y={960} fill="#151815">
        KEY
      </text>
      {MATCHA_LINES.map((line, index) => {
        const y = 990 + index * 30;
        return (
          <g key={line.id}>
            {line.style === "cased-matcha" ? (
              <>
                <line x1={58} x2={118} y1={y} y2={y} stroke="#151815" strokeWidth={16} />
                <line x1={58} x2={118} y1={y} y2={y} stroke="#83d46d" strokeWidth={8} />
              </>
            ) : (
              <line
                x1={58}
                x2={118}
                y1={y}
                y2={y}
                stroke={line.style === "solid-ink" ? "#151815" : "#245d36"}
                strokeWidth={13}
              />
            )}
            <text className="map-legend" x={134} y={y + 6} fill="#151815">
              {line.name.toUpperCase()}
            </text>
          </g>
        );
      })}
      <rect x={58} y={1070} width={20} height={16} fill="#151815" />
      <text className="map-small" x={86} y={1084} fill="#151815">
        ABOVE INDEX
      </text>
      <rect x={220} y={1070} width={20} height={16} fill="#83d46d" stroke="#151815" strokeWidth={2} />
      <text className="map-small" x={248} y={1084} fill="#151815">
        BELOW INDEX
      </text>
    </motion.g>
  );
}
