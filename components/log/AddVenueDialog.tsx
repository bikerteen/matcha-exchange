"use client";

import { useId, useState, type FormEvent } from "react";
import type { Venue } from "@/types";
import { MATCHA_AREAS } from "@/data/matcha-areas";
import { VENUE_NAME_MAX } from "@/lib/repositories/custom-venues";
import { useVenues } from "@/hooks/useVenues";
import { RetroDialog } from "@/components/retro/RetroDialog";

export function AddVenueDialog({
  open,
  initialName,
  initialArea,
  onClose,
  onAdded,
}: {
  open: boolean;
  initialName: string;
  initialArea: string | null;
  onClose: () => void;
  onAdded: (venue: Venue) => void;
}) {
  return (
    <RetroDialog open={open} title="NEW_VENUE.exe" onClose={onClose} status="Saved to this device only">
      {open ? (
        <AddVenueForm initialName={initialName} initialArea={initialArea} onCancel={onClose} onAdded={onAdded} />
      ) : null}
    </RetroDialog>
  );
}

function AddVenueForm({
  initialName,
  initialArea,
  onCancel,
  onAdded,
}: {
  initialName: string;
  initialArea: string | null;
  onCancel: () => void;
  onAdded: (venue: Venue) => void;
}) {
  const { addVenue } = useVenues();
  const [name, setName] = useState(initialName.slice(0, VENUE_NAME_MAX));
  const [areaSlug, setAreaSlug] = useState(initialArea ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const nameId = useId();
  const areaId = useId();
  const errorId = useId();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) return setError("The café needs a name.");
    if (!areaSlug) return setError("Pick the nearest area on the Matcha Line.");
    setSaving(true);
    try {
      const venue = await addVenue({ name, areaSlug });
      onAdded(venue);
    } catch {
      setError("Couldn't save that café. Try again.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4 font-system" aria-describedby={error ? errorId : undefined}>
      <p className="text-[14px]">Not on the exchange yet? List it. It will only appear on this device for now.</p>
      <div>
        <label htmlFor={nameId} className="text-[12px] font-bold tracking-[0.08em] uppercase">
          Café name
        </label>
        <input
          id={nameId}
          className="field98 mt-1"
          value={name}
          maxLength={VENUE_NAME_MAX}
          onChange={(event) => {
            setName(event.target.value);
            setError(null);
          }}
          autoComplete="off"
          data-autofocus
          aria-invalid={error !== null && !name.trim()}
        />
      </div>
      <div>
        <label htmlFor={areaId} className="text-[12px] font-bold tracking-[0.08em] uppercase">
          Area
        </label>
        <select
          id={areaId}
          className="field98 mt-1"
          value={areaSlug}
          onChange={(event) => {
            setAreaSlug(event.target.value);
            setError(null);
          }}
          aria-invalid={error !== null && !areaSlug}
        >
          <option value="">Select an area…</option>
          {MATCHA_AREAS.map((area) => (
            <option key={area.slug} value={area.slug}>
              {area.name}
            </option>
          ))}
        </select>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="bg-ink px-2 py-1.5 text-[13px] font-bold text-warning">
          ⚠ {error}
        </p>
      ) : null}
      <div className="flex justify-end gap-2">
        <button type="button" className="btn98 min-w-[100px]" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn98 btn98--primary min-w-[100px]" disabled={saving}>
          Add café
        </button>
      </div>
    </form>
  );
}
