/** Makes it impossible to mistake seeded figures for live data. */
export function DemoSticker({
  children = "Demo index · seeded figures",
  className = "",
  rotate = -3,
}: {
  children?: string;
  className?: string;
  rotate?: number;
}) {
  return (
    <span className={`sticker ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      <span aria-hidden="true">▲</span>
      {children}
    </span>
  );
}
