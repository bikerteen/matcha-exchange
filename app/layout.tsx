import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { BottomNav } from "@/components/nav/BottomNav";
import { SiteFooter } from "@/components/nav/SiteFooter";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { Providers } from "@/components/Providers";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "LMX — The London Matcha Exchange",
    template: "%s — LMX",
  },
  description:
    "Tracking London's green economy. Log a matcha, earn a share of absolutely no financial value, and watch the Matcha Line.",
};

export const viewport: Viewport = {
  themeColor: "#151815",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${archivo.variable} ${plexMono.variable} antialiased`}>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="label sr-only z-50 bg-ink px-4 py-3 text-matcha focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <Providers>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <div className="h-[calc(var(--nav-height)+env(safe-area-inset-bottom))] bg-ink md:hidden" aria-hidden="true" />
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
