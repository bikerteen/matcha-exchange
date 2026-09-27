"use client";

import { AnimatePresence, motion, useDragControls } from "motion/react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { RetroWindow } from "@/components/retro/RetroWindow";
import { useHydrated } from "@/hooks/useHydrated";

export interface RetroDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  status?: ReactNode;
  /** Blocks Escape / backdrop dismissal, e.g. while a sequence is running. */
  dismissible?: boolean;
  widthClassName?: string;
  bodyClassName?: string;
  /** Accessible description for screen readers. */
  describedBy?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * A modal Windows-98-style window. Traps focus, closes on Escape, restores
 * focus on close, and can be dragged around by its title bar.
 */
export function RetroDialog({
  open,
  title,
  onClose,
  children,
  status,
  dismissible = true,
  widthClassName = "max-w-[440px]",
  bodyClassName = "p-4",
  describedBy,
}: RetroDialogProps) {
  const hydrated = useHydrated();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      const panel = panelRef.current;
      const target =
        panel?.querySelector<HTMLElement>("[data-autofocus]") ?? panel?.querySelector<HTMLElement>(FOCUSABLE);
      target?.focus();
    });

    function onKeyDown(event: KeyboardEvent) {
      const panel = panelRef.current;
      if (!panel) return;
      if (event.key === "Escape" && dismissible) {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [open, dismissible]);

  if (!hydrated) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50" key="dialog">
          <motion.div
            className="absolute inset-0 bg-ink/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={dismissible ? onClose : undefined}
            aria-hidden="true"
          />
          <div
            ref={constraintsRef}
            className="pointer-events-none absolute inset-0 flex items-end justify-center p-3 pb-[calc(12px+env(safe-area-inset-bottom))] sm:items-center sm:p-6"
          >
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={describedBy}
              className={`pointer-events-auto w-full ${widthClassName}`}
              drag
              dragListener={false}
              dragControls={dragControls}
              dragMomentum={false}
              dragConstraints={constraintsRef}
              dragElastic={0.05}
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12, transition: { duration: 0.14 } }}
              transition={{ type: "spring", stiffness: 520, damping: 34 }}
            >
              <RetroWindow
                title={title}
                titleId={titleId}
                onClose={dismissible ? onClose : undefined}
                status={status}
                onTitlePointerDown={(event) => dragControls.start(event)}
                className="shadow-[8px_8px_0_rgba(21,24,21,0.55)]"
                bodyClassName={`max-h-[calc(85svh-40px)] overflow-y-auto overscroll-contain ${bodyClassName}`}
              >
                {children}
              </RetroWindow>
            </motion.div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
