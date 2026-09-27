import { PosterLink } from "@/components/ui/PosterLink";

export default function NotFound() {
  return (
    <div className="bg-matcha">
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8">
        <p className="label">Error 404 · Service update</p>
        <h1 className="display mt-6 text-[clamp(72px,19vw,220px)]">
          Station
          <br />
          closed.
        </h1>
        <p className="mt-6 max-w-lg text-[20px] leading-snug">
          This page is not served by the Matcha Line. Please seek alternative routes.
        </p>
        <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
          <PosterLink href="/">Return home</PosterLink>
          <PosterLink href="/line" tone="light">
            View the network
          </PosterLink>
        </div>
      </div>
    </div>
  );
}
