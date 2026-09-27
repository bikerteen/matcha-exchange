import type { MatchaLine, StationLabel } from "@/types";
import { getArea } from "@/data/matcha-areas";

export type Point = [number, number];

export function resolveLinePoints(line: MatchaLine): Point[] {
  return line.path.flatMap((step): Point[] => {
    if (typeof step !== "string") return [step];
    const area = getArea(step);
    return area ? [[area.x, area.y]] : [];
  });
}

export function toPathD(points: Point[]): string {
  return points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
}

/** Rough text metrics for the map fonts, used to size price tags and hit areas. */
export const NAME_CHAR_WIDTH = 14.5;
export const PRICE_CHAR_WIDTH = 10.2;
export const TAG_HEIGHT = 30;

export function labelBox(label: StationLabel, x: number, y: number, name: string, price: string) {
  const nameWidth = name.length * NAME_CHAR_WIDTH;
  const tagWidth = price.length * PRICE_CHAR_WIDTH + 18;
  const width = Math.max(nameWidth, tagWidth);
  const left =
    label.anchor === "start" ? x + label.dx : label.anchor === "end" ? x + label.dx - width : x + label.dx - width / 2;
  const tagLeft =
    label.anchor === "start"
      ? x + label.dx
      : label.anchor === "end"
        ? x + label.dx - tagWidth
        : x + label.dx - tagWidth / 2;
  const top = y + label.dy - 26;
  const tagTop = y + label.dy + 8;
  return { left, top, width, height: tagTop + TAG_HEIGHT - top, tagLeft, tagTop, tagWidth };
}
