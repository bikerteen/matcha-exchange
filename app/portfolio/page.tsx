import type { Metadata } from "next";
import { PortfolioView } from "@/components/portfolio/PortfolioView";

export const metadata: Metadata = {
  title: "Your Matcha Portfolio",
  description: "Your official Certificate of Matcha Ownership. Shares possess absolutely no financial value.",
};

export default function PortfolioPage() {
  return (
    <div className="grid-paper">
      <PortfolioView />
    </div>
  );
}
