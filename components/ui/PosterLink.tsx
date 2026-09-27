import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowIcon } from "@/components/icons";

type Tone = "ink" | "light" | "matcha";

const TONE_CLASS: Record<Tone, string> = {
  ink: "",
  light: "btn-poster--light",
  matcha: "btn-poster--matcha",
};

/** The big physical call-to-action. Looks like a sign you could press. */
export function PosterLink({
  href,
  children,
  tone = "ink",
  className = "",
  ...props
}: Omit<ComponentProps<typeof Link>, "children"> & { children: ReactNode; tone?: Tone }) {
  return (
    <Link href={href} className={`btn-poster ${TONE_CLASS[tone]} ${className}`} {...props}>
      <span>{children}</span>
      <ArrowIcon size={22} />
    </Link>
  );
}

export function PosterButton({
  children,
  tone = "ink",
  className = "",
  icon = <ArrowIcon size={22} />,
  ...props
}: ComponentProps<"button"> & { tone?: Tone; icon?: ReactNode }) {
  return (
    <button type="button" className={`btn-poster ${TONE_CLASS[tone]} ${className}`} {...props}>
      <span>{children}</span>
      {icon}
    </button>
  );
}
