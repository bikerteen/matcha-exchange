import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { IndexBoard } from "@/components/home/IndexBoard";
import { LinePreview } from "@/components/home/LinePreview";
import { YourPosition } from "@/components/home/YourPosition";
import { Ticker } from "@/components/ui/Ticker";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <IndexBoard />
      <LinePreview />
      <HowItWorks />
      <YourPosition />
    </>
  );
}
