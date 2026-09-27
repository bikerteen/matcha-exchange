import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 22, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** A cup, seen as a public pictogram. */
export function CupIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 8h12l-1.4 12H6.4z" />
      <path d="M4 5h14" />
      <path d="M12 2v3" />
    </Icon>
  );
}

export function LineIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 18h6l6-12h6" />
      <circle cx="9" cy="18" r="2.2" fill="currentColor" />
      <circle cx="15" cy="6" r="2.2" fill="currentColor" />
    </Icon>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Icon strokeWidth={3} {...props}>
      <path d="M12 4v16M4 12h16" />
    </Icon>
  );
}

export function CertificateIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 4h16v12H4z" />
      <path d="M8 8h8M8 12h5" />
      <path d="M14 16l-1 5 3-1.5 3 1.5-1-5" />
    </Icon>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <Icon strokeWidth={3} {...props}>
      <path d="M4 12h15M13 5l7 7-7 7" />
    </Icon>
  );
}

export function BackIcon(props: IconProps) {
  return (
    <Icon strokeWidth={3} {...props}>
      <path d="M20 12H5M11 5l-7 7 7 7" />
    </Icon>
  );
}

export function CameraIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 7h4l2-3h6l2 3h4v13H3z" />
      <circle cx="12" cy="13" r="4" />
    </Icon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </Icon>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <Icon strokeWidth={3} {...props}>
      <path d="M12 3v12M6 10l6 6 6-6M4 21h16" />
    </Icon>
  );
}
