"use client";

import { useId, useState, type FormEvent } from "react";
import type { AreaStats } from "@/types";
import { formatDelta, formatPence, parsePriceInput } from "@/lib/format";
import { PosterButton } from "@/components/ui/PosterLink";

const QUICK_PRICES = ["4.50", "5.50", "6.50", "7.50"];
const DRINK_SUGGESTIONS = ["Iced Oat Matcha", "Matcha Latte", "Strawberry Matcha", "Usucha, Neat"];
export const DRINK_NAME_MAX = 60;

export function StepPrice({
  priceInput,
  onPriceInput,
  drinkName,
  onDrinkName,
  areaStats,
  onNext,
}: {
  priceInput: string;
  onPriceInput: (value: string) => void;
  drinkName: string;
  onDrinkName: (value: string) => void;
  areaStats: AreaStats | undefined;
  onNext: () => void;
}) {
  const priceId = useId();
  const errorId = useId();
  const drinkId = useId();
  const [touched, setTouched] = useState(false);
  const parsed = parsePriceInput(priceInput);
  const showError = touched && !parsed.ok;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setTouched(true);
    if (parsed.ok) onNext();
  }

  return (
    <form className="mt-8" onSubmit={handleSubmit} noValidate>
      <label htmlFor={priceId} className="label block">
        Price paid · GBP
      </label>
      <div
        className={`mt-2 flex items-baseline gap-2 border-[3px] border-ink px-4 py-2 ${
          showError ? "bg-warning" : "bg-cream"
        } focus-within:shadow-[var(--shadow-hard)]`}
      >
        <span className="display text-[clamp(80px,22vw,180px)]" aria-hidden="true">
          £
        </span>
        <input
          id={priceId}
          inputMode="decimal"
          autoComplete="off"
          placeholder="0.00"
          value={priceInput}
          onChange={(event) => onPriceInput(event.target.value.slice(0, 6))}
          onBlur={() => setTouched(true)}
          aria-invalid={showError}
          aria-describedby={showError ? errorId : undefined}
          className="display tabular w-full min-w-0 bg-transparent text-[clamp(80px,22vw,180px)] placeholder:text-ink/25 focus:outline-none"
        />
      </div>

      <div className="mt-3 min-h-7" aria-live="polite">
        {showError && !parsed.ok ? (
          <p id={errorId} className="label bg-ink px-2 py-1.5 text-warning inline-block">
            ⚠ {parsed.error}
          </p>
        ) : parsed.ok && areaStats ? (
          <p className="label inline-block bg-ink px-2 py-1.5 text-matcha">
            {parsed.pence === areaStats.averagePence
              ? `Exactly the ${areaStats.area.name} average. Remarkable.`
              : `${formatDelta(parsed.pence - areaStats.averagePence)} vs the ${areaStats.area.name} average of ${formatPence(areaStats.averagePence)}`}
          </p>
        ) : (
          <p className="label">Between £1 and £15.</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Common prices">
        {QUICK_PRICES.map((price) => (
          <button
            key={price}
            type="button"
            onClick={() => {
              onPriceInput(price);
              setTouched(true);
            }}
            className={`font-mono min-h-11 border-[3px] border-ink px-4 text-[16px] font-semibold ${
              priceInput === price ? "bg-ink text-matcha" : "bg-transparent hover:bg-cream"
            }`}
          >
            £{price}
          </button>
        ))}
      </div>

      <div className="mt-12">
        <label htmlFor={drinkId} className="display block text-[clamp(40px,10vw,72px)]">
          What was it?
        </label>
        <p className="label mt-2">Optional</p>
        <input
          id={drinkId}
          value={drinkName}
          maxLength={DRINK_NAME_MAX}
          onChange={(event) => onDrinkName(event.target.value)}
          placeholder="Strawberry Matcha"
          autoComplete="off"
          className="mt-3 w-full border-b-[4px] border-ink bg-transparent py-2 text-[28px] font-bold placeholder:text-ink/30 focus:outline-none focus-visible:bg-cream"
        />
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Drink suggestions">
          {DRINK_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onDrinkName(suggestion)}
              className={`label min-h-10 border-2 border-ink px-3 ${
                drinkName === suggestion ? "bg-ink text-matcha" : "hover:bg-cream"
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <PosterButton type="submit" className="mt-12 w-full md:w-auto md:min-w-[360px]">
        Print receipt
      </PosterButton>
    </form>
  );
}
