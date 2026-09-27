"use client";

import { useId, useRef, useState, type ChangeEvent } from "react";
import { CameraIcon } from "@/components/icons";
import { PosterButton } from "@/components/ui/PosterLink";

export interface SessionPhoto {
  url: string;
  name: string;
}

const MAX_BYTES = 25 * 1024 * 1024;

/**
 * Evidence capture. The image is shown via an object URL only — it is never
 * uploaded or written to storage, and is gone when you leave the page.
 */
export function StepPhoto({
  photo,
  onPhotoChange,
  onNext,
}: {
  photo: SessionPhoto | null;
  onPhotoChange: (file: File | null) => void;
  onNext: () => void;
}) {
  const inputId = useId();
  const noteId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("That isn't an image. The exchange only accepts photographic evidence.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("That photo is over 25MB. Try a smaller one.");
      return;
    }
    setError(null);
    onPhotoChange(file);
  }

  return (
    <div className="mt-8">
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleChange}
        className="sr-only"
        aria-describedby={noteId}
      />

      {photo ? (
        <figure className="relative mx-auto max-w-[520px] border-[3px] border-ink bg-ink p-3 shadow-[var(--shadow-hard)]">
          {/* eslint-disable-next-line @next/next/no-img-element -- local object URL, never optimised */}
          <img
            src={photo.url}
            alt="Your matcha, as submitted in evidence"
            className="aspect-[4/5] w-full object-cover"
            onError={() => {
              setError("Your browser couldn't display that photo (HEIC files can do this). Try another, or skip.");
              onPhotoChange(null);
            }}
          />
          <figcaption className="label mt-3 flex items-center justify-between text-matcha">
            <span>Exhibit A</span>
            <span className="max-w-[60%] truncate">{photo.name}</span>
          </figcaption>
          <span className="sticker absolute -top-4 -right-3 rotate-6">Evidence received</span>
        </figure>
      ) : (
        <label
          htmlFor={inputId}
          className="group mx-auto flex aspect-[4/5] max-w-[520px] cursor-pointer flex-col items-center justify-center gap-4 border-[4px] border-dashed border-ink bg-matcha-light p-6 text-center transition-colors hover:bg-cream focus-within:outline-3 focus-within:outline-offset-4 focus-within:outline-ink"
        >
          <span className="grid size-24 place-items-center rounded-full border-[4px] border-ink bg-matcha transition-transform group-hover:scale-105">
            <CameraIcon size={44} />
          </span>
          <span className="display text-[40px]">Take or upload a photo</span>
          <span className="label">Tap to open your camera</span>
        </label>
      )}

      <p id={noteId} className="label mx-auto mt-4 max-w-[520px] text-center">
        Your photo stays on this device. It isn&rsquo;t uploaded or saved.
      </p>

      {error ? (
        <p role="alert" className="mx-auto mt-4 max-w-[520px] border-[3px] border-ink bg-warning px-3 py-2 font-medium">
          {error}
        </p>
      ) : null}

      <div className="mx-auto mt-8 grid max-w-[520px] gap-4">
        {photo ? (
          <>
            <PosterButton onClick={onNext}>Looks right</PosterButton>
            <button
              type="button"
              className="btn-poster btn-poster--light justify-center"
              onClick={() => inputRef.current?.click()}
            >
              Retake photo
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="label mx-auto min-h-11 px-3 underline decoration-2 underline-offset-4 hover:bg-cream"
          >
            Proceed without evidence →
          </button>
        )}
      </div>
    </div>
  );
}
