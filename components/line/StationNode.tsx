"use client";

import { motion, type Variants } from "motion/react";
import type { KeyboardEvent } from "react";
import type { AreaStats } from "@/types";
import { formatDelta, formatPence } from "@/lib/format";
import { TAG_HEIGHT, labelBox } from "@/lib/matcha-line";

const NODE: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (order: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: 0.9 + order * 0.07, type: "spring", stiffness: 600, damping: 22 },
  }),
};

const LABEL: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: (order: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 1.05 + order * 0.07, duration: 0.35 },
  }),
};

export function describeDelta(deltaPence: number): string {
  if (deltaPence === 0) return "exactly on the London index";
  return `${formatDelta(deltaPence).replace(/^[+-]/, "")} ${deltaPence > 0 ? "above" : "below"} the London index`;
}

export function StationNode({
  stats,
  order,
  selected,
  onSelect,
}: {
  stats: AreaStats;
  order: number;
  selected: boolean;
  onSelect?: (slug: string) => void;
}) {
  const { area, averagePence, deltaPence } = stats;
  const name = area.name.toUpperCase();
  const price = formatPence(averagePence);
  const box = labelBox(area.label, area.x, area.y, name, price);
  const interchange = area.lines.length > 1;
  const radius = interchange ? 17 : 12;
  const above = deltaPence > 0;

  const nameX = area.x + area.label.dx;
  const nameY = area.y + area.label.dy;
  const priceX = box.tagLeft + box.tagWidth / 2;

  const interactive = Boolean(onSelect);

  function handleKeyDown(event: KeyboardEvent<SVGGElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect?.(area.slug);
    }
  }

  return (
    <g
      className={interactive ? "group cursor-pointer outline-none" : undefined}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={
        interactive
          ? `${area.name}: demo average ${price}, ${describeDelta(deltaPence)}. Open area information.`
          : undefined
      }
      aria-haspopup={interactive ? "dialog" : undefined}
      onClick={interactive ? () => onSelect?.(area.slug) : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
    >
      {/* Generous invisible hit area covering node and label. */}
      {interactive ? (
        <>
          <circle cx={area.x} cy={area.y} r={36} fill="transparent" />
          <rect
            x={box.left - 8}
            y={box.top - 8}
            width={box.width + 16}
            height={box.height + 16}
            fill="transparent"
          />
        </>
      ) : null}

      {/* Focus / selected ring */}
      <circle
        cx={area.x}
        cy={area.y}
        r={radius + 12}
        fill={selected ? "#83d46d" : "none"}
        stroke="#151815"
        strokeWidth={3}
        strokeDasharray="6 5"
        className={`transition-opacity ${selected ? "opacity-100" : "opacity-0"} ${
          interactive ? "group-hover:opacity-100 group-focus-visible:opacity-100" : ""
        }`}
      />

      <motion.circle
        cx={area.x}
        cy={area.y}
        r={radius}
        fill="#ffffff"
        stroke="#151815"
        strokeWidth={interchange ? 7 : 5.5}
        variants={NODE}
        custom={order}
      />
      {interchange ? (
        <motion.circle cx={area.x} cy={area.y} r={4} fill="#151815" variants={NODE} custom={order} />
      ) : null}

      <motion.g variants={LABEL} custom={order}>
        <text className="map-name" x={nameX} y={nameY} textAnchor={area.label.anchor} fill="#151815">
          {name}
        </text>
        <rect
          x={box.tagLeft}
          y={box.tagTop}
          width={box.tagWidth}
          height={TAG_HEIGHT}
          fill={above ? "#151815" : "#83d46d"}
          stroke="#151815"
          strokeWidth={2.5}
        />
        <text
          className="map-price"
          x={priceX}
          y={box.tagTop + 21}
          textAnchor="middle"
          fill={above ? "#83d46d" : "#151815"}
        >
          {price}
        </text>
      </motion.g>
    </g>
  );
}
