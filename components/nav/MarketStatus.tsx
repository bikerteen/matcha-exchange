export function MarketStatus({ className = "" }: { className?: string }) {
  return (
    <p className={`label flex items-center gap-2 whitespace-nowrap ${className}`}>
      <span>Market status: whisking</span>
      <span
        aria-hidden="true"
        className="inline-block size-2 rounded-full bg-current animate-blink"
      />
    </p>
  );
}
