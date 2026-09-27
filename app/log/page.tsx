import type { Metadata } from "next";
import { Suspense } from "react";
import { LogFlow } from "@/components/log/LogFlow";

export const metadata: Metadata = {
  title: "Log a Matcha",
  description: "Log a matcha. Receive one share of absolutely no financial value.",
};

export default function LogPage() {
  return (
    <div className="bg-matcha">
      <Suspense fallback={<div className="min-h-[80svh]" aria-hidden="true" />}>
        <LogFlow />
      </Suspense>
    </div>
  );
}
