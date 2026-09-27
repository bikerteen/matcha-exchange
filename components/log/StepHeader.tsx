import { BackIcon } from "@/components/icons";

export const STEP_NAMES = ["Café", "Photo", "Price", "Receipt"] as const;

/** Ticket-stub progress: which of the four stages you're on. */
export function StepHeader({ step, onBack }: { step: number; onBack?: () => void }) {
  return (
    <div className="flex items-center gap-3">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="grid size-11 shrink-0 place-items-center border-[3px] border-ink bg-cream hover:bg-matcha-light"
          aria-label="Back to previous step"
        >
          <BackIcon size={20} />
        </button>
      ) : (
        <span className="size-11 shrink-0" aria-hidden="true" />
      )}
      <ol className="grid flex-1 grid-cols-4 gap-1" aria-label={`Step ${step + 1} of 4: ${STEP_NAMES[step]}`}>
        {STEP_NAMES.map((name, index) => (
          <li
            key={name}
            aria-current={index === step ? "step" : undefined}
            className={`label border-[3px] border-ink px-1.5 py-1.5 text-[10px] ${
              index < step ? "bg-matcha-dark text-cream" : index === step ? "bg-ink text-matcha" : "bg-transparent"
            }`}
          >
            <span className="font-semibold">{String(index + 1).padStart(2, "0")}</span>
            <span className="hidden sm:inline"> · {name}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function StepTitle({ id, lines }: { id: string; lines: string[] }) {
  return (
    <h1 id={id} className="display mt-8 text-[clamp(64px,19vw,176px)]" tabIndex={-1}>
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </h1>
  );
}
