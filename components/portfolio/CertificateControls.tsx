"use client";

import { useId, useState, type RefObject } from "react";
import { exportNodeAsPng } from "@/lib/export-image";
import { HOLDER_NAME_MAX } from "@/lib/repositories/holder";
import { useHolderName } from "@/hooks/useHolderName";
import { RetroWindow } from "@/components/retro/RetroWindow";

type ExportState = { kind: "idle" } | { kind: "working" } | { kind: "done"; message: string } | { kind: "error" };

/** A small utility panel: name on the certificate + PNG export. */
export function CertificateControls({
  certificateRef,
  disabled,
  certificateNumber,
}: {
  certificateRef: RefObject<HTMLDivElement | null>;
  disabled: boolean;
  certificateNumber: string;
}) {
  const [holderName, setHolderName] = useHolderName();
  const [state, setState] = useState<ExportState>({ kind: "idle" });
  const nameId = useId();

  async function handleSave() {
    const node = certificateRef.current;
    if (!node) return;
    setState({ kind: "working" });
    try {
      const fileName = `lmx-certificate-${certificateNumber.split("/").pop() ?? "000000"}.png`;
      const result = await exportNodeAsPng(node, { fileName, targetWidth: 1080, backgroundColor: "#83d46d" });
      setState({ kind: "done", message: result === "shared" ? "Certificate shared." : "Certificate saved." });
    } catch {
      setState({ kind: "error" });
    }
  }

  const status =
    state.kind === "working"
      ? "Printing certificate…"
      : state.kind === "done"
        ? state.message
        : state.kind === "error"
          ? "Export failed. Try a screenshot instead."
          : "Exports as 1080 × 1350 PNG";

  return (
    <RetroWindow title="CERTIFICATE.exe" bodyClassName="grid gap-4 p-4" status={<span aria-live="polite">{status}</span>}>
      <div>
        <label htmlFor={nameId} className="text-[12px] font-bold tracking-[0.08em] uppercase">
          Name on certificate
        </label>
        <input
          id={nameId}
          className="field98 mt-1 uppercase"
          value={holderName}
          maxLength={HOLDER_NAME_MAX}
          placeholder="The Bearer"
          autoComplete="nickname"
          onChange={(event) => setHolderName(event.target.value)}
        />
        <p className="mt-1 text-[12px] text-ink/70">Stored on this device only.</p>
      </div>
      <button
        type="button"
        className="btn98 btn98--primary w-full"
        onClick={handleSave}
        disabled={disabled || state.kind === "working"}
      >
        {state.kind === "working" ? "Printing…" : "Save certificate"}
      </button>
      {disabled ? (
        <p className="text-[12px]">Certificates are issued with your first share. Log a matcha to unlock.</p>
      ) : null}
    </RetroWindow>
  );
}
