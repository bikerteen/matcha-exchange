import type { Pence } from "@/types";

export const MIN_PRICE_PENCE = 100;
export const MAX_PRICE_PENCE = 1500;

/** 650 → "£6.50" */
export function formatPence(pence: Pence): string {
  const sign = pence < 0 ? "-" : "";
  return `${sign}£${(Math.abs(pence) / 100).toFixed(2)}`;
}

/** 40 → "+£0.40", -12 → "-£0.12" */
export function formatDelta(pence: Pence): string {
  if (pence === 0) return "±£0.00";
  return `${pence > 0 ? "+" : "-"}£${(Math.abs(pence) / 100).toFixed(2)}`;
}

/** 184 → "0184" */
export function padCount(value: number, length = 4): string {
  return String(Math.max(0, Math.round(value))).padStart(length, "0");
}

export type PriceParseResult =
  | { ok: true; pence: Pence }
  | { ok: false; error: string };

/**
 * Parses what a person types into the price field. Accepts "6.5", "6.50",
 * "£6.50" and "6,50". Returns integer pence within the allowed range.
 */
export function parsePriceInput(input: string): PriceParseResult {
  const cleaned = input.trim().replace(/^£/, "").replace(",", ".").trim();
  if (cleaned === "") return { ok: false, error: "Enter what you paid." };
  if (!/^\d{1,2}(\.\d{0,2})?$/.test(cleaned)) {
    return { ok: false, error: "Numbers only, e.g. 6.50." };
  }
  const pence = Math.round(parseFloat(cleaned) * 100);
  if (!Number.isFinite(pence)) return { ok: false, error: "That isn't a price." };
  if (pence < MIN_PRICE_PENCE) {
    return { ok: false, error: "Under £1? We don't believe you." };
  }
  if (pence > MAX_PRICE_PENCE) {
    return { ok: false, error: "Over £15 is outside the index. Seek help." };
  }
  return { ok: true, pence };
}

/** "2026-09-27T…" → "27-09-26" */
export function formatShortDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "--/--/--";
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);
  return `${dd}-${mm}-${yy}`;
}

/** "2026-09-27T14:03…" → "27 SEP 26 · 14:03" */
export function formatReceiptDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "UNKNOWN DATE";
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${dd} ${months[date.getMonth()]} ${String(date.getFullYear()).slice(-2)} · ${hh}:${min}`;
}

export function pluralise(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
