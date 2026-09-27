"use client";

import { useId, useState } from "react";
import type { Venue } from "@/types";
import { getArea } from "@/data/matcha-areas";
import { formatPence } from "@/lib/format";
import { searchVenues } from "@/lib/venues";
import { useVenues } from "@/hooks/useVenues";
import { ArrowIcon, PlusIcon, SearchIcon } from "@/components/icons";
import { AddVenueDialog } from "@/components/log/AddVenueDialog";

export function StepVenue({
  areaFilter,
  onClearAreaFilter,
  selectedId,
  onSelect,
}: {
  areaFilter: string | null;
  onClearAreaFilter: () => void;
  selectedId: string | null;
  onSelect: (venue: Venue) => void;
}) {
  const { venues } = useVenues();
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(false);
  const searchId = useId();
  const results = searchVenues(venues, query, areaFilter);
  const filterArea = areaFilter ? getArea(areaFilter) : undefined;

  return (
    <div className="mt-8">
      <label htmlFor={searchId} className="label block">
        Search cafés or areas
      </label>
      <div className="mt-2 flex items-center gap-3 border-b-[5px] border-ink pb-2">
        <SearchIcon size={30} />
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="e.g. Shoreditch"
          autoComplete="off"
          enterKeyHint="search"
          className="display min-w-0 flex-1 bg-transparent text-[clamp(36px,9vw,64px)] placeholder:text-ink/30 focus:outline-none"
        />
      </div>

      {filterArea ? (
        <p className="mt-4 flex flex-wrap items-center gap-2">
          <span className="label bg-ink px-2 py-1.5 text-matcha">Area: {filterArea.name}</span>
          <button type="button" onClick={onClearAreaFilter} className="label min-h-9 border-2 border-ink px-2 hover:bg-cream">
            Show all areas ×
          </button>
        </p>
      ) : null}

      <p className="label mt-6" aria-live="polite">
        {results.length} {results.length === 1 ? "café" : "cafés"} on the exchange
      </p>

      <ul className="mt-3 border-t-[3px] border-ink">
        {results.map((venue) => {
          const area = getArea(venue.areaSlug);
          const selected = selectedId === venue.id;
          return (
            <li key={venue.id} className="border-b-2 border-ink">
              <button
                type="button"
                onClick={() => onSelect(venue)}
                aria-pressed={selected}
                className={`group flex min-h-[72px] w-full items-center gap-4 px-1 py-3 text-left transition-colors hover:bg-ink hover:text-matcha ${
                  selected ? "bg-ink text-matcha" : ""
                }`}
              >
                <span className="min-w-0 flex-1">
                  <span className="display block text-[30px] leading-[0.9] md:text-[36px]">{venue.name}</span>
                  <span className="label mt-1.5 block opacity-80">
                    {area?.name}
                    {venue.isCustom ? " · added by you" : ` · demo avg ${formatPence(venue.demoAveragePence)}`}
                  </span>
                </span>
                <ArrowIcon size={24} className="shrink-0 transition-transform group-hover:translate-x-1" />
              </button>
            </li>
          );
        })}
      </ul>

      {results.length === 0 ? (
        <p className="mt-6 text-[18px]">
          Nothing called &ldquo;{query}&rdquo; on the exchange yet. Add it below.
        </p>
      ) : null}

      <button
        type="button"
        onClick={() => setAdding(true)}
        className="btn-poster btn-poster--light mt-8 w-full md:w-auto"
      >
        <span>Add a place</span>
        <PlusIcon size={22} />
      </button>

      <AddVenueDialog
        open={adding}
        initialName={results.length === 0 ? query : ""}
        initialArea={areaFilter}
        onClose={() => setAdding(false)}
        onAdded={(venue) => {
          setAdding(false);
          onSelect(venue);
        }}
      />
    </div>
  );
}
