export interface NavItem {
  href: string;
  label: string;
  shortLabel: string;
  icon: "home" | "line" | "log" | "portfolio";
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", shortLabel: "Home", icon: "home" },
  { href: "/line", label: "The Matcha Line", shortLabel: "Line", icon: "line" },
  { href: "/log", label: "Log a Matcha", shortLabel: "+ Matcha", icon: "log" },
  { href: "/portfolio", label: "Portfolio", shortLabel: "Portfolio", icon: "portfolio" },
];

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
