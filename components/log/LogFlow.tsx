"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { CheckIn, Venue } from "@/types";
import { isAreaSlug } from "@/data/matcha-areas";
import { parsePriceInput } from "@/lib/format";
import { useCheckIns } from "@/hooks/useCheckIns";
import { useMarket } from "@/hooks/useMarket";
import { useVenues } from "@/hooks/useVenues";
import { RetroDialog } from "@/components/retro/RetroDialog";
import { StepHeader, StepTitle } from "@/components/log/StepHeader";
import { StepPhoto, type SessionPhoto } from "@/components/log/StepPhoto";
import { StepPrice } from "@/components/log/StepPrice";
import { StepReview } from "@/components/log/StepReview";
import { StepVenue } from "@/components/log/StepVenue";
import { VerifySequence } from "@/components/log/VerifySequence";

const TITLES: string[][] = [
  ["Where'd", "you get it?"],
  ["Show us", "the goods."],
  ["How much", "did they", "rob you?"],
  ["Last look."],
];

interface Submission {
  checkIn: CheckIn;
  venueName: string;
  sharesInVenue: number;
}

export function LogFlow() {
  const searchParams = useSearchParams();
  const requestedArea = searchParams.get("area");
  const { checkIns, addCheckIn } = useCheckIns();
  const { venues } = useVenues();
  const market = useMarket();

  const [step, setStep] = useState(0);
  const [areaFilter, setAreaFilter] = useState<string | null>(
    requestedArea && isAreaSlug(requestedArea) ? requestedArea : null,
  );
  const [venueId, setVenueId] = useState<string | null>(null);
  const [photo, setPhoto] = useState<SessionPhoto | null>(null);
  const [priceInput, setPriceInput] = useState("");
  const [drinkName, setDrinkName] = useState("");
  const [printedAt, setPrintedAt] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);

  const headingRef = useRef<HTMLDivElement>(null);
  const photoUrlRef = useRef<string | null>(null);
  const isFirstRender = useRef(true);

  const venue: Venue | undefined = venues.find((entry) => entry.id === venueId);
  const areaStats = venue ? market.areas.find((stats) => stats.area.slug === venue.areaSlug) : undefined;
  const parsedPrice = parsePriceInput(priceInput);

  // Object URLs are released when replaced and when leaving the page.
  useEffect(() => {
    return () => {
      if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
    };
  }, []);

  // Move focus to the new step's heading so screen readers announce it.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0 });
    headingRef.current?.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
  }, [step]);

  function goTo(next: number) {
    if (next === 3) setPrintedAt(new Date().toISOString());
    setSubmitError(null);
    setStep(next);
  }

  function handlePhotoChange(file: File | null) {
    if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
    if (!file) {
      photoUrlRef.current = null;
      setPhoto(null);
      return;
    }
    const url = URL.createObjectURL(file);
    photoUrlRef.current = url;
    setPhoto({ url, name: file.name });
  }

  async function handleSubmit() {
    if (!venue || !parsedPrice.ok) {
      setSubmitError("Something's missing from this receipt. Check the café and price.");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const checkIn = await addCheckIn({
        venueId: venue.id,
        pricePence: parsedPrice.pence,
        drinkName: drinkName.trim() || undefined,
      });
      const previous = checkIns.filter((entry) => entry.venueId === venue.id).length;
      setSubmission({ checkIn, venueName: venue.name, sharesInVenue: previous + 1 });
    } catch {
      setSubmitError("The exchange couldn't record that. Your browser may be blocking storage.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    handlePhotoChange(null);
    setSubmission(null);
    setVenueId(null);
    setPriceInput("");
    setDrinkName("");
    setAreaFilter(null);
    goTo(0);
  }

  return (
    <div className="mx-auto max-w-[1100px] px-4 pt-6 pb-16 md:px-8 md:pt-10">
      <StepHeader step={step} onBack={step > 0 ? () => goTo(step - 1) : undefined} />

      <div ref={headingRef}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <StepTitle id={`step-${step}`} lines={TITLES[step]} />

            {step === 0 ? (
              <StepVenue
                areaFilter={areaFilter}
                onClearAreaFilter={() => setAreaFilter(null)}
                selectedId={venueId}
                onSelect={(selected) => {
                  setVenueId(selected.id);
                  goTo(1);
                }}
              />
            ) : null}

            {step === 1 ? (
              <StepPhoto photo={photo} onPhotoChange={handlePhotoChange} onNext={() => goTo(2)} />
            ) : null}

            {step === 2 ? (
              <StepPrice
                priceInput={priceInput}
                onPriceInput={setPriceInput}
                drinkName={drinkName}
                onDrinkName={setDrinkName}
                areaStats={areaStats}
                onNext={() => goTo(3)}
              />
            ) : null}

            {step === 3 && venue && parsedPrice.ok ? (
              <StepReview
                venue={venue}
                areaStats={areaStats}
                pricePence={parsedPrice.pence}
                drinkName={drinkName}
                photo={photo}
                printedAt={printedAt}
                submitting={submitting}
                error={submitError}
                onEdit={goTo}
                onSubmit={handleSubmit}
              />
            ) : null}

            {step === 3 && (!venue || !parsedPrice.ok) ? (
              <div className="mt-8 border-[3px] border-ink bg-warning p-4">
                <p className="font-medium">This receipt is incomplete.</p>
                <button type="button" className="btn98 mt-3" onClick={() => goTo(venue ? 2 : 0)}>
                  Fix it
                </button>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <RetroDialog
        open={submission !== null}
        title="VERIFY.exe"
        onClose={reset}
        dismissible={false}
        status="LMX verification service v1.0"
      >
        {submission ? (
          <VerifySequence
            key={submission.checkIn.id}
            venueName={submission.venueName}
            sharesInVenue={submission.sharesInVenue}
            onLogAnother={reset}
          />
        ) : null}
      </RetroDialog>
    </div>
  );
}
