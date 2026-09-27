const BLOCKS = 20;

/** A segmented Windows 98 progress bar. */
export function ProgressBar({ value, label }: { value: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, value));
  const filled = Math.round((clamped / 100) * BLOCKS);

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className="bevel-in bg-white p-[3px]"
    >
      <div className="grid h-6 grid-cols-[repeat(20,1fr)] gap-[2px]">
        {Array.from({ length: BLOCKS }, (_, index) => (
          <span
            key={index}
            className={index < filled ? "bg-matcha-dark" : "bg-transparent"}
          />
        ))}
      </div>
    </div>
  );
}
