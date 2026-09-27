"use client";

import { useEffect, type RefObject } from "react";

/**
 * Lets a mouse drag-to-pan an overflowing element (touch already pans natively).
 * Suppresses the click that ends a drag so stations don't open accidentally.
 */
export function useDragScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const el: HTMLElement = element;

    let startX = 0;
    let startY = 0;
    let scrollLeft = 0;
    let scrollTop = 0;
    let pointerId: number | null = null;
    let dragged = false;

    function onPointerDown(event: PointerEvent) {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      scrollLeft = el.scrollLeft;
      scrollTop = el.scrollTop;
      dragged = false;
    }

    function onPointerMove(event: PointerEvent) {
      if (pointerId !== event.pointerId) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (!dragged && Math.hypot(dx, dy) > 6) {
        dragged = true;
        el.setPointerCapture(event.pointerId);
        el.dataset.dragging = "true";
      }
      if (dragged) {
        el.scrollLeft = scrollLeft - dx;
        el.scrollTop = scrollTop - dy;
      }
    }

    function onPointerUp(event: PointerEvent) {
      if (pointerId !== event.pointerId) return;
      pointerId = null;
      delete el.dataset.dragging;
      if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
    }

    function onClickCapture(event: MouseEvent) {
      if (dragged) {
        event.stopPropagation();
        event.preventDefault();
        dragged = false;
      }
    }

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("click", onClickCapture, true);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, [ref]);
}
