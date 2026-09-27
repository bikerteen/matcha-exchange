import type { PointerEvent, ReactNode } from "react";

export interface RetroWindowProps {
  title: string;
  children: ReactNode;
  /** When provided, the × control becomes a real close button. */
  onClose?: () => void;
  titleId?: string;
  className?: string;
  bodyClassName?: string;
  /** Status bar text along the bottom edge, like an old explorer window. */
  status?: ReactNode;
  inactive?: boolean;
  onTitlePointerDown?: (event: PointerEvent<HTMLDivElement>) => void;
}

function WindowGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
      <rect x="1" y="3" width="14" height="12" fill="#c7efb4" stroke="#151815" strokeWidth="1.5" />
      <rect x="1" y="3" width="14" height="3" fill="#83d46d" stroke="#151815" strokeWidth="1.5" />
      <path d="M4 1.5c1 .8 1 1.7 0 2.5M8 1.5c1 .8 1 1.7 0 2.5" stroke="#151815" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export function RetroWindow({
  title,
  children,
  onClose,
  titleId,
  className = "",
  bodyClassName = "",
  status,
  inactive,
  onTitlePointerDown,
}: RetroWindowProps) {
  return (
    <div className={`win bevel-out ${className}`}>
      <div
        className={`win-titlebar ${onTitlePointerDown ? "cursor-grab touch-none active:cursor-grabbing" : ""}`}
        data-inactive={inactive ? "true" : undefined}
        onPointerDown={onTitlePointerDown}
      >
        <WindowGlyph />
        <h2 id={titleId} className="min-w-0 flex-1 truncate text-[13px] font-bold tracking-[0.03em]">
          {title}
        </h2>
        <div className="flex shrink-0 gap-[2px]">
          <span className="win-control bevel-out" aria-hidden="true">
            <svg width="8" height="8" viewBox="0 0 8 8"><rect x="0" y="6" width="6" height="2" fill="currentColor" /></svg>
          </span>
          <span className="win-control bevel-out" aria-hidden="true">
            <svg width="9" height="9" viewBox="0 0 9 9"><rect x="0.5" y="0.5" width="8" height="8" fill="none" stroke="currentColor" /><rect x="0" y="0" width="9" height="2" fill="currentColor" /></svg>
          </span>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close window"
              className="win-control bevel-out ml-[2px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-cream"
            >
              <CloseGlyph />
            </button>
          ) : (
            <span className="win-control bevel-out ml-[2px]" aria-hidden="true">
              <CloseGlyph />
            </span>
          )}
        </div>
      </div>
      <div className={bodyClassName}>{children}</div>
      {status ? (
        <div className="mt-[3px] flex gap-[3px] text-[12px]">
          <div className="bevel-in flex-1 px-2 py-1">{status}</div>
        </div>
      ) : null}
    </div>
  );
}

function CloseGlyph() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden="true">
      <path d="M1 1l7 7M8 1L1 8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
