import type { ReactNode } from "react";

/** Tiny utility label with a hairline rule — the "small print" of a sign. */
export function SectionLabel({
  number,
  children,
  aside,
  className = "",
}: {
  number?: string;
  children: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`label flex items-center gap-3 ${className}`}>
      {number ? <span className="border-2 border-current px-1.5 py-0.5 font-semibold">{number}</span> : null}
      <span className="shrink-0">{children}</span>
      <span aria-hidden="true" className="h-[2px] flex-1 bg-current opacity-80" />
      {aside ? <span className="shrink-0">{aside}</span> : null}
    </div>
  );
}
